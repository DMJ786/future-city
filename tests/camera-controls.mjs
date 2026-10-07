import assert from 'node:assert/strict';
import {attachCameraControls} from '../dist/camera-controls.mjs';

const handlers=new Map(),hostHandlers=new Map();
const canvas={clientHeight:710,addEventListener:(n,f)=>handlers.set(n,f),removeEventListener:n=>handlers.delete(n),setPointerCapture(){}};
const host={addEventListener:(n,f)=>hostHandlers.set(n,f),removeEventListener:n=>hostHandlers.delete(n)};
let angle=0,zoom=24,taps=0;
const controls=attachCameraControls(canvas,{getAngle:()=>angle,setAngle:a=>angle=a,getZoom:()=>zoom,setZoom:z=>zoom=z,onTap:()=>taps++,host});
function send(type,id,x,y=0,extra={}){handlers.get(type)?.({pointerId:id,clientX:x,clientY:y,button:0,...extra});}

// Spread fingers to zoom in, then lift one and continue rotating without a jump or tap.
send('pointerdown',1,0);send('pointerdown',2,100);send('pointermove',2,200);
assert.equal(zoom,12);assert.equal(angle,0);
send('pointerup',2,200);send('pointermove',1,10);assert.equal(angle,.08);
send('pointerup',1,10);assert.equal(taps,0);
send('pointerdown',3,20);send('pointerup',3,20);assert.equal(taps,1);

// Bringing fingers together zooms out; extreme gestures stay within the safe range.
zoom=24;send('pointerdown',1,0);send('pointerdown',2,100);
send('pointermove',2,50);assert.equal(zoom,34);
send('pointermove',2,1000);assert.equal(zoom,10);
send('pointercancel',2,1000);send('pointerup',1,0);assert.equal(taps,1);

// A drag that returns to its starting point is still a drag, never a district tap.
send('pointerdown',1,0);send('pointermove',1,30);send('pointermove',1,0);send('pointerup',1,0);assert.equal(taps,1);
send('pointerdown',1,0);send('lostpointercapture',1,0);send('pointerup',1,0);assert.equal(taps,1);
send('pointerdown',1,0);hostHandlers.get('blur')();send('pointerup',1,0);assert.equal(taps,1);

zoom=24;controls.zoomBy(.85);assert.equal(zoom,20.4);controls.zoomBy(1/.85);assert.ok(Math.abs(zoom-24)<1e-10);
controls.zoomBy(100);assert.equal(zoom,34);controls.zoomBy(.001);assert.equal(zoom,10);
controls.zoomBy(NaN);assert.equal(zoom,10);
let prevented=false;zoom=24;
send('wheel',0,0,0,{deltaY:-100,deltaMode:0,preventDefault:()=>prevented=true});assert.equal(zoom,22.8);assert.ok(prevented);
send('pointerdown',1,0,0,{button:2});send('pointerup',1,0);assert.equal(taps,1);
controls.dispose();assert.equal(handlers.size,0);assert.equal(hostHandlers.size,0);
console.log('PASS: pinch direction/bounds, pinch-to-drag continuity, no accidental district taps, cancellation, blur, zoom buttons and desktop wheel. Real touch hardware remains unverified.');
