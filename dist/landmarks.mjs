export const LANDMARKS=Object.freeze([
 {id:'books',love:'Books',name:'Library Tower',line:'The library tower stays lit until ten. We saved you a window seat.',prompt:'a slender library tower with arched windows and a rooftop garden'},
 {id:'music',love:'Music',name:'Bandstand',line:'On Friday evenings, the bandstand fills with music. There is always room for your song.',prompt:'a round open-air bandstand with a domed roof and string lights'},
 {id:'sport',love:'Sport',name:'Little Stadium',line:'At the little stadium, the whole neighbourhood cheers. We kept a place for you on the team.',prompt:'a tiny community football stadium with curved stands'},
 {id:'stars',love:'The stars',name:'Observatory',line:'The observatory opens after sunset. We left the telescope pointed at a sky full of possibilities.',prompt:'a small domed observatory with a telescope slit on a hill'},
 {id:'sea',love:'The sea',name:'Lighthouse Garden',line:'The lighthouse garden watches over the harbour. Its light will help you find your way home.',prompt:'a striped lighthouse surrounded by a small flower garden'}
]);
export const landmarkFor=id=>LANDMARKS.find(l=>l.id===id)||null;
export function validLandmark(id){return id===null||typeof id==='string'&&!!landmarkFor(id);}
export async function loadWithFallback(id,{load,placeholder,warn=console.warn}){
 if(!landmarkFor(id))return {model:null,source:'none'};
 try{const model=await load(id);if(!model)throw Error('Empty landmark');return {model,source:'glb'};}
 catch(error){warn('Landmark '+id+' unavailable; using procedural fallback.',error);return {model:placeholder(id),source:'procedural'};}
}
// Only embedded, uncompressed GLBs are accepted: no remote textures or decoders.
export function inspectGLB(buffer){
 if(!(buffer instanceof ArrayBuffer)||buffer.byteLength<20||buffer.byteLength>1400000)throw Error('Landmark must be a GLB under 1.4 MB');
 const v=new DataView(buffer);if(v.getUint32(0,true)!==0x46546c67||v.getUint32(4,true)!==2||v.getUint32(8,true)!==buffer.byteLength||v.getUint32(16,true)!==0x4e4f534a)throw Error('Invalid GLB');
 const size=v.getUint32(12,true);if(size>buffer.byteLength-20)throw Error('Invalid GLB JSON');
 const json=JSON.parse(new TextDecoder().decode(new Uint8Array(buffer,20,size)));
 for(const obj of [...(json.buffers||[]),...(json.images||[])])if(obj.uri)throw Error('Embed all buffers and images in the GLB');
 if((json.extensionsRequired||[]).some(x=>!['KHR_materials_unlit'].includes(x)))throw Error('Export without required decoder extensions');
 if((json.nodes||[]).length>100||(json.meshes||[]).reduce((n,m)=>n+(m.primitives?.length||0),0)>40)throw Error('Landmark exceeds object budget');
 return json;
}
