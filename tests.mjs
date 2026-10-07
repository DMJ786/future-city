import assert from 'node:assert/strict';
import {initial,build,advance,score,placementBonus,isWin} from './dist/game.mjs';
const s=initial();build(s,0,'forest');build(s,1,'solar');build(s,2,'wetland');assert.equal(s.budget,24);assert.throws(()=>build(s,0,'forest'),/already/);assert.throws(()=>build(s,3,'homes'),/Not enough/);assert.throws(()=>build(s,8,'homes'),/district/);assert.throws(()=>build(s,3,'bogus'),/Unknown/);advance(s);build(s,3,'homes');advance(s);advance(s);assert.match(s.log[0],/protects/);build(s,4,'solar');advance(s);build(s,5,'forest');while(!s.ended)advance(s);assert.equal(s.year,2058);assert.equal(score(s),83);assert.ok(s.plots.every(Boolean));assert.throws(()=>advance(s),/complete/);assert.throws(()=>build(s,2,'forest'),/complete/);
const bad=initial();while(!bad.ended)advance(bad);assert.equal(bad.stats[2],9);assert.ok(score(bad)<70);console.log('PASS: winning route, losses, budget, invalid actions, duplicate builds, and end-state guards.');

// Strategic placement must be applied exactly once, independent of build order.
const a=initial(),b=initial();build(a,0,'forest');build(a,3,'homes');build(b,3,'homes');build(b,0,'forest');assert.deepEqual(a.stats,b.stats);assert.equal(a.stats[2],69);
assert.deepEqual(placementBonus(initial(),2,'wetland'),[0,0,0,6]);assert.deepEqual(placementBonus(initial(),1,'wetland'),[0,0,0,0]);assert.deepEqual(placementBonus(initial(),4,'solar'),[0,6,0,0]);
const snapshot=JSON.stringify(a);assert.throws(()=>build(a,3,'solar'));assert.equal(JSON.stringify(a),snapshot);
const allGreen=initial();for(let i=0;i<6;i++){while(allGreen.budget<28)advance(allGreen);build(allGreen,i,'forest')}while(!allGreen.ended)advance(allGreen);assert.ok(!isWin(allGreen),'A mono-culture strategy must not win');assert.ok(isWin(s));
console.log('PASS: placement bonuses, build-order consistency, atomic failure, and strategic trade-offs.');
const {cleanName,letterFor,escapeHTML}=await import('./dist/letters.mjs');
assert.equal(cleanName('  Alex\n  '),'Alex');assert.equal(cleanName('x'.repeat(60)).length,40);assert.equal(escapeHTML('<img src=x onerror="alert(1)">'),'&lt;img src=x onerror=&quot;alert(1)&quot;&gt;');
const thrivingLetter=letterFor(s,'Alex'),unfinishedLetter=letterFor(bad,'Alex');assert.equal(thrivingLetter.to,'Alex');assert.ok(thrivingLetter.paragraphs.some(p=>p.includes('rooftops collect')));assert.notDeepEqual(thrivingLetter.paragraphs,unfinishedLetter.paragraphs);assert.match(unfinishedLetter.closing,/unfinished/);assert.equal(letterFor(s).to,'the people who come after us');
console.log('PASS: dedication normalisation, escaped HTML and outcome-dependent letters.');
const {encodeGift,decodeGift,giftFrames}=await import('./dist/gifts.mjs');
const gift=encodeGift(s,{to:'யாழினி 💚',from:'Dhilip'}),decoded=decodeGift(gift);assert.equal(decoded.to,'யாழினி 💚');assert.equal(decoded.from,'Dhilip');assert.deepEqual(decoded.state,s);assert.equal(score(decoded.state),83);assert.ok(gift.length<1000);assert.equal(giftFrames(s)[0].year,2050);assert.equal(giftFrames(s).at(-1).year,2058);assert.equal(giftFrames(s).filter(f=>f.history.length>0).at(-1).history.length,6);
const losing=decodeGift(encodeGift(bad,{to:'Future me'}));assert.deepEqual(losing.state,bad);assert.throws(()=>encodeGift(initial()),/Finish/);
function rawGift(obj){return '#gift='+Buffer.from(JSON.stringify(obj)).toString('base64url');}
const payload=JSON.parse(Buffer.from(gift.slice(6),'base64url').toString());
for(const hash of ['#gift=','not-a-gift','#gift=%%%%','#gift='+ 'a'.repeat(2100),rawGift({...payload,v:3}),rawGift({...payload,p:[0,0,0,0,0,0]}),rawGift({...payload,h:[[2050,0,1],[2050,0,1]]}),rawGift({...payload,h:[[2058,0,0]]}),rawGift({...payload,h:[[2050,0,99]]}),rawGift({...payload,h:[[2050,0,1],[2050,1,1],[2050,2,1],[2050,3,1]]}),rawGift({...payload,t:'x'.repeat(41)}),rawGift({...payload,unexpected:true})])assert.throws(()=>decodeGift(hash));
const htmlName=decodeGift(encodeGift(s,{to:'<img src=x onerror=alert(1)>',from:'<script>'}));assert.equal(htmlName.to,'<img src=x onerror=alert(1)>');
console.log('PASS: gift round-trips preserve Unicode, names, city, score, events and ordered history; malformed, altered, impossible and oversized gifts rejected.');

assert.equal(score(decodeGift(rawGift({...payload,s:100})).state),83,"Stored scores are ignored for display");
for(const edit of [{s:'83'},{s:-1},{s:101},{t:null},{f:[]},{p:[0,1,3,2,1,'0']},{h:Array(7).fill([2050,0,0])},{h:[[2049,0,0]]},{h:[[2050,6,0]]},{h:[[2050,0,-1]]},{h:[[2050.5,0,0]]},{h:[[2051,0,0],[2050,1,1]]},{h:'no'},{t:'a\u0000b'}])assert.throws(()=>decodeGift(rawGift({...payload,...edit})));
console.log('PASS: strict types, ranges, history limit, year ordering, control characters and score recomputation.');
const {LANDMARKS,loadWithFallback,inspectGLB}=await import('./dist/landmarks.mjs');
const {makePlaceholder,normalizeLandmark}=await import('./dist/landmark-view.js');
const THREE=await import('./dist/vendor/three.module.js');
const v1={...payload,v:1};delete v1.l;assert.equal(decodeGift(rawGift(v1)).landmark,null);assert.deepEqual(decodeGift(rawGift(v1)).state,s);
for(const landmark of LANDMARKS){const decoded=decodeGift(encodeGift(s,{to:'Alex',from:'Dhilip',landmark:landmark.id}));assert.equal(decoded.landmark,landmark.id);assert.ok(letterFor(decoded.state,decoded.to,decoded.landmark).paragraphs.includes(landmark.line));let warned=0;const result=await loadWithFallback(landmark.id,{load:async()=>{throw Error('404')},placeholder:makePlaceholder,warn:()=>warned++});assert.equal(result.source,'procedural');assert.equal(warned,1);const bounds=new THREE.Box3().setFromObject(result.model),size=bounds.getSize(new THREE.Vector3());assert.ok(Math.max(size.x,size.z)<=1.501&&size.y<=2.501);assert.ok(Math.abs(bounds.min.y)<.001);}
const dummy={id:'loaded'};assert.equal((await loadWithFallback('books',{load:async()=>dummy,placeholder:()=>assert.fail('Unexpected fallback')})).model,dummy);
assert.equal((await loadWithFallback(null,{load:()=>assert.fail('No landmark must not load')})).source,'none');
for(const l of ['../../bad','<img>',4,{},undefined])assert.throws(()=>decodeGift(rawGift({...payload,l})));
assert.throws(()=>normalizeLandmark(new THREE.Group()),/bounds/);
assert.throws(()=>inspectGLB(new ArrayBuffer(1500000)),/1.4 MB/);
function glb(json){const bytes=Buffer.from(JSON.stringify(json).padEnd(Math.ceil(JSON.stringify(json).length/4)*4,' '));const all=Buffer.alloc(bytes.length+20);all.writeUInt32LE(0x46546c67,0);all.writeUInt32LE(2,4);all.writeUInt32LE(all.length,8);all.writeUInt32LE(bytes.length,12);all.writeUInt32LE(0x4e4f534a,16);bytes.copy(all,20);return all.buffer.slice(all.byteOffset,all.byteOffset+all.byteLength);}
assert.throws(()=>inspectGLB(glb({buffers:[{uri:'https://evil.invalid/model.bin'}]})),/Embed/);
assert.throws(()=>inspectGLB(glb({extensionsRequired:['KHR_draco_mesh_compression']})),/decoder/);
assert.deepEqual(inspectGLB(glb({asset:{version:'2.0'},buffers:[{byteLength:0}]})).asset,{version:'2.0'});
const example=(await import('node:fs/promises')).readFile;const originalLink=(await example('./dist/submission.html','utf8')).match(/\.\/(#gift=[A-Za-z0-9_-]+)/)[1];assert.equal(score(decodeGift(originalLink).state),83);assert.equal(decodeGift(originalLink).landmark,null);
console.log('PASS: original v1 URL, five v2 landmarks, fallback geometry, bounds, missing assets, model limits and no external model resources.');
const {createSoundscape}=await import('./dist/soundscape.mjs');
const unsupported=createSoundscape({host:{}});assert.equal(unsupported.context,null);assert.equal(unsupported.enabled,false);assert.equal(await unsupported.setEnabled(true),false);await unsupported.visibility();await unsupported.dispose();
let constructed=0,closed=0;
const param={value:0,setValueAtTime(){},linearRampToValueAtTime(){},exponentialRampToValueAtTime(){}};
const node=()=>({gain:{...param},frequency:{...param},connect(){},disconnect(){},start(){},stop(){}});
class FakeAudio {constructor(){constructed++;this.sampleRate=100;this.currentTime=0;this.state='suspended';}createGain(){return node();}createOscillator(){return node();}createBufferSource(){return node();}createBiquadFilter(){return node();}createBuffer(){return {getChannelData:()=>new Float32Array(200)}}async resume(){this.state='running';}async suspend(){this.state='suspended';}async close(){closed++;this.state='closed';}}
let queued=null,hidden=false;const sound=createSoundscape({host:{AudioContext:FakeAudio},getRestored:()=>6,isHidden:()=>hidden,schedule:f=>(queued=f,1),cancel:()=>queued=null});assert.equal(constructed,0);assert.equal(await sound.setEnabled(true),true);assert.equal(constructed,1);assert.ok(queued);hidden=true;await sound.visibility();assert.equal(sound.context.state,'suspended');assert.equal(queued,null);hidden=false;await sound.visibility();assert.equal(sound.context.state,'running');assert.equal(await sound.setEnabled(false),false);assert.equal(queued,null);await sound.dispose();assert.equal(closed,1);
class DeniedAudio extends FakeAudio {async resume(){throw Error('Denied');}}
const denied=createSoundscape({host:{AudioContext:DeniedAudio}});assert.equal(await denied.setEnabled(true),false);assert.equal(denied.context,null);
console.log('PASS: audio off by default, unsupported/denied APIs, opt-in start, hidden-tab suspension and cleanup. Audible output needs device QA.');
// Exercise the real vendored GLTFLoader without requiring a graphics context.
const doc={asset:{version:'2.0'},buffers:[{byteLength:36}],bufferViews:[{buffer:0,byteOffset:0,byteLength:36}],accessors:[{bufferView:0,componentType:5126,count:3,type:'VEC3',min:[0,0,0],max:[1,1,0]}],meshes:[{primitives:[{attributes:{POSITION:0}}]}],nodes:[{mesh:0}],scenes:[{nodes:[0]}],scene:0};
const jsonGLB=Buffer.from(glb(doc)),binary=Buffer.from(new Float32Array([0,0,0,1,0,0,0,1,0]).buffer),full=Buffer.alloc(jsonGLB.length+8+binary.length);jsonGLB.copy(full);full.writeUInt32LE(full.length,8);full.writeUInt32LE(binary.length,jsonGLB.length);full.writeUInt32LE(0x004e4942,jsonGLB.length+4);binary.copy(full,jsonGLB.length+8);
const {loadGLBLandmark}=await import('./dist/landmark-view.js');const savedFetch=globalThis.fetch;
try{globalThis.fetch=async url=>{assert.equal(url,'/assets/landmarks/books.glb');return new Response(full,{headers:{'content-length':String(full.length)}});};const actual=await loadGLBLandmark('books');assert.ok(actual.children[0].children[0].isMesh);globalThis.fetch=async()=>new Response('not found',{status:404});await assert.rejects(()=>loadGLBLandmark('books'),/404/);globalThis.fetch=async()=>new Response('corrupt');await assert.rejects(()=>loadGLBLandmark('books'),/GLB/);}finally{globalThis.fetch=savedFetch;}
console.log('PASS: real vendored GLTFLoader parses an embedded GLB; 404 and corrupt responses reject safely.');
