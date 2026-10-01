(function () {
  try {
    var home = document.documentElement.getAttribute("data-vd-home") === "1";
    var reduce = false;
    try { reduce = matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}
    var seen = false;
    try { seen = sessionStorage.getItem("vd-intro-seen") === "1"; } catch (e) {}
    if (home && !seen && !reduce) return;
    var w = document.documentElement.clientWidth || window.innerWidth;
    if (!w) return;
    var header = w >= 1024 ? 144 : w >= 640 ? 112 : 76;
    var padX = w >= 640 ? 32 : 12;
    var inner = Math.min(1152, Math.max(0, w - padX * 2));
    var section = (w >= 640 ? 32 : 20) + inner * (563 / 1180) + 64;
    var stageW = w;
    var stageH = section + header;
    var scale = Math.min(stageW / 1920, stageH / 1080);
    var dispW = 1920 * scale;
    var offsetX = (stageW - dispW) / 2;
    var offsetY = (stageH - 1080 * scale) / 2;
    var shieldW = 254 * scale;
    var shieldH = 212 * scale;
    var shieldLeft = offsetX + 832 * scale;
    var shieldTopPx = offsetY + 53 * scale;
    var imgW = shieldW * (293 / 288);
    var imgH = imgW * (248 / 293);
    var visibleW = imgW * (288 / 293);
    var visibleH = imgH * (241 / 248);
    var left = shieldLeft + (shieldW - visibleW) / 2 - (4 / 293) * imgW;
    var top = shieldTopPx + (shieldH - visibleH) / 2 - (3 / 248) * imgH;
    var shieldCenter = shieldTopPx + shieldH / 2;
    var desired = header / 2 - shieldCenter;
    var maxLift = Math.max(0, shieldTopPx - 2);
    var dy = desired < 0 ? Math.max(desired, -maxLift) : desired;
    top += dy;
    var view = window.innerWidth || w;
    var visibleCenter = left + (4 / 293) * imgW + visibleW / 2;
    left += view / 2 - visibleCenter;
    var css = "[data-intro-logo]{translate:none!important;transform:none!important;left:" + left + "px!important;top:" + top + "px!important;width:" + imgW + "px!important;height:" + imgH + "px!important}[data-intro-logo] img{width:100%!important;height:100%!important;max-width:none!important}";
    if (home) {
      var visibleBottom = top + (3 / 248) * imgH + visibleH;
      var room = stageH - visibleBottom;
      var gap = Math.max(12, Math.min(36, room * 0.08));
      var artTop = visibleBottom - header + gap;
      css += "[data-intro-logo]{opacity:1!important;pointer-events:auto!important}[data-intro-wordmark]{opacity:1!important;top:" + artTop + "px!important;bottom:" + gap + "px!important}";
    }
    var s = document.createElement("style");
    s.id = home ? "vd-intro-pending" : "vd-header-logo-pending";
    s.textContent = css;
    document.head.appendChild(s);
  } catch (e) {}
})();
