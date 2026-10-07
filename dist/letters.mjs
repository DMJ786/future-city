import {landmarkFor} from './landmarks.mjs?v=20261007-r10';
export function cleanName(value){return String(value??'').replace(/[\u0000-\u001f\u007f]/g,'').trim().slice(0,40)}
export function letterFor(state,name='',landmark=null){
 const to=cleanName(name)||'the people who come after us';
 const [nature,energy,wellbeing,resilience]=state.stats;
 const restored=state.plots.filter(Boolean).length;
 const opening=restored===6?'When we found this island, its streets were quiet and its windows were dark. We wanted you to inherit something different.':restored?'We could not repair everything. But we began, because imagining your life here made the work matter.':'We imagined a different future for you. This time, we left too much of that future unbuilt.';
 const natureLine=nature>=55?'There are trees on your walk home now. We hope you stop sometimes, just to listen to the birds.':'There should have been more shade on your walk home. We wish we had made room for it.';
 const energyLine=energy>=65?'The rooftops collect the sunlight. On the nights you stay up reading, a little of that day will still be with you.':'Your lights still depend on a system we have not finished changing. That work is part of what we leave behind.';
 const communityLine=wellbeing>=60?'We built places where people can find each other. A home is more than a roof; it is knowing someone will notice when you are missing.':'Some neighbours are still waiting for a place to belong. We hope this city learns to take better care of them.';
 const coastLine=resilience>=55?'When the sea rose, the coast held. The space we gave to nature became a little more safety for you.':'When the sea rose, we learnt how much protection we had left too late.';
 const closing=restored===6&&state.stats.every(n=>n>=50)?'This city is our gift to you. Make it yours. Leave it kinder.':'This is an unfinished gift. We hope you carry it further than we did.';
 return {to,opening,paragraphs:[opening,natureLine,energyLine,communityLine,coastLine,...(landmarkFor(landmark)?[landmarkFor(landmark).line]:[]),closing],quote:nature>=55?'There are trees on your walk home now.':wellbeing>=60?'A home is knowing someone will notice when you are missing.':'We began because imagining your life here made the work matter.',closing};
}
export function escapeHTML(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
