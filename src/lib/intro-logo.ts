/**
 * Settled shield inside opening.mp4, and the transparent margin of
 * shield-symbol.png. The header mark is sized so its opaque pixels land on
 * that shield. The file's aspect ratio stays intact.
 */
export const INTRO_FRAME = { width: 1920, height: 1080 }

export const INTRO_SHIELD = { x: 832, y: 53, width: 254, height: 212 }

export const MARK_FILE = { width: 293, height: 248 }

export const MARK_VISIBLE = { x: 4, y: 3, width: 288, height: 241 }

export type LogoBox = { left: number; top: number; width: number; height: number }

export type FrameBox = { left: number; top: number; width: number; height: number }

export function containedFrame(stageWidth: number, stageHeight: number): FrameBox {
  const scale = Math.min(stageWidth / INTRO_FRAME.width, stageHeight / INTRO_FRAME.height)
  const width = INTRO_FRAME.width * scale
  const height = INTRO_FRAME.height * scale
  return {
    left: (stageWidth - width) / 2,
    top: (stageHeight - height) / 2,
    width,
    height,
  }
}

/**
 * How far the film must move so the settled shield's center sits on the
 * header icon row. Negative means up.
 */
export function iconRowShift(
  stageWidth: number,
  stageHeight: number,
  headerHeight: number,
  stageTop = 0,
  headerTop = 0,
): number {
  const frame = containedFrame(stageWidth, stageHeight)
  const scale = frame.width / INTRO_FRAME.width
  const shieldTop = stageTop + frame.top + INTRO_SHIELD.y * scale
  const shieldCenter = shieldTop + (INTRO_SHIELD.height * scale) / 2
  const desired = headerTop + headerHeight / 2 - shieldCenter
  const maxLift = Math.max(0, shieldTop - (headerTop + 2))
  return desired < 0 ? Math.max(desired, -maxLift) : desired
}

/** Contained film, shifted so the ending shield lines up with the icons. */
export function placedFrame(
  stageWidth: number,
  stageHeight: number,
  headerHeight: number,
  stageTop = 0,
  headerTop = 0,
): FrameBox {
  const frame = containedFrame(stageWidth, stageHeight)
  return {
    ...frame,
    top:
      frame.top +
      iconRowShift(stageWidth, stageHeight, headerHeight, stageTop, headerTop),
  }
}

/** Logo box in stage coordinates, before the icon-row shift. */
export function settledLogoInStage(stageWidth: number, stageHeight: number): LogoBox {
  const scale = Math.min(stageWidth / INTRO_FRAME.width, stageHeight / INTRO_FRAME.height)
  const frame = containedFrame(stageWidth, stageHeight)
  const shieldW = INTRO_SHIELD.width * scale
  const shieldH = INTRO_SHIELD.height * scale
  const shieldLeft = frame.left + INTRO_SHIELD.x * scale
  const shieldTop = frame.top + INTRO_SHIELD.y * scale

  const imgW = shieldW * (MARK_FILE.width / MARK_VISIBLE.width)
  const imgH = imgW * (MARK_FILE.height / MARK_FILE.width)
  const visibleW = imgW * (MARK_VISIBLE.width / MARK_FILE.width)
  const visibleH = imgH * (MARK_VISIBLE.height / MARK_FILE.height)

  return {
    left: shieldLeft + (shieldW - visibleW) / 2 - (MARK_VISIBLE.x / MARK_FILE.width) * imgW,
    top: shieldTop + (shieldH - visibleH) / 2 - (MARK_VISIBLE.y / MARK_FILE.height) * imgH,
    width: imgW,
    height: imgH,
  }
}

/**
 * Header mark for every page except the homepage.
 * Mirrors the opening section's settled shield: the same header heights,
 * the same spacer (pt, aspect 1180/563, max width 1152, pb), and the same
 * icon-row shift. The homepage still measures its live stage instead.
 */
export function settledHeaderLogo(viewportWidth: number): LogoBox {
  const headerHeight = viewportWidth >= 1024 ? 144 : viewportWidth >= 640 ? 112 : 76
  const padX = viewportWidth >= 640 ? 32 : 12
  const inner = Math.min(1152, Math.max(0, viewportWidth - padX * 2))
  const sectionHeight = (viewportWidth >= 640 ? 32 : 20) + inner * (563 / 1180) + 64
  const stage = {
    left: 0,
    top: 0,
    width: viewportWidth,
    height: sectionHeight + headerHeight,
  } as DOMRect
  const header = {
    left: 0,
    top: 0,
    width: viewportWidth,
    height: headerHeight,
  } as DOMRect
  return logoBoxInHeader(stage, header)
}

/** Same box, relative to the header, after the film has been shifted up. */
export function logoBoxInHeader(stage: DOMRect, header: DOMRect): LogoBox {
  const local = settledLogoInStage(stage.width, stage.height)
  const dy = iconRowShift(stage.width, stage.height, header.height, stage.top, header.top)
  return {
    left: stage.left - header.left + local.left,
    top: stage.top - header.top + local.top + dy,
    width: local.width,
    height: local.height,
  }
}

/**
 * Paints the finished header mark before hydration when this session has
 * already played the intro, or when the visitor prefers reduced motion.
 * Does not touch attributes React hydrates.
 */
/**
 * Paints the settled header mark on pages other than the homepage.
 * Returns immediately on `/`, so the homepage intro script is untouched.
 */
export const otherPageLogoBootScript = `(function(){try{if(location.pathname==="/")return;var w=document.documentElement.clientWidth||window.innerWidth;if(!w)return;var header=w>=1024?144:w>=640?112:76;var padX=w>=640?32:12;var inner=Math.min(1152,Math.max(0,w-padX*2));var section=(w>=640?32:20)+inner*(563/1180)+64;var stageW=w;var stageH=section+header;var scale=Math.min(stageW/1920,stageH/1080);var dispW=1920*scale;var offsetX=(stageW-dispW)/2;var offsetY=(stageH-1080*scale)/2;var shieldW=254*scale;var shieldH=212*scale;var shieldLeft=offsetX+832*scale;var shieldTopPx=offsetY+53*scale;var imgW=shieldW*(293/288);var imgH=imgW*(248/293);var visibleW=imgW*(288/293);var visibleH=imgH*(241/248);var left=shieldLeft+(shieldW-visibleW)/2-(4/293)*imgW;var top=shieldTopPx+(shieldH-visibleH)/2-(3/248)*imgH;var shieldCenter=shieldTopPx+shieldH/2;var desired=header/2-shieldCenter;var maxLift=Math.max(0,shieldTopPx-2);var dy=desired<0?Math.max(desired,-maxLift):desired;top+=dy;var css="[data-intro-logo]{translate:none!important;transform:none!important;left:"+left+"px!important;top:"+top+"px!important;width:"+imgW+"px!important;height:"+imgH+"px!important}[data-intro-logo] img{width:100%!important;height:100%!important;max-width:none!important}";var s=document.createElement("style");s.id="vd-header-logo-pending";s.textContent=css;document.head.appendChild(s)}catch(e){}})();`

export const introLogoBootScript = `(function(){try{if(location.pathname!=="/")return;var reduce=false;try{reduce=matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){}var seen=false;try{seen=sessionStorage.getItem("vd-intro-seen")==="1"}catch(e){}if(!seen&&!reduce)return;var w=document.documentElement.clientWidth||window.innerWidth;var header=w>=1024?144:w>=640?112:76;var padX=w>=640?32:12;var inner=Math.min(1152,w-padX*2);var section=(w>=640?32:20)+inner*(563/1180)+64;var stageW=w;var stageH=section+header;var scale=Math.min(stageW/1920,stageH/1080);var dispW=1920*scale;var dispH=1080*scale;var offsetX=(stageW-dispW)/2;var offsetY=(stageH-dispH)/2;var shieldW=254*scale;var shieldH=212*scale;var shieldLeft=offsetX+832*scale;var shieldTopPx=offsetY+53*scale;var imgW=shieldW*(293/288);var imgH=imgW*(248/293);var visibleW=imgW*(288/293);var visibleH=imgH*(241/248);var left=shieldLeft+(shieldW-visibleW)/2-(4/293)*imgW;var top=shieldTopPx+(shieldH-visibleH)/2-(3/248)*imgH;var shieldCenter=shieldTopPx+shieldH/2;var desired=header/2-shieldCenter;var maxLift=Math.max(0,shieldTopPx-2);var dy=desired<0?Math.max(desired,-maxLift):desired;top=top+dy;var visibleBottom=top+(3/248)*imgH+visibleH;var room=stageH-visibleBottom;var gap=Math.max(12,Math.min(36,room*0.08));var artTop=visibleBottom-header+gap;var css="[data-intro-logo]{opacity:1!important;pointer-events:auto!important;translate:none!important;transform:none!important;left:"+left+"px!important;top:"+top+"px!important;width:"+imgW+"px!important;height:"+imgH+"px!important}[data-intro-logo] img{width:100%!important;height:100%!important;max-width:none!important}[data-intro-wordmark]{opacity:1!important;top:"+artTop+"px!important;bottom:"+gap+"px!important}";var s=document.createElement("style");s.id="vd-intro-pending";s.textContent=css;document.head.appendChild(s)}catch(e){}})();`
