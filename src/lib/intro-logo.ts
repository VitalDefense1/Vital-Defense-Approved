/**
 * Settled shield inside opening.mp4, and the transparent margin of
 * shield-symbol.png. The header mark is sized so its opaque pixels land on
 * that shield. The file's aspect ratio stays intact.
 */
export const INTRO_FRAME = { width: 1920, height: 1080 }

export const INTRO_SHIELD = { x: 850, y: 46, width: 220, height: 185 }

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

/** Logo box in stage coordinates. */
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

/** Same box, relative to the header element, centered on the icon row. */
export function logoBoxInHeader(stage: DOMRect, header: DOMRect): LogoBox {
  const local = settledLogoInStage(stage.width, stage.height)
  const box = {
    left: stage.left - header.left + local.left,
    top: stage.top - header.top + local.top,
    width: local.width,
    height: local.height,
  }
  const visibleH = box.height * (MARK_VISIBLE.height / MARK_FILE.height)
  const visibleCenter =
    box.top + (MARK_VISIBLE.y / MARK_FILE.height) * box.height + visibleH / 2
  return { ...box, top: box.top + (header.height / 2 - visibleCenter) }
}

/**
 * Paints the finished header mark before hydration when this session has
 * already played the intro, or when the visitor prefers reduced motion.
 * Does not touch attributes React hydrates.
 */
export const introLogoBootScript = `(function(){try{if(location.pathname!=="/")return;var reduce=false;try{reduce=matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){}var seen=false;try{seen=sessionStorage.getItem("vd-intro-seen")==="1"}catch(e){}if(!seen&&!reduce)return;var w=document.documentElement.clientWidth||window.innerWidth;var header=w>=1024?144:w>=640?112:76;var padX=w>=640?32:12;var inner=Math.min(1152,w-padX*2);var section=(w>=640?32:20)+inner*(563/1180)+64;var stageW=w;var stageH=section+header;var scale=Math.min(stageW/1920,stageH/1080);var dispW=1920*scale;var dispH=1080*scale;var offsetX=(stageW-dispW)/2;var offsetY=(stageH-dispH)/2;var shieldW=220*scale;var shieldH=185*scale;var shieldLeft=offsetX+850*scale;var shieldTop=offsetY+46*scale;var imgW=shieldW*(293/288);var imgH=imgW*(248/293);var visibleW=imgW*(288/293);var visibleH=imgH*(241/248);var left=shieldLeft+(shieldW-visibleW)/2-(4/293)*imgW;var top=shieldTop+(shieldH-visibleH)/2-(3/248)*imgH;var visibleCenter=top+(3/248)*imgH+visibleH/2;top=top+(header/2-visibleCenter);var css="[data-intro-logo]{opacity:1!important;pointer-events:auto!important;translate:none!important;transform:none!important;left:"+left+"px!important;top:"+top+"px!important;width:"+imgW+"px!important;height:"+imgH+"px!important}[data-intro-logo] img{width:100%!important;height:100%!important;max-width:none!important}";var s=document.createElement("style");s.id="vd-intro-pending";s.textContent=css;document.head.appendChild(s)}catch(e){}})();`
