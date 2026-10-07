import * as THREE from './vendor/three.module.js';
import {GLTFLoader} from './vendor/GLTFLoader.js';
import {inspectGLB} from './landmarks.mjs?v=20261007-r10';
export function disposeModel(root){root?.traverse(o=>{o.geometry?.dispose();for(const m of o.material?(Array.isArray(o.material)?o.material:[o.material]):[]){for(const value of Object.values(m))if(value?.isTexture)value.dispose();m.dispose();}});}
export function normalizeLandmark(model){
 model.updateMatrixWorld(true);const bounds=new THREE.Box3().setFromObject(model),size=bounds.getSize(new THREE.Vector3()),center=bounds.getCenter(new THREE.Vector3());
 if(![...size.toArray(),...center.toArray()].every(Number.isFinite)||Math.max(size.x,size.z)<.001||size.y<.001)throw Error('Empty landmark bounds');
 let triangles=0,meshes=0;model.traverse(o=>{if(o.isMesh){meshes++;triangles+=(o.geometry.index?.count||o.geometry.attributes.position?.count||0)/3;o.castShadow=true;o.receiveShadow=true;for(const m of Array.isArray(o.material)?o.material:[o.material]){for(const value of Object.values(m))if(value?.isTexture&&Math.max(value.image?.width||0,value.image?.height||0)>1024)throw Error('Landmark textures must be 1024px or smaller');}}});
 if(meshes>40||triangles>20000)throw Error('Landmark exceeds mesh or triangle budget');
 const scale=Math.min(1.2/Math.max(size.x,size.z),2.5/size.y),wrapper=new THREE.Group();model.position.sub(new THREE.Vector3(center.x,bounds.min.y,center.z));wrapper.add(model);wrapper.scale.setScalar(scale);return wrapper;
}
export async function loadGLBLandmark(id){
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),7000);let parsed;
 try{const response=await fetch('/assets/landmarks/'+id+'.glb',{signal:controller.signal,credentials:'same-origin',redirect:'error'});if(!response.ok)throw Error('HTTP '+response.status);if(Number(response.headers.get('content-length'))>1400000)throw Error('Landmark too large');
 const reader=response.body?.getReader();let buffer;
 if(reader){const chunks=[];let total=0;while(true){const {done,value}=await reader.read();if(done)break;total+=value.length;if(total>1400000){await reader.cancel();throw Error('Landmark too large');}chunks.push(value);}const bytes=new Uint8Array(total);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}buffer=bytes.buffer;}else buffer=await response.arrayBuffer();
 inspectGLB(buffer);const manager=new THREE.LoadingManager();manager.setURLModifier(url=>{if(!url.startsWith('blob:'))throw Error('External landmark resources are disabled');return url;});
 parsed=await new GLTFLoader(manager).parseAsync(buffer,'');return normalizeLandmark(parsed.scene);
 }catch(error){disposeModel(parsed?.scene);throw error;}finally{clearTimeout(timer);}
}
export function makePlaceholder(id){
 const g=new THREE.Group(),palette={cream:0xe6d5b5,rose:0xd79887,green:0x87b78b,blue:0x91b8c0,gold:0xffd787};
 const mats={};const m=(geo,x,y,z,color)=>{mats[color]??=new THREE.MeshStandardMaterial({color:palette[color],roughness:.78});const o=new THREE.Mesh(geo,mats[color]);o.position.set(x,y,z);o.castShadow=o.receiveShadow=true;g.add(o);return o;};
 const box=(x,y,z,w,h,d,c)=>m(new THREE.BoxGeometry(w,h,d),x,y,z,c),cyl=(x,y,z,r,h,c,top=r)=>m(new THREE.CylinderGeometry(top,r,h,12),x,y,z,c);
 const light=(x,y,z)=>{const o=box(x,y,z,.13,.2,.04,'gold');o.material=new THREE.MeshStandardMaterial({color:palette.gold,emissive:palette.gold,emissiveIntensity:.5});};
 if(id==='books'){box(0,.9,0,.65,1.8,.65,'cream');box(0,1.82,0,.8,.1,.8,'green');for(const y of [.45,.9,1.35])for(const x of [-.19,.19])light(x,y,.335);for(const x of [-.24,.24])cyl(x,1.99,0,.15,.28,'green');}
 if(id==='music'){cyl(0,.1,0,.72,.2,'cream');for(let i=0;i<6;i++){const a=i*Math.PI/3,x=Math.sin(a)*.57,z=Math.cos(a)*.57;cyl(x,.57,z,.045,.85,'cream');light(x,1,z);}m(new THREE.SphereGeometry(.72,12,6,0,Math.PI*2,0,Math.PI/2),0,1,0,'rose');}
 if(id==='sport'){box(0,.1,0,1.3,.2,.82,'green');for(const x of [-.66,.66])for(let i=0;i<3;i++)box(x+Math.sign(x)*i*.08,.16+i*.11,0,.12,.12,1,'cream');for(const z of [-.49,.49])box(0,.22,z,1.1,.32,.13,'rose');box(0,.205,0,.015,.012,.75,'cream');}
 if(id==='stars'){cyl(0,.35,0,.65,.7,'cream');m(new THREE.SphereGeometry(.67,16,8,0,Math.PI*2,0,Math.PI/2),0,.7,0,'blue');box(0,1.02,.36,.12,.48,.47,'rose');light(0,.4,.66);}
 if(id==='sea'){cyl(0,.85,0,.28,1.7,'cream',.22);cyl(0,.8,0,.283,.24,'rose',.27);cyl(0,1.75,0,.32,.22,'blue');m(new THREE.ConeGeometry(.43,.32,12),0,2.02,0,'rose');light(0,1.78,.33);for(let i=0;i<8;i++){const a=i*Math.PI/4;cyl(Math.cos(a)*.55,.09,Math.sin(a)*.55,.14,.18,i%2?'green':'rose');}}
 return normalizeLandmark(g);
}
