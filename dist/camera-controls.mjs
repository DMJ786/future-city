// Shared by touch, mouse wheel and the accessible zoom buttons.
export function attachCameraControls(canvas,{getAngle,setAngle,getZoom,setZoom,onTap,host=globalThis}){
 const pointers=new Map();let drag=null,pinch=null,suppressTap=false;
 const clamp=z=>Math.max(10,Math.min(34,z));
 function zoomTo(z){if(Number.isFinite(z))setZoom(clamp(z));}
 function zoomBy(factor){if(Number.isFinite(factor)&&factor>0)zoomTo(getZoom()*factor);}
 function rebase(){
  const points=[...pointers.values()];drag=null;pinch=null;
  if(points.length>=2){suppressTap=true;pinch={distance:Math.max(1,Math.hypot(points[0].x-points[1].x,points[0].y-points[1].y)),zoom:getZoom()};}
  else if(points.length===1)drag={...points[0],angle:getAngle()};
 }
 function down(e){
  if(e.button!==undefined&&e.button!==0)return;
  if(!pointers.size)suppressTap=false;
  pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
  try{canvas.setPointerCapture(e.pointerId);}catch{}
  rebase();
 }
 function move(e){
  if(!pointers.has(e.pointerId))return;
  pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(pinch){const [a,b]=[...pointers.values()];const distance=Math.max(1,Math.hypot(a.x-b.x,a.y-b.y));zoomTo(pinch.zoom*pinch.distance/distance);}
  else if(drag){if(Math.hypot(e.clientX-drag.x,e.clientY-drag.y)>=8)suppressTap=true;setAngle(drag.angle+(e.clientX-drag.x)*.008);}
 }
 function end(e,cancelled=false){
  if(!pointers.has(e.pointerId))return;
  const tapped=!cancelled&&!suppressTap&&pointers.size===1&&drag&&Math.hypot(e.clientX-drag.x,e.clientY-drag.y)<8;
  pointers.delete(e.pointerId);if(cancelled)suppressTap=true;rebase();
  if(tapped)onTap(e);
 }
 function wheel(e){e.preventDefault();const pixels=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?canvas.clientHeight:1);zoomTo(getZoom()+pixels*.012);}
 const up=e=>end(e),cancel=e=>end(e,true),reset=()=>{pointers.clear();drag=null;pinch=null;suppressTap=false;};
 const listeners={pointerdown:down,pointermove:move,pointerup:up,pointercancel:cancel,lostpointercapture:cancel,wheel};
 for(const [type,fn] of Object.entries(listeners))canvas.addEventListener(type,fn,type==='wheel'?{passive:false}:undefined);
 host.addEventListener?.('blur',reset);
 return {zoomBy,dispose(){for(const [type,fn] of Object.entries(listeners))canvas.removeEventListener(type,fn);host.removeEventListener?.('blur',reset);reset();}};
}
