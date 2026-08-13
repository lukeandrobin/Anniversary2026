const photos = [
  {src:"photos/photo1.jpg", caption:"Exhibit A: Somehow this became our life."},
  {src:"photos/photo2.jpg", caption:"Evidence that we occasionally leave the house."},
  {src:"photos/photo3.jpg", caption:"Scientifically proven: we look cute here."},
  {src:"photos/photo4.jpg", caption:"A completely normal amount of happiness."},
  {src:"photos/photo5.jpg", caption:"Another important historical document."},
  {src:"photos/photo6.jpg", caption:"Year One: 10/10 would do again."}
];

const gallery = document.querySelector("#gallery");
photos.forEach((p,i)=>{
  const card=document.createElement("article");
  card.className="photo-card";
  card.style.setProperty("--rot", `${(i%3-1)*2}deg`);
  card.innerHTML=`<img src="${p.src}" alt="${p.caption}" loading="lazy"><div class="caption">${p.caption}</div>`;
  card.addEventListener("click",()=>inflate(card));
  gallery.appendChild(card);
});

function inflate(card){
  if(card.classList.contains("inflating")) return;
  card.classList.add("inflating");
  burst(card);
  setTimeout(()=>card.classList.remove("inflating"),800);
}

function burst(el){
  const r=el.getBoundingClientRect();
  const emojis=["💖","💕","✨","🎈","🥰","💍","🎉","💘"];
  for(let i=0;i<16;i++){
    const s=document.createElement("span");
    s.className="float";
    s.textContent=emojis[Math.floor(Math.random()*emojis.length)];
    s.style.left=(r.left+r.width/2+(Math.random()-.5)*r.width)+"px";
    s.style.top=(r.top+r.height/2)+"px";
    s.style.animationDelay=(Math.random()*.2)+"s";
    document.body.appendChild(s);
    setTimeout(()=>s.remove(),2200);
  }
}

const cursor=document.querySelector("#cursor-emoji");
let lastTrail=0;
document.addEventListener("mousemove",e=>{
  cursor.style.left=e.clientX+"px"; cursor.style.top=e.clientY+"px";
  if(Date.now()-lastTrail>55){
    lastTrail=Date.now();
    const p=document.createElement("span");
    p.className="trail-particle";
    p.textContent=["💖","✨","💕","🌈","⭐","💋"][Math.floor(Math.random()*6)];
    p.style.left=e.clientX+"px"; p.style.top=e.clientY+"px";
    document.body.appendChild(p);
    setTimeout(()=>p.remove(),800);
  }
});

document.addEventListener("click",e=>{
  if(e.target.closest("button")) return;
  const emojis=["💗","💖","💕","✨","🥰"];
  const p=document.createElement("span");
  p.className="float"; p.textContent=emojis[Math.floor(Math.random()*emojis.length)];
  p.style.left=e.clientX+"px"; p.style.top=e.clientY+"px";
  document.body.appendChild(p); setTimeout(()=>p.remove(),2000);
});

function confetti(){
  for(let i=0;i<45;i++){
    const p=document.createElement("span");
    p.className="float"; p.textContent=["🎉","💖","🎈","✨"][Math.floor(Math.random()*4)];
    p.style.left=Math.random()*100+"vw"; p.style.top=(Math.random()*50+25)+"vh";
    document.body.appendChild(p); setTimeout(()=>p.remove(),2000);
  }
}
document.querySelector("#loveButton").onclick=()=>{confetti(); document.querySelector(".subtitle").textContent="WARNING: excessive wife appreciation detected.";};
document.querySelector("#diagnostic").onclick=()=>{
  const result=document.querySelector("#diagnosticResult");
  result.textContent="DIAGNOSTIC COMPLETE: 100% compatible. Recommended treatment: more dates, snacks, and kissing. 💋";
  confetti();
};
document.querySelector("#wifeButton").onclick=()=>{
  document.querySelector("#finalMessage").textContent="🎉 YEAR TWO UNLOCKED! 🎉";
  confetti();
};
