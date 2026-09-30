/* ===========================================================================
   ADV MEDIA TEAMS — DEMO APPEARANCE
   ===========================================================================

   DEMO BUILD. This is the demo copy of adv-theme.js. It is deliberately NOT
   the production file.

   WHAT IS DIFFERENT FROM PRODUCTION

   The live app ships the real client palettes and the real school crests.
   None of that is in here. A demo link can end up on a client's screen, or
   forwarded past them, and a school's marks are not ours to hand out.

   Taken out : every school theme and every crest image.
   Put in    : four invented teams, drawn as SVG in this file, plus a colour
               wheel so anyone can build their own look on the spot.

   So the demo still shows that the app themes per client — which is the point
   the salesman is making — without carrying a single real mark.

   WHAT IS THE SAME AS PRODUCTION

   The layout, the spacing, the type and the neutral Dark / Light / Mono
   palettes are byte-for-byte the shipping ones. What a client sees here is
   what the app looks like.

   HOW TO ADD IT TO A PAGE

   One line, in <head>, BEFORE the page's own <style> block:

       <script src="adv-theme.js"></script>

   Before matters: this defines the variables, and the page's own CSS should be
   able to override them if it needs to. It also applies the saved theme before
   the first paint, so the page never flashes dark and then snaps to light.

   THE Aa BUTTON

   Optional. Add data-adv-appearance to any element and it opens the picker:

       <button data-adv-appearance>Aa</button>

   Or call ADVTheme.open() yourself.

   WHAT DELIBERATELY DOES NOT CHANGE

   Semantic colours — green, amber, red — and the camera band colours stay
   fixed in every theme, generated ones included. Red means a dead cable and
   the bands mean which camera. A custom colour must not be able to turn a
   dead-cable warning into decoration.
   =========================================================================== */

(function () {
  "use strict";

  var KEY = "advAppearance";

  var CSS = `
  :root {
    --bg: #0A0D12;
    --panel: #12181F;
    --panel2: #1A222B;
    --border: #26313D;
    --text: #EDEFF3;
    --text-muted: #8A96A3;
    --text-faint: #5C6774;

    --green: #33A870;
    --amber: #E0A63C;
    --red: #D65A4E;
    --blue: #4A8FC0;

    --warn-bg: #1F1810;  --warn-ink: #FFD699;  --warn-strong: #FFE9C2;
    --bad-bg:  #2A1512;  --bad-ink:  #F2B8B1;
    --good-bg: #10201A;  --good-ink: #A8E0C4;
    --info-bg: #1B2A38;  --info-ink: #8FC6F0;

    --accent: var(--blue);
    --accent-ink: #FFFFFF;
    --shadow: 0 2px 0 rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.35);
    --font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    --fs: 1;
  }

  /* Off-white rather than pure white. A phone at a night game is the worst
     case for glare. */
  html[data-theme="light"] {
    --bg: #F4F6F8;
    --panel: #FFFFFF;
    --panel2: #EDF1F5;
    --border: #D2DAE2;
    --text: #131A21;
    --text-muted: #55616D;
    --text-faint: #7C8894;
    --green: #1F7D4D;
    --amber: #9A6B12;
    --red: #B23B30;
    --blue: #2C6E9E;
    --warn-bg: #FFF6E3;  --warn-ink: #6B4A05;  --warn-strong: #4A3303;
    --bad-bg:  #FDECEA;  --bad-ink:  #8C2C22;
    --good-bg: #E8F6EE;  --good-ink: #14603A;
    --info-bg: #E9F2F9;  --info-ink: #1D5580;
    --shadow: 0 1px 0 rgba(16,24,32,0.06), 0 4px 12px rgba(16,24,32,0.10);
  }

  html[data-theme="mono"] {
    --bg: #0B0B0C;
    --panel: #151517;
    --panel2: #1E1E21;
    --border: #33333A;
    --text: #F2F2F3;
    --text-muted: #9A9AA2;
    --text-faint: #6B6B73;
    --blue: #C9C9D2;
    --accent-ink: #101012;
  }

  html[data-theme="mono-light"] {
    --bg: #F5F5F6;
    --panel: #FFFFFF;
    --panel2: #EBEBED;
    --border: #D6D6DA;
    --text: #16161A;
    --text-muted: #5A5A63;
    --text-faint: #85858E;
    --blue: #3A3A42;
    --accent-ink: #FFFFFF;
    --warn-bg: #FFF6E3;  --warn-ink: #6B4A05;  --warn-strong: #4A3303;
    --bad-bg:  #FDECEA;  --bad-ink:  #8C2C22;
    --good-bg: #E8F6EE;  --good-ink: #14603A;
    --info-bg: #EDEDEF;  --info-ink: #3A3A42;
    --shadow: 0 1px 0 rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.10);
  }


  /* Team mark, opposite the ADV logo in the header. Generated, not a file. */
  .adv-school-logo {
    height: 42px; width: auto; margin-left: auto; flex: 0 0 auto;
    align-self: center;
  }
  html[data-theme="light"] .adv-school-logo,
  html[data-theme="mono-light"] .adv-school-logo { filter: none; }

  html[data-accent="teal"]   { --accent: #2FA39B; }
  html[data-accent="violet"] { --accent: #8B72D9; }
  html[data-accent="amber"]  { --accent: #D2892B; --accent-ink: #1A1205; }
  html[data-accent="green"]  { --accent: #2E9E63; }
  html[data-accent="slate"]  { --accent: #6B7A89; }

  html[data-font="serif"]   { --font: Georgia, "Times New Roman", serif; }
  html[data-font="mono"]    { --font: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
  html[data-font="rounded"] { --font: ui-rounded, "SF Pro Rounded", "Segoe UI", system-ui, sans-serif; }

  body { font-family: var(--font); }

  /* Sizes across the repo are in px, so a font-size change alone does nothing.
     Zoom scales the layout, which is what people mean by "bigger" on a utility
     app — bigger buttons too, not just text. Applied to the page wrapper so
     overlays keep a constant size. */
  html[data-fs="s"]  { --fs: 0.92; }
  html[data-fs="l"]  { --fs: 1.10; }
  html[data-fs="xl"] { --fs: 1.22; }
  #app, .wrap, .adv-scale { zoom: var(--fs); }
  .adv-ap-overlay, .adv-ap-overlay * { zoom: 1; }

  /* The ADV logo is white artwork and vanishes on any light background. The
     first version only listed the two plain light themes, so it stayed white
     and invisible on the generated light themes. */
  html[data-theme="light"] .brand-logo,
  html[data-theme="mono-light"] .brand-logo,
  html[data-theme="custom-light"] .brand-logo { filter: invert(1) brightness(0.7); }

  /* Team marks are full-colour artwork — never filter them. */
  .adv-school-logo { filter: none !important; }

  button:focus-visible, a:focus-visible,
  select:focus-visible, input:focus-visible, textarea:focus-visible {
    outline: 2px solid var(--accent); outline-offset: 2px;
  }

  /* ---- picker ---- */
  .adv-ap-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.72);
    z-index: 2147482000; padding: 14px; overflow: auto;
    font-family: var(--font);
  }
  .adv-ap-card {
    background: var(--panel); border: 1px solid var(--border); color: var(--text);
    border-radius: 16px; padding: 18px; max-width: 380px; margin: auto;
  }
  .adv-ap-title { font-size: 16px; font-weight: 800; margin-bottom: 4px; }
  .adv-ap-sub { font-size: 11px; color: var(--text-faint); margin-bottom: 14px; font-family: monospace; }
  .adv-ap-label {
    font-size: 11px; font-weight: 800; color: var(--text-faint);
    text-transform: uppercase; letter-spacing: 0.7px; margin: 16px 0 8px;
  }
  .adv-ap-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .adv-ap-row { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
  .adv-ap-theme {
    display: flex; align-items: center; gap: 9px; text-align: left;
    background: var(--panel2); border: 1px solid var(--border); color: var(--text);
    border-radius: 11px; padding: 9px 10px; font-size: 13px; font-weight: 700;
    font-family: inherit; cursor: pointer;
  }
  .adv-ap-theme.on { border-color: var(--accent); box-shadow: 0 0 0 1px var(--accent); }
  .adv-ap-sw {
    width: 30px; height: 30px; border-radius: 8px; flex: 0 0 auto;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 800; border: 1px solid var(--border);
  }
  .adv-ap-dot {
    width: 34px; height: 34px; border-radius: 50%; border: 2px solid transparent;
    cursor: pointer; padding: 0; box-shadow: 0 0 0 1px rgba(128,128,128,0.35);
  }
  .adv-ap-dot.on { border-color: var(--text); }
  .adv-ap-chip {
    flex: 1; min-width: 62px; background: var(--panel2); border: 1px solid var(--border);
    color: var(--text); border-radius: 10px; padding: 11px 8px;
    font-size: 13.5px; font-weight: 700; cursor: pointer;
  }
  .adv-ap-chip.on { border-color: var(--accent); box-shadow: 0 0 0 1px var(--accent); }
  .adv-ap-btn {
    display: block; width: 100%; margin-top: 10px; padding: 13px 0;
    border-radius: 11px; border: none; cursor: pointer; font-family: inherit;
    font-size: 15px; font-weight: 800;
    background: var(--accent); color: var(--accent-ink);
  }
  .adv-ap-btn.ghost {
    background: var(--panel2); color: var(--text); border: 1px solid var(--border);
  }
  /* ---- demo-only picker bits ---- */
  .adv-ap-wheelrow { display: flex; gap: 10px; align-items: center; }
  .adv-ap-wheel {
    width: 46px; height: 38px; padding: 0; border-radius: 10px; cursor: pointer;
    background: var(--panel2); border: 1px solid var(--border); flex: 0 0 auto;
  }
  .adv-ap-hex {
    font-family: monospace; font-size: 12px; color: var(--text-muted);
    letter-spacing: 0.5px; flex: 0 0 auto; min-width: 66px;
  }
  .adv-ap-note {
    font-size: 11px; color: var(--text-faint); line-height: 1.45; margin-top: 8px;
  }
  `;

  var THEMES = [
    { id: "",           label: "Dark",       sw: "#0A0D12", ink: "#EDEFF3" },
    { id: "light",      label: "Light",      sw: "#F4F6F8", ink: "#131A21" },
    { id: "mono",       label: "Mono dark",  sw: "#0B0B0C", ink: "#F2F2F3" },
    { id: "mono-light", label: "Mono light", sw: "#F5F5F6", ink: "#16161A" }
  ];

  // ---- Invented clients ---------------------------------------------------
  // Made up on purpose. No real company, no real venue, no real school, no
  // real mark anywhere in here.
  //
  // They span the work rather than the sport, because the app is not a
  // football product — it runs crews for corporate AV, touring, worship,
  // theatre and broadcast the same way it runs a Friday night game. A demo
  // that only showed school colours would sell it short in front of a
  // conference centre.
  //
  // Each one is a name, two letters, a shape and a single colour. The palette
  // and the mark are both built from that colour at runtime, which is the
  // honest demonstration: a new client is one colour, not a rebuild.
  var BRANDS = [
    { id: "ashgrove",  label: "Ashgrove Events",   abbr: "AE", shape: "square", hue: "#3B3FA0" },
    { id: "riverside", label: "Riverside Touring", abbr: "RT", shape: "circle", hue: "#C2551E" },
    { id: "summit",    label: "Summit Center",     abbr: "SC", shape: "hex",    hue: "#1C7A55" },
    { id: "harbor",    label: "Harbor Broadcast",  abbr: "HB", shape: "circle", hue: "#1D6E7A" },
    { id: "cornerpt",  label: "Cornerpoint Church",abbr: "CP", shape: "arch",   hue: "#6B3FA0" },
    { id: "northgate", label: "Northgate Athletics", abbr: "NG", shape: "shield", hue: "#A32232" }
  ];
  var DEFAULT_HUE = "#3B3FA0";

  function brandFor(id) {
    for (var i = 0; i < BRANDS.length; i++) if (BRANDS[i].id === id) return BRANDS[i];
    return null;
  }

  // ---- colour maths -------------------------------------------------------
  // Small on purpose. A client picks one colour off a wheel; everything else —
  // background, panels, borders, muted text — is derived so the result is
  // always readable. Letting someone set a background directly is how you get
  // a demo with grey text on a grey page.

  function hexToRgb(hex) {
    var h = String(hex || "").trim().replace("#", "");
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }

  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h = 0, s = 0, l = (max + min) / 2;
    var d = max - min;
    if (d) {
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
      else if (max === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
      h *= 60;
    }
    return [h, s * 100, l * 100];
  }

  function hslToHex(h, s, l) {
    h = ((h % 360) + 360) % 360; s = Math.max(0, Math.min(100, s)) / 100;
    l = Math.max(0, Math.min(100, l)) / 100;
    var c = (1 - Math.abs(2 * l - 1)) * s;
    var x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    var m = l - c / 2;
    var seg = [[c, x, 0], [x, c, 0], [0, c, x], [0, x, c], [x, 0, c], [c, 0, x]][Math.floor(h / 60) % 6];
    return "#" + seg.map(function (v) {
      var n = Math.round((v + m) * 255);
      return (n < 16 ? "0" : "") + n.toString(16);
    }).join("");
  }

  function hslOf(hex) {
    var rgb = hexToRgb(hex) || hexToRgb(DEFAULT_HUE);
    return rgbToHsl(rgb[0], rgb[1], rgb[2]);
  }

  // Proper WCAG contrast, not an eyeball guess. The first version compared raw
  // channel averages and it let a bright yellow accent through with white text
  // on it — 2.5:1, unreadable on a phone in daylight, which is exactly where
  // this app gets used.
  function chanLin(c) {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  }
  function relLum(hex) {
    var r = hexToRgb(hex) || [0, 0, 0];
    return 0.2126 * chanLin(r[0]) + 0.7152 * chanLin(r[1]) + 0.0722 * chanLin(r[2]);
  }
  function contrast(a, b) {
    var x = relLum(a), y = relLum(b);
    return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
  }
  var INK_LIGHT = "#FFFFFF", INK_DARK = "#12140A";
  function inkOn(hex) {
    return contrast(hex, INK_LIGHT) >= contrast(hex, INK_DARK) ? INK_LIGHT : INK_DARK;
  }

  var clamp = function (v, lo, hi) { return Math.max(lo, Math.min(hi, v)); };

  // A colour wheel hands over colours that cannot be used as-is. Pure yellow
  // is invisible on a white page; pure navy is invisible on a dark one. So the
  // hue the client picked is kept and only the lightness is moved — to the
  // nearest value that is both visible against the page and readable with
  // white or black sitting on it. The button still looks like their colour.
  // Walk the lightness of one hue and return the shade closest to what was
  // asked for that still passes the test. If nothing passes — a near-grey pick
  // can fail every step — return whatever came closest, because a slightly-off
  // colour beats no colour at all.
  function pickShade(h, s, wantL, ok, score) {
    var best = null, bestDist = Infinity, fallback = null, fallbackScore = -1;
    for (var l = 6; l <= 96; l += 2) {
      var c = hslToHex(h, s, l);
      if (ok(c)) {
        var d = Math.abs(l - wantL);
        if (d < bestDist) { bestDist = d; best = c; }
      }
      var sc = score(c);
      if (sc > fallbackScore) { fallbackScore = sc; fallback = c; }
    }
    return best || fallback;
  }

  // The accent has to clear the floor on EVERY surface it lands on, not just
  // one. Fitting it against the page alone let a dark accent disappear on a
  // card; fitting it against the card alone let it disappear on the page. The
  // two are close but not equal, and the gap is exactly where buttons vanish.
  var ACC_VS_BG = 3.2, ACC_VS_INK = 4.6;
  function worstAgainst(c, surfaces) {
    var w = Infinity;
    for (var i = 0; i < surfaces.length; i++) w = Math.min(w, contrast(c, surfaces[i]));
    return w;
  }
  function fitAccent(h, s, wantL, surfaces) {
    return pickShade(h, s, wantL,
      function (c) {
        return worstAgainst(c, surfaces) >= ACC_VS_BG &&
               Math.max(contrast(c, INK_LIGHT), contrast(c, INK_DARK)) >= ACC_VS_INK;
      },
      function (c) {
        return Math.min(worstAgainst(c, surfaces) / ACC_VS_BG,
          Math.max(contrast(c, INK_LIGHT), contrast(c, INK_DARK)) / ACC_VS_INK);
      });
  }

  // Coloured text — links, the info line — has to clear normal body-text
  // contrast on whatever it sits on. A yellow client colour at a fixed
  // lightness came out at 3.3:1 on white, which is a link you cannot read.
  var INK_FLOOR = 4.6;
  function fitInk(h, s, wantL, surface) {
    return pickShade(h, s, wantL,
      function (c) { return contrast(c, surface) >= INK_FLOOR; },
      function (c) { return contrast(c, surface) / INK_FLOOR; });
  }

  // Dark: near-black page tinted by the hue, accent lifted into a band that
  // stays visible on it. A navy picked at 18% lightness would vanish, so the
  // accent is pushed to at least 44%.
  function darkVars(hex) {
    var p = hslOf(hex), h = p[0], s = clamp(p[1], 16, 78);
    var bg = hslToHex(h, s * 0.42, 6);
    var panel = hslToHex(h, s * 0.40, 10);
    var infoBg = hslToHex(h, s * 0.5, 13);
    var acc = fitAccent(h, clamp(s, 38, 82), clamp(p[2], 40, 70), [bg, panel]);
    return [
      "--bg: " + bg,
      "--panel: " + panel,
      "--panel2: " + hslToHex(h, s * 0.38, 14.5),
      "--border: " + hslToHex(h, s * 0.34, 24),
      "--text: " + hslToHex(h, 14, 95),
      "--text-muted: " + hslToHex(h, 11, 62),
      "--text-faint: " + hslToHex(h, 10, 48),
      "--blue: " + fitInk(h, clamp(s, 34, 70), 70, panel),
      "--accent: " + acc,
      "--accent-ink: " + inkOn(acc),
      "--info-bg: " + infoBg,
      "--info-ink: " + fitInk(h, clamp(s, 30, 62), 78, infoBg)
    ].join("; ") + ";";
  }

  // Light: an off-white page, never pure white behind body text — a phone at
  // a night game is the worst case for glare. Accent darkened so white sits on
  // it cleanly.
  function lightVars(hex) {
    var p = hslOf(hex), h = p[0], s = clamp(p[1], 16, 78);
    var bg = hslToHex(h, s * 0.30, 96.5);
    var infoBg = hslToHex(h, s * 0.42, 95);
    var acc = fitAccent(h, clamp(s, 34, 88), clamp(p[2], 24, 46), [bg, "#FFFFFF"]);
    return [
      "--bg: " + bg,
      "--panel: #FFFFFF",
      "--panel2: " + hslToHex(h, s * 0.28, 93),
      "--border: " + hslToHex(h, s * 0.26, 85),
      "--text: " + hslToHex(h, 24, 11),
      "--text-muted: " + hslToHex(h, 14, 35),
      "--text-faint: " + hslToHex(h, 12, 52),
      "--green: #1F7D4D",
      "--amber: #9A6B12",
      "--red: #B23B30",
      "--blue: " + fitInk(h, clamp(s, 30, 70), 34, "#FFFFFF"),
      "--accent: " + acc,
      "--accent-ink: " + inkOn(acc),
      "--warn-bg: #FFF6E3", "--warn-ink: #6B4A05", "--warn-strong: #4A3303",
      "--bad-bg: #FDECEA", "--bad-ink: #8C2C22",
      "--good-bg: #E8F6EE", "--good-ink: #14603A",
      "--info-bg: " + infoBg,
      "--info-ink: " + fitInk(h, clamp(s, 34, 72), 28, infoBg),
      "--shadow: 0 1px 0 rgba(16,24,32,0.07), 0 4px 12px rgba(16,24,32,0.10)"
    ].join("; ") + ";";
  }

  // One <style> element, rewritten in place. Appending a new one per click
  // would leave a pile of dead rules behind after a minute of fiddling.
  var customStyle = null;
  function paintCustom(hex) {
    if (!customStyle) {
      customStyle = document.createElement("style");
      customStyle.setAttribute("data-adv-custom", "");
      (document.head || document.documentElement).appendChild(customStyle);
    }
    customStyle.textContent =
      'html[data-theme="custom"] { ' + darkVars(hex) + ' }\n' +
      'html[data-theme="custom-light"] { ' + lightVars(hex) + ' }';
  }

  function isLightTheme(t) {
    t = String(t || "");
    return t === "light" || t === "mono-light" || t === "custom-light";
  }

  // ---- generated client mark ----------------------------------------------
  // Drawn here rather than shipped as a PNG. Nothing to host, nothing to
  // right-click and save, and no chance of a real logo ending up in the demo
  // repo by accident.
  //
  // The shape varies per client on purpose. Six identical shields would read
  // as a sports app; a square, a roundel, a hexagon and an arch read as six
  // different businesses, which is the point being made.
  var SHAPES = {
    square: "M12 2 H52 A10 10 0 0 1 62 12 V52 A10 10 0 0 1 52 62 H12 A10 10 0 0 1 2 52 V12 A10 10 0 0 1 12 2 Z",
    circle: "M32 2 A30 30 0 1 1 31.99 2 Z",
    hex:    "M32 2 L58 17 V47 L32 62 L6 47 V17 Z",
    arch:   "M32 2 C48 2 58 14 58 30 V62 H6 V30 C6 14 16 2 32 2 Z",
    shield: "M32 3 L59 12 V33 C59 49 47 58 32 62 C17 58 5 49 5 33 V12 Z"
  };

  function markFor(brand, hex, onLight) {
    var p = hslOf(hex), h = p[0], s = clamp(p[1], 30, 85);
    var deep = hslToHex(h, s, 22), mid = hslToHex(h, s, 42);
    var lift = hslToHex(h, clamp(s, 30, 70), 74);
    // The SAMPLE tag sits on the page, not on the mark, so its colour has to
    // follow the page. The light tint that reads on a dark header washes out
    // to nothing on a white one, and a watermark you cannot read is not a
    // watermark.
    var tag = onLight ? hslToHex(h, clamp(s, 30, 85), 32) : lift;
    var path = SHAPES[brand.shape] || SHAPES.square;
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 78" width="64" height="78">' +
        '<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="' + mid + '"/><stop offset="1" stop-color="' + deep + '"/>' +
        '</linearGradient></defs>' +
        '<path d="' + path + '" fill="url(#g)" stroke="' + lift + '" stroke-width="2.5"/>' +
        '<text x="32" y="41" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" ' +
          'font-size="22" font-weight="bold" fill="#FFFFFF">' + brand.abbr + '</text>' +
        '<text x="32" y="74" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" ' +
          'font-size="9" font-weight="bold" fill="' + tag + '" letter-spacing="1.4">SAMPLE</text>' +
      '</svg>';
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  // The mark sits opposite the ADV logo in the header. Injected rather than
  // written into every page, so it survives the shell being re-rendered.
  function paintLogo(theme) {
    var host = document.querySelector(".header-row") || document.querySelector(".banner");
    if (!host) return;
    var img = host.querySelector(".adv-school-logo");
    var a = current || load();
    var brand = String(theme || "").indexOf("custom") === 0 ? brandFor(a.brand) : null;
    if (!brand) { if (img) img.remove(); return; }
    if (!img) {
      img = document.createElement("img");
      img.className = "adv-school-logo";
      img.alt = "";
      host.appendChild(img);
    }
    img.setAttribute("src", markFor(brand, a.hue || brand.hue, isLightTheme(theme)));
    img.title = brand.label + " — sample brand";
  }

  var ACCENTS = [
    { id: "",       hex: "#4A8FC0", label: "Blue" },
    { id: "teal",   hex: "#2FA39B", label: "Teal" },
    { id: "violet", hex: "#8B72D9", label: "Violet" },
    { id: "green",  hex: "#2E9E63", label: "Green" },
    { id: "amber",  hex: "#D2892B", label: "Amber" },
    { id: "slate",  hex: "#6B7A89", label: "Slate" }
  ];
  var FONTS = [
    { id: "",        label: "System" },
    { id: "rounded", label: "Rounded" },
    { id: "serif",   label: "Serif" },
    { id: "mono",    label: "Mono" }
  ];
  var SIZES = [
    { id: "s", label: "S" }, { id: "", label: "M" },
    { id: "l", label: "L" }, { id: "xl", label: "XL" }
  ];

  // Whatever was applied last, held in memory as well as in storage. A demo
  // link can be opened in a private window or inside an iframe, where
  // localStorage throws on read — and the team mark used to disappear with it,
  // because it looked the colour up in storage every time it painted.
  var current = null;

  function load() {
    try {
      var saved = JSON.parse(localStorage.getItem(KEY) || "{}");
      if (saved && typeof saved === "object") return saved;
    } catch (e) { /* storage blocked — fall through */ }
    return current ? copy(current) : {};
  }

  function copy(o) {
    var out = {};
    for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) out[k] = o[k];
    return out;
  }

  function apply(a, save) {
    current = copy(a || {});
    var r = document.documentElement;
    // The generated rules have to exist before the attribute goes on, or the
    // page paints once with no variables at all.
    if (String(a.theme || "").indexOf("custom") === 0) paintCustom(a.hue || DEFAULT_HUE);
    [["data-theme", a.theme], ["data-accent", a.accent],
     ["data-font", a.font], ["data-fs", a.fs]].forEach(function (p) {
      if (p[1]) r.setAttribute(p[0], p[1]); else r.removeAttribute(p[0]);
    });
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      var bg = getComputedStyle(r).getPropertyValue("--bg").trim();
      if (bg) meta.setAttribute("content", bg);
    }
    if (save !== false) {
      try { localStorage.setItem(KEY, JSON.stringify(a)); } catch (e) {}
    }
    try { paintLogo(a.theme); } catch (e) {}
  }

  // Styles and the saved theme go in before first paint. Waiting for
  // DOMContentLoaded would paint the default first and then snap.
  var style = document.createElement("style");
  style.setAttribute("data-adv-theme", "");
  style.textContent = CSS;
  (document.head || document.documentElement).appendChild(style);
  apply(load(), false);

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (m) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m];
    });
  }

  function open() {
    var a = copy(current || load());
    var ov = document.createElement("div");
    ov.className = "adv-ap-overlay";

    ov.innerHTML =
      '<div class="adv-ap-card">' +
        '<div class="adv-ap-title">Appearance</div>' +
        '<div class="adv-ap-sub">Applies to every page on this device.</div>' +
        '<div class="adv-ap-label">Theme</div><div class="adv-ap-grid">' +
          THEMES.map(function (t) {
            return '<button class="adv-ap-theme" data-k="theme" data-v="' + t.id + '">' +
              '<span class="adv-ap-sw" style="background:' + t.sw + ';color:' + t.ink + '">Aa</span>' +
              esc(t.label) + '</button>';
          }).join("") +
        '</div>' +
        '<div class="adv-ap-label">Client look (samples)</div><div class="adv-ap-grid">' +
          BRANDS.map(function (b) {
            return '<button class="adv-ap-theme" data-client="' + b.id + '" data-hue="' + b.hue + '">' +
              '<span class="adv-ap-sw" style="background:' + b.hue + ';color:#FFFFFF">' + esc(b.abbr) + '</span>' +
              esc(b.label) + '</button>';
          }).join("") +
        '</div>' +
        '<div class="adv-ap-label">Your own colour</div>' +
        '<div class="adv-ap-wheelrow">' +
          '<input class="adv-ap-wheel" type="color" id="advApWheel" value="' + esc(a.hue || DEFAULT_HUE) + '" />' +
          '<span class="adv-ap-hex" id="advApHex">' + esc((a.hue || DEFAULT_HUE).toUpperCase()) + '</span>' +
          '<button class="adv-ap-chip" data-mode="custom">Dark</button>' +
          '<button class="adv-ap-chip" data-mode="custom-light">Light</button>' +
        '</div>' +
        '<div class="adv-ap-note">Pick a colour and the whole app is built from it — ' +
          'page, panels, borders and buttons, light or dark. Warning colours stay fixed on purpose.</div>' +
        '<div class="adv-ap-label">Accent</div><div class="adv-ap-row">' +
          ACCENTS.map(function (c) {
            return '<button class="adv-ap-dot" data-k="accent" data-v="' + c.id +
              '" title="' + esc(c.label) + '" style="background:' + c.hex + '"></button>';
          }).join("") +
        '</div>' +
        '<div class="adv-ap-label">Font</div><div class="adv-ap-row">' +
          FONTS.map(function (f) {
            return '<button class="adv-ap-chip" data-k="font" data-v="' + f.id + '">' + esc(f.label) + '</button>';
          }).join("") +
        '</div>' +
        '<div class="adv-ap-label">Text size</div><div class="adv-ap-row">' +
          SIZES.map(function (z) {
            return '<button class="adv-ap-chip" data-k="fs" data-v="' + z.id + '">' + esc(z.label) + '</button>';
          }).join("") +
        '</div>' +
        '<button class="adv-ap-btn ghost" data-act="reset">Reset to default</button>' +
        '<button class="adv-ap-btn" data-act="done">Done</button>' +
      '</div>';

    var wheel = ov.querySelector("#advApWheel");
    var hexLbl = ov.querySelector("#advApHex");

    // The production picker redrew the whole card on every click. That is fine
    // for buttons and fatal for a colour input — dragging the wheel rebuilds
    // the element underneath your finger and the drag dies. So the state is
    // repainted onto the existing nodes instead.
    function sync() {
      var custom = String(a.theme || "").indexOf("custom") === 0;
      ov.querySelectorAll("[data-k]").forEach(function (el) {
        el.classList.toggle("on", (a[el.dataset.k] || "") === el.dataset.v);
      });
      ov.querySelectorAll("[data-client]").forEach(function (el) {
        el.classList.toggle("on", custom && (a.brand || "") === el.dataset.client);
      });
      ov.querySelectorAll("[data-mode]").forEach(function (el) {
        el.classList.toggle("on", (a.theme || "") === el.dataset.mode);
      });
      var hx = a.hue || DEFAULT_HUE;
      if (wheel.value.toLowerCase() !== hx.toLowerCase()) wheel.value = hx;
      hexLbl.textContent = hx.toUpperCase();
    }

    ov.querySelectorAll("[data-k]").forEach(function (el) {
      el.onclick = function () { a[el.dataset.k] = el.dataset.v; apply(a); sync(); };
    });

    // A client sample keeps whichever of light or dark you were already on.
    // Someone demoing in a bright room should not be thrown back to dark every
    // time they try another client.
    ov.querySelectorAll("[data-client]").forEach(function (el) {
      el.onclick = function () {
        a.hue = el.dataset.hue;
        a.brand = el.dataset.client;
        a.theme = isLightTheme(a.theme) ? "custom-light" : "custom";
        apply(a); sync();
      };
    });

    // Light and dark for the client colour. These keep the sample mark — only
    // the wheel drops it, because at that point the colour is no longer that
    // sample's.
    ov.querySelectorAll("[data-mode]").forEach(function (el) {
      el.onclick = function () {
        if (!a.hue) a.hue = DEFAULT_HUE;
        a.theme = el.dataset.mode;
        apply(a); sync();
      };
    });

    function fromWheel() {
      a.hue = wheel.value;
      a.brand = "";
      if (String(a.theme || "").indexOf("custom") !== 0) {
        a.theme = isLightTheme(a.theme) ? "custom-light" : "custom";
      }
      apply(a); sync();
    }
    wheel.oninput = fromWheel;
    wheel.onchange = fromWheel;

    ov.querySelector('[data-act="reset"]').onclick = function () {
      a = {}; apply(a); sync();
    };
    ov.querySelector('[data-act="done"]').onclick = close;

    function close() { ov.remove(); document.body.style.overflow = ""; }
    ov.onclick = function (e) { if (e.target === ov) close(); };

    document.body.appendChild(ov);
    document.body.style.overflow = "hidden";
    sync();
  }

  function wire() {
    document.querySelectorAll("[data-adv-appearance]").forEach(function (el) {
      if (el.__advWired) return;
      el.__advWired = true;
      el.addEventListener("click", function (e) { e.preventDefault(); open(); });
    });
  }
  function ready() { wire(); try { paintLogo(load().theme); } catch (e) {} }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
  } else {
    ready();
  }

  // A page that renders its header late can call ADVTheme.wire() again.
  window.ADVTheme = { open: open, apply: apply, load: load, wire: wire, paintLogo: paintLogo };
})();
