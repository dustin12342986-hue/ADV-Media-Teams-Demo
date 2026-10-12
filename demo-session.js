/* ---------------------------------------------------------------------------
   ONE DEMO SESSION, SHARED BY EVERY PAGE
   ---------------------------------------------------------------------------
   The code used to be asked for again on every page and in every new tab,
   which in front of a client looks like the product does not know who you
   are. It is asked for once now. The answer lives in this origin's storage,
   so the main app, the Time Clock, the Checklist and Pathfinder all see the
   same session, in every tab, until it ends.

   How it ends:

     staff (owner, rep)  thirty minutes with no activity anywhere
     client              the same, and in any case thirty minutes from the
                         moment they started, which does not restart by
                         opening another page

   Activity is a tap, a key, a scroll or coming back to the tab. Any one of
   those on any page pushes the idle clock out for all of them.

   Storage can be unavailable: a private window, an iframe, a browser with
   site data switched off. That is handled rather than guarded against. The
   session then lives in this one page's memory, which is exactly the old
   behaviour, and nothing says anything about it.
   --------------------------------------------------------------------------- */
(function (root) {
  "use strict";

  var KEY = "advDemoSession";
  var IDLE_MINUTES = 30;      // no activity anywhere for this long and it ends
  var CLIENT_MINUTES = 30;    // a client's hard cap, from when they started

  var IDLE_MS = IDLE_MINUTES * 60000;
  var CLIENT_MS = CLIENT_MINUTES * 60000;

  // Written at most this often. Every pointer move would otherwise be a write
  // and a storage event in every other tab.
  var TOUCH_EVERY = 15000;
  var CHECK_EVERY = 20000;

  var memory = null;          // the fallback when storage will not have us
  var lastWrite = 0;
  var listeners = [];
  var wasAlive = false;

  function now() { return Date.now(); }

  function read() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return null;
      var o = JSON.parse(raw);
      if (o && typeof o === "object" && o.role && o.id) return o;
      return null;
    } catch (e) {
      return memory;
    }
  }

  function write(o) {
    memory = o;
    try {
      if (o) localStorage.setItem(KEY, JSON.stringify(o));
      else localStorage.removeItem(KEY);
    } catch (e) { /* memory is the record now */ }
  }

  // A session is alive while it has been touched inside the idle window, and,
  // for a client, while their half hour has not run out. Opening a second
  // page does not hand a client a fresh half hour: startedAt is the original.
  function alive(o) {
    if (!o) return false;
    if (now() - (o.lastSeen || 0) > IDLE_MS) return false;
    if (o.role === "client" && now() - (o.startedAt || 0) > CLIENT_MS) return false;
    return true;
  }

  function get() {
    var o = read();
    if (!alive(o)) return null;
    return o;
  }

  function newId() {
    var a = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    var out = "";
    for (var i = 0; i < 6; i++) out += a.charAt(Math.floor(Math.random() * a.length));
    return out;
  }

  function start(role) {
    var o = { role: role, id: newId(), startedAt: now(), lastSeen: now() };
    write(o);
    lastWrite = now();
    wasAlive = true;
    return o;
  }

  function touch() {
    var o = read();
    if (!alive(o)) return;
    // Throttled on our own last write, but a stored time that has gone stale
    // wins over the throttle: another tab may have written since, and this
    // tab's idea of when it last wrote says nothing about that.
    var age = now() - (o.lastSeen || 0);
    if (now() - lastWrite < TOUCH_EVERY && age < TOUCH_EVERY) return;
    o.lastSeen = now();
    write(o);
    lastWrite = now();
  }

  function end(why) {
    write(null);
    lastWrite = 0;
    var had = wasAlive;
    wasAlive = false;
    if (had) fire(null, why || "left");
  }

  // How long a client has left, by whichever runs out first. Staff get null,
  // because nothing is counting down for them.
  function msLeft() {
    var o = get();
    if (!o || o.role !== "client") return null;
    return Math.max(0, Math.min(
      CLIENT_MS - (now() - (o.startedAt || 0)),
      IDLE_MS - (now() - (o.lastSeen || 0))
    ));
  }

  function onChange(fn) { if (typeof fn === "function") listeners.push(fn); }

  function fire(session, why) {
    for (var i = 0; i < listeners.length; i++) {
      try { listeners[i](session, why); } catch (e) { /* one bad listener is not the others' problem */ }
    }
  }

  // Watches for three things: this tab going idle past the window, a client's
  // half hour running out, and another tab starting or ending a session.
  //
  // The reason comes from the record, not from whatever called this. A
  // record still sitting in storage but past its time means it lapsed; no
  // record at all means somebody left or cleared it. Taking the caller's
  // word for it told a timed-out session it had been ended in another tab.
  function check(fallback) {
    var raw = read();
    var live = alive(raw) ? raw : null;
    if (live && !wasAlive) { wasAlive = true; fire(live, "started elsewhere"); return; }
    if (!live && wasAlive) {
      wasAlive = false;
      var why;
      if (!raw) why = fallback || "left";
      else if (raw.role === "client" && now() - (raw.startedAt || 0) > CLIENT_MS) why = "time";
      else why = "idle";
      fire(null, why);
    }
  }

  function begin() {
    wasAlive = !!get();

    ["pointerdown", "keydown", "wheel", "touchstart"].forEach(function (ev) {
      document.addEventListener(ev, touch, { passive: true, capture: true });
    });
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) { touch(); check(); }
    });
    // A page inside a frame is a page too: a tap in Pathfinder keeps the app
    // around it signed in, and the other way round.
    window.addEventListener("message", function (e) {
      if (e && e.data === "adv-demo-activity") touch();
    });
    if (window.parent && window.parent !== window) {
      ["pointerdown", "keydown"].forEach(function (ev) {
        document.addEventListener(ev, function () {
          try { window.parent.postMessage("adv-demo-activity", "*"); } catch (err) {}
        }, { passive: true, capture: true });
      });
    }

    window.addEventListener("storage", function (e) {
      if (e && e.key && e.key !== KEY) return;
      check("ended in another tab");
    });

    setInterval(function () { check(); }, CHECK_EVERY);
  }

  root.ADVDemoSession = {
    get: get,
    start: start,
    touch: touch,
    end: end,
    msLeft: msLeft,
    onChange: onChange,
    IDLE_MINUTES: IDLE_MINUTES,
    CLIENT_MINUTES: CLIENT_MINUTES,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", begin);
  } else {
    begin();
  }
})(typeof window !== "undefined" ? window : this);
