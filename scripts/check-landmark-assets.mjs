import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {LANDMARKS,inspectGLB} from '../dist/landmarks.mjs';
let total=0,missing=0;
for(const item of LANDMARKS){const path=new URL('../dist/assets/landmarks/'+item.id+'.glb',import.meta.url);try{const bytes=await fs.readFile(path);inspectGLB(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength));total+=bytes.length;console.log(item.id,bytes.length,'bytes','sha256='+createHash('sha256').update(bytes).digest('hex'));}catch(e){if(e.code==='ENOENT'){missing++;console.log(item.id+': not shipped; procedural fallback used');}else throw e;}}
console.log('GLB total:',total,'bytes;',missing,'procedural fallbacks. Validate provenance separately.');
if(total>7000000)throw Error('Landmarks exceed 7 MB allowance');
