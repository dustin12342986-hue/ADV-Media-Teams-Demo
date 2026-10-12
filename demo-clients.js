/* ---------------------------------------------------------------------------
   WHICH CLIENT THE DEMO IS SHOWING
   ---------------------------------------------------------------------------
   ADV Media does four different kinds of work and they do not look alike. A
   theatre manager watching a demo full of coin tosses and scorebugs is being
   asked to picture their own world, which is work they should not have to do.

   So the demo has four clients, and picking one changes everything: the
   schedule, the crew positions, the running order, the read copy, the
   checklist and the venue in Pathfinder.

     Northgate Athletics    sports
     Saphire Productions    corporate
     Venue Rock             live music
     Woodland Theatre       theatre

   All four are invented, and so is every venue, show and person in them.

   The choice is stored for the whole origin, so it is shared with every page
   and tab the same way the appearance and the session are. Changing it
   reloads, because the demo seeds its sample data once at boot and swapping
   half of it underneath a running page is worse than a reload.
   --------------------------------------------------------------------------- */
(function (root) {
  "use strict";

  var KEY = "advDemoClient";
  var DATA = {"order":["northgate","saphire","venuerock","woodland"],"clients":{"northgate":{"id":"northgate","name":"Northgate Athletics","kind":"Sports","blurb":"High school football, a home game every other Friday.","venue":"Northgate Athletic Complex","venueShort":"Northgate","eventWord":"Game","eventsWord":"Games","callWord":"Kickoff","crew":["EIC","Production Manager","Director","Producer","Shader","Replay","Clips","Camera 1","Camera 2","Camera 3","Camera 4","Audio A1","Audio A2/Utility"],"events":[{"offset":-9,"name":"Northgate vs Lincoln Academy","start":"7:00 PM","call":"4:30 PM"},{"offset":-8,"name":"Northgate vs Lincoln Academy — Strike","start":null,"call":"9:00 AM"},{"offset":-2,"name":"Northgate vs Kennedy High","start":"7:00 PM","call":"4:30 PM"},{"offset":0,"name":"Northgate vs Franklin Central","start":"7:00 PM","call":"4:00 PM"},{"offset":2,"name":"Northgate at Westbrook — Away Feed","start":"7:30 PM","call":"5:00 PM"},{"offset":9,"name":"Northgate vs Shelby Union — Homecoming","start":"7:00 PM","call":"3:30 PM"},{"offset":10,"name":"Homecoming — Strike","start":null,"call":"9:00 AM"},{"offset":16,"name":"Northgate vs Mercer Valley — Senior Night","start":"7:00 PM","call":"4:00 PM"}],"sections":["Pregame","1st Qtr","2nd Qtr","Halftime","3rd Qtr","4th Qtr","Post game"],"cues":[{"section":"Pregame","time":"6:30 PM","dur":"5:00","event":"Gates open","read":"Welcome to Northgate Athletic Complex.","screen":"Sponsor loop","audio":"Walk-in music"},{"section":"Pregame","time":"6:45 PM","dur":"2:00","event":"Visiting team takes the field","read":"Please welcome our visitors.","screen":"Away hype","audio":"Bed music"},{"section":"Pregame","time":"6:50 PM","dur":"3:00","event":"Home team takes the field","read":"Your Northgate Eagles!","screen":"Home hype reel","audio":"Fight song"},{"section":"Pregame","time":"6:55 PM","dur":"2:30","event":"National Anthem","read":"Please rise and remove your hats.","screen":"Flag","audio":"Anthem"},{"section":"Pregame","time":"6:58 PM","dur":"1:00","event":"Coin toss","read":"","screen":"Live look","audio":"Ref mic"},{"section":"1st Qtr","time":"7:00 PM","dur":"0:00","event":"KICKOFF","read":"","screen":"Scorebug","audio":"Game audio"},{"section":"End of 1st","time":"","dur":"2:00","event":"Sponsor read","read":"Tonight's game is brought to you by Riverside Touring.","screen":"Sponsor slate","audio":"Bed music"},{"section":"Halftime","time":"","dur":"12:00","event":"Band performance","read":"Please welcome the Northgate band.","screen":"Band cam","audio":"Band mics"},{"section":"3rd Qtr","time":"","dur":"1:00","event":"Student section cam","read":"","screen":"Crowd cam","audio":"Game audio"},{"section":"Post game","time":"","dur":"5:00","event":"Coach interview","read":"","screen":"Interview lower third","audio":"Handheld"}],"gearNote":"Each run is marked for its camera. Tap one to change its status.","signal":[{"id":"cam1","label":"Camera 1","colour":"#4A8FC0"},{"id":"cam2","label":"Camera 2","colour":"#D65A4E"},{"id":"cam3","label":"Camera 3","colour":"#33A870"},{"id":"cam4","label":"Camera 4","colour":"#E6CE3A"}],"signalTitle":"Signal up","outdoor":true,"gearHead":"Case seals","gearNote2":"Camera Lead seals each case after the quality check and records the tie number. At load-in, the number on the case must match the number here.","positions":[{"name":"Camera Lead","items":["Case seals checked against the tie numbers","Lens cleaning kit in the cart","Camera 1 to 4 built and balanced","Tally confirmed on all four"]},{"name":"Camera 1 (Blue)","items":["Triax run to the press box wall box","Base station up and shaded","Tally and intercom confirmed","Monopod and spare plate on the deck"]},{"name":"Camera 2 (Red)","items":["Triax to the camera deck","Shot sheet taped to the panhandle","Intercom confirmed with the director"]},{"name":"Camera 3 (Green)","items":["Hand-held tied in at the home tunnel","Belt pack and spare batteries","Confirmed with the spotter"]},{"name":"Camera 4 (Yellow)","items":["End zone robo framed and locked","Return feed confirmed"]},{"name":"Replay","items":["Record decks rolling from first whistle","Iso assignments confirmed with the director"]},{"name":"Audio A1","items":["Ref mic receiver swept and squelched","Announcer mics checked","House feed is not the programme bus"]},{"name":"Audio A2/Utility","items":["Field boxes patched and labelled","RF coordination done","Spare belt packs charged"]},{"name":"Director","items":["Run of show open on the shared view","Scorebug tested","Camera assignments confirmed"]},{"name":"Producer","items":["Sponsor reads timed","Halftime package loaded"]},{"name":"EIC","items":["Signal up on all four cameras by 5:00 PM","Truck tie-in confirmed","Shore power and UPS checked"]}]},"saphire":{"id":"saphire","name":"Saphire Productions","kind":"Corporate","blurb":"Conferences, keynotes and awards nights in hotel ballrooms.","venue":"Saphire Conference Center","venueShort":"Saphire","eventWord":"Show","eventsWord":"Shows","callWord":"Doors","crew":["EIC","Production Manager","Show Caller","Producer","Technical Director","Graphics Operator","Camera 1","Camera 2","Camera 3","Audio A1","Audio A2/RF","Lighting Director","Utility"],"events":[{"offset":-9,"name":"Sales Kickoff — Load-in","start":null,"call":"7:00 AM"},{"offset":-8,"name":"Sales Kickoff — Show Day 1","start":"8:30 AM","call":"5:00 AM"},{"offset":-2,"name":"Nordvale Partners — Investor Day","start":"9:00 AM","call":"5:30 AM"},{"offset":0,"name":"Halden Group — Product Launch","start":"6:30 PM","call":"1:00 PM"},{"offset":2,"name":"Halden Group — Strike","start":null,"call":"8:00 AM"},{"offset":9,"name":"Annual Awards Gala — Load-in","start":null,"call":"7:00 AM"},{"offset":10,"name":"Annual Awards Gala — Show","start":"7:30 PM","call":"2:00 PM"},{"offset":16,"name":"Regional Town Hall — Hybrid","start":"10:00 AM","call":"6:00 AM"}],"sections":["Load-in","Rehearsal","Doors","General Session","Breakouts","Awards","Strike"],"cues":[{"section":"Doors","time":"6:00 PM","dur":"30:00","event":"Doors open","read":"Good evening and welcome.","screen":"Sponsor loop","audio":"Walk-in music"},{"section":"General Session","time":"6:30 PM","dur":"2:00","event":"Opening video","read":"","screen":"Opening package","audio":"Package audio"},{"section":"General Session","time":"6:32 PM","dur":"8:00","event":"CEO welcome","read":"Please welcome your chief executive.","screen":"Presenter cam and slides","audio":"Lectern mic"},{"section":"General Session","time":"6:40 PM","dur":"25:00","event":"Keynote","read":"","screen":"Slides full frame","audio":"Lavalier"},{"section":"General Session","time":"7:05 PM","dur":"20:00","event":"Customer panel","read":"","screen":"Four box","audio":"Four lavaliers"},{"section":"General Session","time":"7:25 PM","dur":"3:00","event":"Product reveal","read":"","screen":"Reveal package","audio":"Package audio"},{"section":"Breakouts","time":"7:30 PM","dur":"45:00","event":"Breakout rooms open","read":"Breakouts are on the mezzanine level.","screen":"Wayfinding slate","audio":"Room PA"},{"section":"Awards","time":"8:30 PM","dur":"20:00","event":"Awards presentation","read":"Please welcome tonight's recipients.","screen":"Name cards and walk-on","audio":"Walk-on stings"},{"section":"Awards","time":"8:50 PM","dur":"5:00","event":"Closing remarks","read":"","screen":"Closing slate","audio":"Lectern mic"},{"section":"Strike","time":"9:00 PM","dur":"","event":"House lights, strike begins","read":"","screen":"Holding slate","audio":"Walk-out music"}],"gearNote":"Each run is marked for its position. Tap one to change its status.","signal":[{"id":"cam1","label":"Camera 1","colour":"#4A8FC0"},{"id":"cam2","label":"Camera 2","colour":"#D65A4E"},{"id":"cam3","label":"Camera 3","colour":"#33A870"},{"id":"cam4","label":"Graphics","colour":"#8B72D9"}],"signalTitle":"Ready for doors","outdoor":false,"gearHead":"Case seals","gearNote2":"Each case is sealed after the quality check and the tie number recorded. At load-in, the number on the case must match the number here.","positions":[{"name":"Technical Director","items":["Switcher shots built and labelled","Lower thirds loaded and spelled right","Backup record rolling"]},{"name":"Graphics Operator","items":["Deck received and version confirmed with the client","Presenter order matches the run of show","Confidence monitor live"]},{"name":"Camera 1","items":["Centre hard camera framed on the lectern","Return and tally confirmed"]},{"name":"Camera 2","items":["House left, cross shot set","Intercom confirmed"]},{"name":"Camera 3","items":["Hand-held for the audience Q and A","Spare battery on the belt"]},{"name":"Audio A1","items":["Lectern mic checked with the presenter","House feed separate from the record feed","Playback levels set against the room"]},{"name":"Audio A2/RF","items":["Lavaliers fitted and labelled per presenter","RF coordination done and logged","Spare packs and batteries in the wings"]},{"name":"Lighting Director","items":["Stage wash and key set for camera","Awards walk-on specials focused","House lights on a cue, not a switch"]},{"name":"Show Caller","items":["Run of show open on the shared view","Standby cues agreed with the client","Presenter walk-on order confirmed"]},{"name":"Producer","items":["Client contact confirmed and in the room","Timings agreed against the venue curfew"]},{"name":"EIC","items":["Power and distro checked","Record and backup both confirmed","Room patch confirmed"]}]},"venuerock":{"id":"venuerock","name":"Venue Rock","kind":"Live music","blurb":"A 1,200 capacity room, four or five shows a week.","venue":"Venue Rock Hall","venueShort":"Venue Rock","eventWord":"Show","eventsWord":"Shows","callWord":"Doors","crew":["EIC","Production Manager","Director","FOH Engineer","Monitor Engineer","Patch Tech","RF Tech","Lighting Director","Camera 1","Camera 2","Camera 3","Camera 4","Playback"],"events":[{"offset":-9,"name":"The Hollow Pines — Headline","start":"9:00 PM","call":"11:00 AM"},{"offset":-8,"name":"The Hollow Pines — Load-out","start":null,"call":"11:30 PM"},{"offset":-2,"name":"Marguerite Vane — Headline","start":"9:30 PM","call":"12:00 PM"},{"offset":0,"name":"Static Harbor — Headline, filmed","start":"9:00 PM","call":"10:00 AM"},{"offset":2,"name":"Open Deck Night","start":"8:00 PM","call":"4:00 PM"},{"offset":9,"name":"Brassline Collective — Two sets","start":"8:30 PM","call":"11:00 AM"},{"offset":10,"name":"Brassline Collective — Load-out","start":null,"call":"12:30 AM"},{"offset":16,"name":"Winter Showcase — Four bands","start":"7:00 PM","call":"9:00 AM"}],"sections":["Load-in","Soundcheck","Doors","Support","Changeover","Headline","Load-out"],"cues":[{"section":"Load-in","time":"11:00 AM","dur":"","event":"Bus call and load-in","read":"","screen":"","audio":"House music off"},{"section":"Soundcheck","time":"4:00 PM","dur":"60:00","event":"Headline soundcheck","read":"","screen":"","audio":"Full PA, monitors first"},{"section":"Soundcheck","time":"5:30 PM","dur":"20:00","event":"Support line check","read":"","screen":"","audio":"Monitors only"},{"section":"Doors","time":"8:00 PM","dur":"","event":"Doors","read":"Doors are open, welcome in.","screen":"Sponsor loop","audio":"House music"},{"section":"Support","time":"8:30 PM","dur":"30:00","event":"Support set","read":"","screen":"Wide and two hand-helds","audio":"Support desk"},{"section":"Changeover","time":"9:00 PM","dur":"20:00","event":"Changeover","read":"","screen":"Holding slate","audio":"House music"},{"section":"Headline","time":"9:20 PM","dur":"75:00","event":"Headline set","read":"","screen":"Four camera cut, roaming pit","audio":"Headline desk, split to record"},{"section":"Headline","time":"10:35 PM","dur":"10:00","event":"Encore","read":"","screen":"Four camera cut","audio":"Headline desk"},{"section":"Load-out","time":"10:45 PM","dur":"","event":"House lights, load-out","read":"Thank you and goodnight.","screen":"Walk-out slate","audio":"Walk-out music"},{"section":"Load-out","time":"11:30 PM","dur":"","event":"Curfew","read":"","screen":"","audio":""}],"gearNote":"Each run is marked for its position. Tap one to change its status.","signal":[{"id":"cam1","label":"FOH","colour":"#4A8FC0"},{"id":"cam2","label":"Monitors","colour":"#D65A4E"},{"id":"cam3","label":"RF scan","colour":"#33A870"},{"id":"cam4","label":"Record split","colour":"#E6CE3A"}],"signalTitle":"Ready for doors","outdoor":false,"gearHead":"Case seals","gearNote2":"Each case is sealed after the line check and the tie number recorded. At load-out, the number on the case must match the number here.","positions":[{"name":"FOH Engineer","items":["Desk file loaded for tonight's headline","System check and room tune done","Split to the record confirmed","Support desk file loaded and saved separately"]},{"name":"Monitor Engineer","items":["Wedge and IEM mixes built from the rider","RF scan done before doors","Spare pack ready stage left"]},{"name":"Patch Tech","items":["Stage box patched to the input list","Line check with FOH and monitors","DI boxes and spares taped down"]},{"name":"RF Tech","items":["Coordination logged for every channel","Walk tested front and back of house","Batteries fresh at doors"]},{"name":"Lighting Director","items":["Looks built for the set list","Blinders and haze tested before doors","House wash on a cue for load-out"]},{"name":"Camera 1","items":["Wide locked on the riser","Return and tally confirmed"]},{"name":"Camera 2","items":["Pit camera, lens and spare battery","Pit pass confirmed with security"]},{"name":"Camera 3","items":["House left long lens","Intercom confirmed"]},{"name":"Camera 4","items":["Roaming, radio mic on the belt","Clearance confirmed with the tour manager"]},{"name":"Director","items":["Set list open on the shared view","Iso assignments agreed","Record rolling before the first note"]},{"name":"EIC","items":["Power and distro checked","Split confirmed to FOH and record","Curfew time posted where everybody can see it"]}]},"woodland":{"id":"woodland","name":"Woodland Theatre","kind":"Theatre","blurb":"A 400 seat house, a six week run, eight shows a week.","venue":"Woodland Playhouse","venueShort":"Woodland","eventWord":"Performance","eventsWord":"Performances","callWord":"Curtain","crew":["EIC","Production Manager","Stage Manager","Deputy Stage Manager","Lighting Designer","Board Operator","Sound Operator","A2/Radio Mics","Followspot 1","Followspot 2","Fly Operator","Deck Crew","Camera 1"],"events":[{"offset":-9,"name":"Tech rehearsal — Act One","start":null,"call":"9:00 AM"},{"offset":-8,"name":"Dress rehearsal","start":"7:00 PM","call":"4:00 PM"},{"offset":-2,"name":"Preview","start":"7:30 PM","call":"5:30 PM"},{"offset":0,"name":"Opening night","start":"7:30 PM","call":"5:00 PM"},{"offset":2,"name":"Evening performance","start":"7:30 PM","call":"6:00 PM"},{"offset":9,"name":"Matinee","start":"2:30 PM","call":"1:00 PM"},{"offset":10,"name":"Evening performance","start":"7:30 PM","call":"6:00 PM"},{"offset":16,"name":"Closing performance","start":"7:30 PM","call":"5:30 PM"}],"sections":["Pre-show","Act One","Interval","Act Two","Curtain call","Post-show"],"cues":[{"section":"Pre-show","time":"6:45 PM","dur":"","event":"Half hour call","read":"","screen":"","audio":"Backstage call only"},{"section":"Pre-show","time":"7:00 PM","dur":"30:00","event":"House opens","read":"Good evening and welcome to the Woodland Playhouse.","screen":"House slate","audio":"Pre-show music"},{"section":"Pre-show","time":"7:25 PM","dur":"2:00","event":"Front of house announcement","read":"Please switch off your phones. Tonight's performance runs two hours and ten minutes, with one interval.","screen":"","audio":"House PA"},{"section":"Act One","time":"7:30 PM","dur":"55:00","event":"Curtain up","read":"","screen":"Relay to the dressing rooms","audio":"Radio mics live"},{"section":"Act One","time":"7:52 PM","dur":"","event":"Followspot pickup, stage left entrance","read":"","screen":"","audio":""},{"section":"Act One","time":"8:25 PM","dur":"","event":"Act One ends, curtain down","read":"","screen":"","audio":""},{"section":"Interval","time":"8:25 PM","dur":"20:00","event":"Interval","read":"The interval is twenty minutes.","screen":"Interval slate","audio":"Interval music"},{"section":"Act Two","time":"8:45 PM","dur":"50:00","event":"Act Two begins","read":"","screen":"Relay","audio":"Radio mics live"},{"section":"Curtain call","time":"9:35 PM","dur":"4:00","event":"Curtain call","read":"","screen":"","audio":"Playout"},{"section":"Post-show","time":"9:40 PM","dur":"","event":"House out, clear the deck","read":"","screen":"","audio":"Walk-out music"}],"gearNote":"Each run is marked for its position. Tap one to change its status.","signal":[{"id":"cam1","label":"Comms","colour":"#4A8FC0"},{"id":"cam2","label":"Radio mics","colour":"#D65A4E"},{"id":"cam3","label":"Followspots","colour":"#33A870"},{"id":"cam4","label":"Relay and record","colour":"#E6CE3A"}],"signalTitle":"Ready for house","outdoor":false,"gearHead":"Preset checks","gearNote2":"Props and costume presets are checked against the list before the house opens, and signed off by the position that owns them.","positions":[{"name":"Stage Manager","items":["Book marked up to tonight's cues","Cast and crew signed in","Half hour, quarter and beginners calls ready","Interval length confirmed with front of house"]},{"name":"Deputy Stage Manager","items":["Cue lights tested to every position","Prompt desk comms checked","Scene change plot on the deck"]},{"name":"Lighting Designer","items":["Plot loaded and checked against last night's notes","Focus check done on the specials"]},{"name":"Board Operator","items":["Cue stack loaded and saved","Followspot cues marked in the book","House lights on a cue, not a switch"]},{"name":"Sound Operator","items":["Playback checked end to end","Relay to dressing rooms confirmed","Reverb and effects cues checked"]},{"name":"A2/Radio Mics","items":["Every pack fitted and labelled to its cast member","Batteries fresh for both acts","Spare pack dressed and ready in the wings"]},{"name":"Followspot 1","items":["Lamp struck and focused","Cue sheet on the rail","Comms confirmed with the deputy"]},{"name":"Followspot 2","items":["Lamp struck and focused","Cue sheet on the rail"]},{"name":"Fly Operator","items":["Flying plot checked and weights confirmed","Deck clear call agreed"]},{"name":"Deck Crew","items":["Scene change plot walked","Props preset checked against the list","Glow tape checked on every entrance"]},{"name":"Camera 1","items":["Archive camera framed on the full stage","Record rolling from house open"]},{"name":"EIC","items":["Power and distro checked","Comms live to every position","Relay and record both confirmed"]}]}},"people":[{"uid":"u-sam","name":"Sam Rivera","handle":"Sam","phone":"817-555-0110"},{"uid":"u-jordan","name":"Jordan Blake","handle":"Jordan","phone":"817-555-0111"},{"uid":"u-taylor","name":"Taylor Morgan","handle":"Taylor","phone":"817-555-0112"},{"uid":"u-casey","name":"Casey Nguyen","handle":"Casey","phone":"817-555-0113"},{"uid":"u-avery","name":"Avery Stone","handle":"Avery","phone":"817-555-0114"},{"uid":"u-morgan","name":"Morgan Lee","handle":"Morgan","phone":"817-555-0115"},{"uid":"u-alex","name":"Alex Chen","handle":"Alex","phone":"817-555-0116"},{"uid":"u-jamie","name":"Jamie Ortiz","handle":"Jamie","phone":"817-555-0117"},{"uid":"u-riley","name":"Riley Patel","handle":"Riley","phone":"817-555-0118"},{"uid":"u-drew","name":"Drew Sanchez","handle":"Drew","phone":"817-555-0119"},{"uid":"u-priya","name":"Priya Raman","handle":"Priya","phone":"817-555-0120"},{"uid":"u-quinn","name":"Quinn Foster","handle":"Quinn","phone":"817-555-0121"},{"uid":"u-devon","name":"Devon Clark","handle":"Devon","phone":"817-555-0122"}]};
  var DEFAULT = DATA.order[0];

  var memory = null;

  function id() {
    var v;
    try { v = localStorage.getItem(KEY); } catch (e) { v = memory; }
    return (v && DATA.clients[v]) ? v : DEFAULT;
  }

  function get() { return DATA.clients[id()]; }

  function list() {
    return DATA.order.map(function (k) { return DATA.clients[k]; });
  }

  function set(next, quiet) {
    if (!DATA.clients[next]) return;
    var before = id();
    memory = next;
    try { localStorage.setItem(KEY, next); } catch (e) { /* memory holds it */ }
    if (!quiet && next !== before) location.reload();
  }

  // Events carry an offset in days rather than a date, so the schedule is
  // always built around today and the demo never opens on an empty week.
  function events() {
    return get().events.map(function (e) {
      var t = new Date();
      t.setDate(t.getDate() + e.offset);
      var dd = String(t.getDate()), mm = String(t.getMonth() + 1);
      return {
        id: t.getFullYear() + "-" + (mm.length < 2 ? "0" + mm : mm) + "-" + (dd.length < 2 ? "0" + dd : dd),
        day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][t.getDay()],
        date: mm + "/" + dd,
        opp: e.name,
        gameTime: e.start || "",
        call: e.call || "",
        offset: e.offset,
      };
    });
  }

  function people() { return DATA.people.slice(); }

  // ------------------------------------------------------------- the picker
  var CSS =
    '.advc-overlay{position:fixed;inset:0;z-index:100001;background:rgba(6,8,12,.72);' +
      'display:flex;align-items:center;justify-content:center;padding:20px;' +
      'font-family:var(--font,system-ui,-apple-system,sans-serif);}' +
    '.advc-card{width:100%;max-width:430px;max-height:86vh;overflow:auto;' +
      'background:var(--panel,#171a20);border:1px solid var(--border,#2b303a);' +
      'border-radius:16px;padding:20px;color:var(--text,#e8eaed);' +
      'box-shadow:0 10px 40px rgba(0,0,0,.45);}' +
    '.advc-title{font-size:17px;font-weight:800;margin-bottom:3px;}' +
    '.advc-sub{font-size:12.5px;color:var(--text-muted,#a2a9b4);margin-bottom:16px;line-height:1.5;}' +
    '.advc-opt{display:flex;gap:12px;align-items:flex-start;width:100%;text-align:left;' +
      'padding:13px 14px;margin-bottom:9px;border-radius:12px;cursor:pointer;' +
      'background:var(--panel2,#1f232b);border:1px solid var(--border,#2b303a);' +
      'color:inherit;font-family:inherit;}' +
    '.advc-opt[aria-current="true"]{border-color:var(--accent,#4d8dfc);}' +
    '.advc-kind{flex:0 0 auto;font-size:9.5px;font-weight:800;letter-spacing:.8px;' +
      'text-transform:uppercase;padding:4px 8px;border-radius:6px;margin-top:2px;' +
      'background:var(--accent,#4d8dfc);color:var(--accent-ink,#06101f);white-space:nowrap;}' +
    '.advc-name{font-size:14.5px;font-weight:800;display:block;}' +
    '.advc-blurb{font-size:12.5px;color:var(--text-muted,#a2a9b4);display:block;margin-top:2px;line-height:1.45;}' +
    '.advc-close{width:100%;margin-top:6px;padding:12px 0;border-radius:11px;cursor:pointer;' +
      'background:transparent;border:1px solid var(--border,#2b303a);color:var(--text,#e8eaed);' +
      'font-size:13px;font-weight:800;font-family:inherit;}';

  function styles() {
    if (document.getElementById("advc-style")) return;
    var st = document.createElement("style");
    st.id = "advc-style";
    st.textContent = CSS;
    (document.head || document.documentElement).appendChild(st);
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (m) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m];
    });
  }

  function open() {
    styles();
    var cur = id();
    var ov = document.createElement("div");
    ov.className = "advc-overlay";
    ov.innerHTML =
      '<div class="advc-card">' +
        '<div class="advc-title">What kind of work?</div>' +
        '<div class="advc-sub">The whole demo follows this: the schedule, the crew, the ' +
          'running order, the checklist and the venue in Pathfinder. Sample clients, ' +
          'one for each kind of show ADV Media covers.</div>' +
        list().map(function (c) {
          return '<button class="advc-opt" data-cid="' + esc(c.id) + '" aria-current="' +
            (c.id === cur) + '">' +
            '<span class="advc-kind">' + esc(c.kind) + '</span>' +
            '<span><span class="advc-name">' + esc(c.name) + '</span>' +
            '<span class="advc-blurb">' + esc(c.blurb) + '</span></span></button>';
        }).join("") +
        '<button class="advc-close" id="advcClose">Close</button>' +
      '</div>';
    document.body.appendChild(ov);
    var shut = function () { ov.remove(); };
    ov.querySelectorAll("[data-cid]").forEach(function (b) {
      b.onclick = function () {
        var next = b.getAttribute("data-cid");
        if (next === cur) { shut(); return; }
        set(next);
      };
    });
    ov.querySelector("#advcClose").onclick = shut;
    ov.onclick = function (e) { if (e.target === ov) shut(); };
  }

  // Any element with data-adv-client opens the picker, so a page only has to
  // put a button somewhere and nothing has to be wired up by hand.
  function wire() {
    document.querySelectorAll("[data-adv-client]").forEach(function (el) {
      if (el.__advcWired) return;
      el.__advcWired = true;
      el.addEventListener("click", function (e) { e.preventDefault(); open(); });
      if (!el.textContent.trim()) el.textContent = get().name;
    });
    document.querySelectorAll("[data-adv-client-name]").forEach(function (el) {
      el.textContent = get().name;
    });
  }

  root.ADVDemoClient = {
    id: id, get: get, list: list, set: set, open: open,
    events: events, people: people, wire: wire,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wire);
  } else {
    wire();
  }
})(typeof window !== "undefined" ? window : this);
