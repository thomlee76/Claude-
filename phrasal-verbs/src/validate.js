// usage: node validate.js lessons_21.js  -> checks structure of every lesson in the file
const fs=require('fs');global.window=globalThis;window.LESSONS={};
eval(fs.readFileSync(process.argv[2],'utf8'));
const L=window.LESSONS,errs=[];
for(const [d,x] of Object.entries(L)){
  const e=m=>errs.push(`DAY ${d}: ${m}`);
  ['verb','part','ru','key','scene','kw','dialog','note','talks','quiz'].forEach(k=>{if(!(k in x))e('missing '+k)});
  if(x.img!==null&&!process.env.ALLOWIMG)e("img must be null");
  if(!/\{[^|}]+\|[^}]+\}/.test(x.key[0]))e('key sentence must contain {verb|particle}');
  if(x.kw.length!==3)e('kw must have 3 items');
  if(x.dialog.length<6||x.dialog.length>7)e('dialog must have 6-7 lines');
  const hlc=x.dialog.filter(l=>/\{/.test(l[1])).length; if(hlc<1)e('dialog needs a highlighted line');
  if(x.talks.length!==3)e('need 3 talks');
  const tags=x.talks.map(t=>t[0]).join(',');if(tags!=='Быт,Поездка,Работа')e('talk tags must be Быт,Поездка,Работа, got '+tags);
  x.talks.forEach((t,i)=>{if(t[1].length<3||t[1].length>4)e(`talk ${i} must have 3-4 lines`);if(!t[1].some(l=>/\{/.test(l[1])))e(`talk ${i} has no highlighted line`)});
  [...x.dialog,...x.talks.flatMap(t=>t[1])].forEach(l=>{if(l.length!==3)e('line must be [who,en,ru]: '+JSON.stringify(l));if(/[а-яё]/i.test(l[1]))e('cyrillic in English line: '+l[1]);if(!/[а-яё]/i.test(l[2]))e('translation not Russian: '+l[2]);
    const m=l[1].match(/\{[^}]*\}/g)||[];m.forEach(h=>{if(!/^\{[^|{}]+\|[^|{}]+\}$/.test(h))e('bad highlight '+h)})});
  if(x.quiz.length!==5)e('quiz must have 5 questions');
  x.quiz.forEach((q,i)=>{if(q.length!==4)e(`q${i+1} must be [type,prompt,opts,expl]`);if(!Array.isArray(q[2])||q[2].length!==4)e(`q${i+1} needs 4 options`);else if(new Set(q[2]).size!==4)e(`q${i+1} duplicate options`)});
  if(!/^Повтор · DAY \d\d$/.test(x.quiz[4][0]))e('q5 type must be "Повтор · DAY NN" (previous lesson)');
  else if(+x.quiz[4][0].slice(-2)!==((+d)-1)%100 && !(+d===100&&x.quiz[4][0].endsWith('99')))e('q5 must review previous DAY '+(d-1));
}
console.log(Object.keys(L).length+' lessons; '+(errs.length?errs.length+' errors:\n'+errs.join('\n'):'OK'));
process.exit(errs.length?1:0);
