/* Scroll scenes use native scrolling: one passive listener, one rAF per change. */
(() => {
  'use strict';
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const burst = document.querySelector('.burst-story');
  const flavor = document.querySelector('.flavor-story');
  const manifesto = document.querySelector('.manifesto');
  const stage = document.querySelector('.burst-stage');
  const bag = document.querySelector('.bag-body');
  const bagTop = document.querySelector('.bag-top');
  const burstWord = document.querySelector('.burst-word');
  const ring = document.querySelector('.shockwave');
  const intro = document.querySelector('.burst-intro');
  const outro = document.querySelector('.burst-outro');
  const phaseLabel = document.querySelector('.burst-phase');
  const counter = document.querySelector('.scroll-counter');
  const chipLayer = document.querySelector('.chip-particles');
  const flavors = [...document.querySelectorAll('.flavor-panel')];
  const flavorButtons = [...document.querySelectorAll('.flavor-nav button')];
  const words = [...document.querySelectorAll('.manifesto-line')];
  const palettes = ['#f3a9b9', '#c9d4a5', '#f6d880', '#c9b7e2', '#abd4e1'];
  const clamp = (v, a=0, b=1) => Math.min(b, Math.max(a,v));
  const segment = (p,a,b) => clamp((p-a)/(b-a));
  const ease = t => 1 - (1-t)**3;
  const chips = Array.from({length: matchMedia('(max-width: 760px)').matches ? 12 : 22}, (_,i) => {
    const el = document.createElement('img');
    el.src = 'assets/chip-piece.webp'; el.alt = ''; el.width=160; el.height=160;
    el.className = 'flying-chip'; el.decoding='async';
    chipLayer.append(el);
    const angle = (i * 137.508 - 90) * Math.PI / 180;
    const size = (42+((i*17)%78))*(innerWidth<760?.67:1);
    el.style.width=`${size}px`;
    return {el, angle, radius: .4 + ((i*7)%13)/15, turn: (i%2?-1:1)*(110+i*19)};
  });
  const boxes = new Map();
  let vh = innerHeight, vw = innerWidth, scheduled = false;
  let currentFlavor = -1;
  function measure() {
    vh=innerHeight; vw=innerWidth;
    [burst,flavor,manifesto].forEach(el => { const r=el.getBoundingClientRect(); boxes.set(el,{top:r.top+scrollY,height:el.offsetHeight}); });
    schedule();
  }
  function progress(el) { const b=boxes.get(el);return clamp((scrollY-b.top)/Math.max(1,b.height-vh)); }
  function activeScene(el) { const b=boxes.get(el);return scrollY+vh>=b.top && scrollY<=b.top+b.height; }
  function selectFlavor(index) {
    if(index===currentFlavor)return;
    currentFlavor=index;
    flavors.forEach((panel,i)=>{panel.classList.toggle('is-active',i===index);panel.setAttribute('aria-hidden',String(i!==index));});
    flavorButtons.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
    flavor.querySelector('.flavor-stage').style.backgroundColor=palettes[index];
    document.querySelector('.flavor-number').textContent=String(index+2).padStart(2,'0');
  }
  function render() {
    scheduled=false;
    if(reduced.matches)return;
    if(activeScene(burst)) {
      const p=progress(burst), inflate=segment(p,.04,.43), explode=segment(p,.43,.83), exit=segment(p,.88,1);
      const shake=Math.sin(inflate*70)*segment(p,.3,.43)*(1-segment(p,.43,.48));
      const scale=.78+inflate*.52;
      bag.style.transform=`translate(-50%,-50%) translate(${shake*5}px,${explode*110}px) rotate(${-8+inflate*8+explode*24}deg) scale(${scale*(1-explode*.3)}) scaleX(${1+inflate*.15})`;
      bag.style.opacity=1-segment(p,.7,.86);
      bagTop.style.transform=`translate(-50%,-50%) translate(${shake*5+explode*90}px,${-ease(explode)*vh*.5}px) rotate(${-8+inflate*8-explode*65}deg) scale(${scale}) scaleX(${1+inflate*.15})`;
      bagTop.style.opacity=1-segment(p,.63,.83);
      chipLayer.style.opacity=segment(p,.43,.48)*(1-exit);
      chips.forEach(({el,angle,radius,turn},i)=>{
        const e=ease(clamp(explode*1.16-(i%4)*.025));
        const x=Math.cos(angle)*Math.min(vw*.65,750)*radius*e;
        const y=-vh*.13+Math.sin(angle)*vh*.68*radius*e+explode**2*vh*.2;
        el.style.transform=`translate(-50%,-50%) translate(${x}px,${y}px) rotate(${turn*explode}deg) scale(${.2+e*1.1})`;
      });
      intro.style.opacity=1-segment(p,.25,.43);
      intro.style.transform=`translateY(${-segment(p,.2,.43)*40}px)`;
      burstWord.style.opacity=segment(p,.45,.52)*(1-segment(p,.8,.95));
      burstWord.style.transform=`translate(-50%,-50%) rotate(-9deg) scale(${.6+ease(segment(p,.43,.63))*.65})`;
      ring.style.transform=`translate(-50%,-50%) scale(${.1+explode*4})`;
      ring.style.opacity=segment(p,.43,.47)*(1-segment(p,.48,.65));
      outro.style.opacity=segment(p,.8,.93);
      phaseLabel.textContent=p<.27?'01 / 把快乐，慢慢装满':p<.43?'02 / 嘘，好吃要藏不住了':p<.8?'03 / 咔嚓！快乐大爆发':'04 / 还有更多好吃的，往下逛';
      counter.style.width=`${p*100}%`;
      stage.style.setProperty('--burst-glow',String(inflate));
    }
    if(activeScene(flavor)){
      const p=progress(flavor), scaled=Math.min(4.999,p*5), index=Math.floor(scaled), local=scaled-index;
      selectFlavor(index);
      const photo=flavors[index].querySelector('.flavor-photo');
      const transforms = [
        `translateY(${(local-.5)*-100}px) rotate(${(local-.5)*14}deg) scale(${.95+local*.12})`,
        `rotate(${(local-.5)*24}deg) scale(${1+Math.sin(local*Math.PI)*.08})`,
        `translateX(${(local-.5)*-70}px) rotate(${(local-.5)*-9}deg) scale(${1+local*.08})`,
        `translateX(${(local-.5)*85}px) rotate(${(local-.5)*12}deg) scale(${1+local*.1})`,
        `translateY(${(local-.5)*-30}px) rotate(-4deg) scale(${.93+local*.23})`
      ];
      photo.style.transform=transforms[index];
      document.querySelector('.flavor-track-fill').style.width=`${p*100}%`;
    }
    if(activeScene(manifesto)){
      const p=progress(manifesto);
      words.forEach((line,i)=>line.classList.toggle('lit',p>i*.23));
      manifesto.style.setProperty('--mood-shift',`${(p-.5)*90}px`);
      manifesto.style.setProperty('--mood-turn',`${(p-.5)*24}deg`);
    }
  }
  function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(render);}}
  flavorButtons.forEach((button,i)=>button.addEventListener('click',()=>{
    if(reduced.matches){selectFlavor(i);return;}
    const b=boxes.get(flavor);
    window.scrollTo({top:b.top+((i+.2)/5)*(b.height-vh),behavior:'smooth'});
    }));
  function motionMode(){
    root.classList.toggle('motion-enabled',!reduced.matches);
    if(reduced.matches){
      [bag,bagTop,burstWord,ring,intro,outro,chipLayer].forEach(el=>{el.style.removeProperty('opacity');el.style.removeProperty('transform');});
      flavors.forEach(panel=>panel.querySelector('.flavor-photo').style.removeProperty('transform'));
      selectFlavor(0);flavors.forEach(panel=>panel.setAttribute('aria-hidden','false'));words.forEach(line=>line.classList.add('lit'));
    }
    requestAnimationFrame(measure);
  }
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',measure,{passive:true});
  addEventListener('load',measure,{once:true});
  reduced.addEventListener('change',motionMode);
  document.querySelectorAll('.type-art').forEach(image=>image.addEventListener('error',()=>image.closest('.art-title').classList.add('art-failed')));
  selectFlavor(0);
  motionMode();
})();
