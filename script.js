(function(){
var SRC="photos/puzzle.jpg";
var fb="data:image/svg+xml,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><defs><pattern id="g" width="60" height="60" patternUnits="userSpaceOnUse"><rect width="60" height="60" fill="#fff"/><rect width="30" height="60" fill="#2f7df6" opacity=".25"/><rect width="60" height="30" fill="#2f7df6" opacity=".25"/></pattern></defs><rect width="300" height="300" fill="url(#g)"/><g transform="translate(30 20) scale(2.4)"><path fill="#ff4f8b" d="M50 88C20 62 2 44 2 26 2 12 13 2 27 2c10 0 19 6 23 14C54 8 63 2 73 2c14 0 25 10 25 24 0 18-18 36-48 62z"/></g><g font-family="Georgia,serif" font-weight="700" fill="#fff" text-anchor="middle"><text x="150" y="112" font-size="40">Pax</text><text x="150" y="146" font-size="26" font-style="italic">&amp;</text><text x="150" y="188" font-size="40">Bea</text></g></svg>');
var stage=document.getElementById("stage"),msg=document.getElementById("pmsg"),skip=document.getElementById("skip"),letter=document.getElementById("letter");
var placed=0,z=10;
function show(){letter.classList.remove("locked");letter.classList.add("reveal");skip.hidden=true;letter.scrollIntoView({behavior:"smooth",block:"start"})}
skip.onclick=function(){msg.textContent="no pressure, here it is 💙";show()};
function prep(src,cb){var im=new Image();im.onload=function(){try{var c=document.createElement("canvas"),m=Math.min(im.width,im.height);c.width=c.height=800;c.getContext("2d").drawImage(im,(im.width-m)/2,(im.height-m)/2,m,m,0,0,800,800);cb(c.toDataURL("image/jpeg",.9))}catch(e){cb(src)}};im.onerror=function(){if(src!==fb)prep(fb,cb)};im.src=src}
function build(url){
  var W=stage.clientWidth,s=Math.min(118,Math.floor(W/3.5)),p=Math.round(s*.3),B=s*3,ox=Math.round((W-B)/2),oy=p,bs=s+2*p;
  stage.style.height=(B+2*p+s*2.2)+"px";
  var g=document.createElement("div");g.className="ghost";
  g.style.cssText="left:"+ox+"px;top:"+oy+"px;width:"+B+"px;height:"+B+"px;background:linear-gradient(rgba(255,255,255,.8),rgba(255,255,255,.8)),url("+url+") 0 0/100% 100%";
  stage.appendChild(g);
  function wash(){var a=.8*(9-placed)/9;g.style.background="linear-gradient(rgba(255,255,255,"+a+"),rgba(255,255,255,"+a+")),url("+url+") 0 0/100% 100%"}
  var H=[],V=[],r,c,i;
  for(r=0;r<3;r++){H[r]=[];V[r]=[];for(c=0;c<3;c++){H[r][c]=Math.random()<.5?1:-1;V[r][c]=Math.random()<.5?1:-1}}
  function dir(r,c,k){return k==0?(r?-V[r-1][c]:0):k==1?(c<2?H[r][c]:0):k==2?(r<2?V[r][c]:0):(c?-H[r][c-1]:0)}
  var S=[[0,0],[s,0],[s,s],[0,s]],U=[[1,0],[0,1],[-1,0],[0,-1]],N=[[0,-1],[1,0],[0,1],[-1,0]];
  function path(r,c){
    var o="",k;
    for(k=0;k<4;k++){
      var d=dir(r,c,k);
      var q=function(a,b){return (p+S[k][0]+U[k][0]*a*s+N[k][0]*b*s*d).toFixed(2)+" "+(p+S[k][1]+U[k][1]*a*s+N[k][1]*b*s*d).toFixed(2)};
      if(!k)o+="M"+q(0,0);
      o+=d?"L"+q(.38,0)+"C"+q(.38,.1)+","+q(.3,.12)+","+q(.3,.24)+"C"+q(.3,.38)+","+q(.7,.38)+","+q(.7,.24)+"C"+q(.7,.12)+","+q(.62,.1)+","+q(.62,0)+"L"+q(1,0):"L"+q(1,0);
    }
    return o+"Z";
  }
  for(r=0;r<3;r++)for(c=0;c<3;c++)(function(r,c){
    var el=document.createElement("div"),pi=document.createElement("div");
    el.className="pc";pi.className="pi";
    pi.style.clipPath="path('"+path(r,c)+"')";
    pi.style.background="url("+url+") "+(p-c*s)+"px "+(p-r*s)+"px/"+B+"px "+B+"px";
    el.appendChild(pi);
    var tx=ox+c*s-p,ty=oy+r*s-p;
    el.style.cssText="width:"+bs+"px;height:"+bs+"px;left:"+Math.random()*(W-bs)+"px;top:"+(oy+B+Math.random()*(s*2.2-p))+"px";
    var dx=0,dy=0;
    el.onpointerdown=function(e){el.setPointerCapture(e.pointerId);dx=e.clientX-el.offsetLeft;dy=e.clientY-el.offsetTop;el.style.zIndex=++z;el.classList.add("up");e.preventDefault()};
    el.onpointermove=function(e){if(el.hasPointerCapture(e.pointerId)){el.style.left=(e.clientX-dx)+"px";el.style.top=(e.clientY-dy)+"px"}};
    el.onpointerup=function(){
      el.classList.remove("up");
      if(Math.hypot(el.offsetLeft-tx,el.offsetTop-ty)<s*.35){
        el.classList.add("lock");el.style.left=tx+"px";el.style.top=ty+"px";el.style.zIndex=1;placed++;wash();
        msg.textContent=placed+" of 9 in place";
        if(placed==9){msg.textContent="you did it! 💗 your letter is coming up";skip.hidden=true;g.style.border="0";setTimeout(show,1300)}
      }
    };
    stage.appendChild(el);
  })(r,c);
}
prep(SRC,build);
})();
