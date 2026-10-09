document.addEventListener("DOMContentLoaded",()=>{

const loader=document.getElementById("loader");
setTimeout(()=>loader.classList.add("hide"),900);

const menuBtn=document.getElementById("menuBtn"),navLinks=document.getElementById("navLinks");
menuBtn.addEventListener("click",()=>navLinks.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>navLinks.classList.remove("open")));

const observer=new IntersectionObserver(entries=>{
 entries.forEach(entry=>{
   if(entry.isIntersecting){
     entry.target.classList.add("visible");
     observer.unobserve(entry.target);
   }
 });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach((el,i)=>{
 el.style.transitionDelay=Math.min(i%5*.08,.32)+"s";
 observer.observe(el);
});

document.querySelectorAll(".slider").forEach(slider=>{
 const images=JSON.parse(slider.dataset.images),img=slider.querySelector("img"),dots=slider.querySelector(".dots");
 let index=0,timer;

 images.forEach((_,i)=>{
   const dot=document.createElement("span");
   dot.className="dot"+(i===0?" active":"");
   dot.addEventListener("click",e=>{e.stopPropagation();index=i;show();restart()});
   dots.appendChild(dot);
 });

 function show(){
   img.style.opacity="0";
   img.style.transform="scale(1.13)";
   setTimeout(()=>{
     img.src=images[index];
     img.onload=()=>{img.style.opacity="1";img.style.transform="scale(1)"};
   },150);
   dots.querySelectorAll(".dot").forEach((d,i)=>d.classList.toggle("active",i===index));
 }
 function next(){index=(index+1)%images.length;show()}
 function prev(){index=(index-1+images.length)%images.length;show()}
 function restart(){clearInterval(timer);timer=setInterval(next,3000)}
 slider.querySelector(".next").addEventListener("click",e=>{e.stopPropagation();next();restart()});
 slider.querySelector(".prev").addEventListener("click",e=>{e.stopPropagation();prev();restart()});
 slider.addEventListener("mouseenter",()=>clearInterval(timer));
 slider.addEventListener("mouseleave",restart);
 restart();
});

document.querySelectorAll(".project-card").forEach(card=>{
 card.addEventListener("mousemove",e=>{
   if(window.innerWidth<800)return;
   const r=card.getBoundingClientRect();
   const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
   card.style.transform=`perspective(900px) rotateX(${y*-5}deg) rotateY(${x*6}deg) translateY(-8px)`;
 });
 card.addEventListener("mouseleave",()=>card.style.transform="");
});

const topBtn=document.getElementById("topBtn");
window.addEventListener("scroll",()=>topBtn.classList.toggle("show",window.scrollY>600));
topBtn.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));

});
