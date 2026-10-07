import * as audio from '../dist/soundscape.mjs';
import * as landmarks from '../dist/landmarks.mjs';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {parseHTML} from 'linkedom';
import * as game from '../dist/game.mjs';
import * as letters from '../dist/letters.mjs';
import * as gifts from '../dist/gifts.mjs';
const engine={...audio,...landmarks,...game,...letters,...gifts};
const {document,window}=parseHTML(fs.readFileSync('./dist/index.html','utf8'));
const dialog=document.getElementById('modal');dialog.showModal=()=>dialog.open=true;dialog.close=()=>dialog.open=false;
const tools=new Map();document.modelContext={registerTool:t=>tools.set(t.name,t)};
const zoomCalls=[];
const view={zoomBy:f=>zoomCalls.push(f),setNight:()=>{},setLandmark:()=>{},focusLandmark:()=>{},rebuild:()=>{},rotate:()=>{},toggleNight:()=>true,toggleCinema:()=>true,resetCamera:()=>{}};
const source=fs.readFileSync('./dist/app.js','utf8').replace(/^import .*;\n/gm,'');
const init=new Function('document','window','navigator','matchMedia','createCityView',...Object.keys(engine),source+'\nreturn {getState};');
let copied='';const app=init(document,window,{clipboard:{writeText:async t=>{copied=t}}},()=>({matches:true}),()=>view,...Object.values(engine));
const id=x=>document.getElementById(x);const click=x=>{assert.ok(!x.disabled);x.onclick()};
id('creator').value='Dhilip';id('dedication').value='<Alex & family>';id('dedication-form').onsubmit({preventDefault(){}});document.querySelector('.landmark-options button').onclick();assert.match(id('landmark-summary').textContent,/Library Tower/);assert.match(id('dedication-status').textContent,/<Alex & family>/);assert.equal(id('budget').textContent,'120 credits');assert.equal(document.querySelectorAll('[data-project]').length,4);
function build(d,p){click(document.querySelector(`[data-district="${d}"]`));click(document.querySelector(`[data-project="${p}"]`));}
click(id('zoom-in'));click(id('zoom-out'));assert.deepEqual(zoomCalls,[.85,1/.85]);
build(0,'forest');assert.match(id('voice-quote').textContent,/birds/);assert.ok(document.querySelector('[data-project="solar"]').disabled);
build(1,'solar');build(2,'wetland');click(id('advance'));build(3,'homes');click(id('advance'));click(id('advance'));assert.ok(dialog.open);assert.match(id('modal-content').textContent,/coast holds/);click(id('continue-event'));build(4,'solar');click(id('advance'));build(5,'forest');while(app.getState().year<2058){if(dialog.open)dialog.close();click(id('advance'));}
assert.equal(app.getState().legacy,83);assert.match(id('modal-content').textContent,/Dear <Alex & family>/);assert.equal(id('modal-content').querySelector('alex'),null);assert.match(id('modal-content').textContent,/rooftops collect/);assert.ok(id('save-postcard'));await id('share-gift').onclick();assert.match(copied,/^I built a city for you. Open your gift from 2058: https:/);const giftURL=copied.slice(copied.indexOf('https://'));const recipient=gifts.decodeGift(new URL(giftURL).hash);assert.equal(recipient.from,'Dhilip');assert.equal(recipient.to,'<Alex & family>');assert.equal(game.score(recipient.state),83);await id('copy-city-link').onclick();assert.equal(copied,giftURL);assert.ok(id('advance').disabled);
assert.equal(tools.size,3);assert.equal(tools.get('read_future_city').execute().year,2058);assert.throws(()=>tools.get('restore_future_city_district').execute({district:'bad',project:'forest'}));
click(id('again'));assert.equal(app.getState().year,2050);assert.equal(id('budget').textContent,'120 credits');
console.log('PASS: parsed-DOM initialization, project controls, resident stories, event dialogs, complete winning journey, exports present, restart and tool-handler guards. Renderer and real browser APIs are not exercised.');
