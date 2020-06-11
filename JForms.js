



function JForms(){

  // Create new canvas to draw
  var newCanvas = document.createElement('canvas');
  newCanvas.id = 'newCanvas';
  newCanvas.width  = window.innerWidth;
  newCanvas.height = window.innerHeight;

  // append new canvas to document
  document.body.appendChild(newCanvas);

  // get canvas
  this.canvas = document.getElementById('newCanvas');
  this.ctx = this.canvas.getContext('2d');

  // css style
  this.canvas.style.zIndex = 500;
  this.canvas.style.position = 'absolute';
  this.canvas.style.border   = '0px solid';
  this.canvas.style.display  = 'block'; // none, block

  // paint background
  this.ctx.fillStyle = 'rgba(0, 0, 0, 0.75)'
  this.ctx.fillRect(0, 0, newCanvas.width, newCanvas.height);

  var win = new RoundedWin(400, 100, 15);
  // win.setSize()
  win.setPosition(window.innerWidth * 0.5, window.innerHeight * 0.3, 0);
  win.paint(this.ctx);

  // hidden scroll
  document.getElementsByTagName('body')[0].style.overflow = 'hidden';

  // div container tex
  var elem = document.createElement('div');
  let w = 380;
  let h = 80;
  let x = (window.innerWidth * 0.5) - (w * 0.5);
  let y = window.innerHeight * 0.3 - (h * 0.5);
  elem.style.cssText = 'position:fixed;left:'+ x +'px;top:'+ y + 'px;width:'+ w +'px;height:'+ h + 'px;opacity:1;z-index:600;background:rgba(50, 50, 50,0)';
  document.body.appendChild(elem);

  // text info
  var h1 = document.createElement('h1');
  var txt = document.createTextNode('Set name to this attribute');
  h1.appendChild(txt);
  elem.appendChild(h1);
  h1.style.cssText = 'font-family:sans-serif;font-size:14px;font-weight:normal;height:20px;color:rgba(230, 230, 230, 1)';

  // create input getContext
  var inputText = document.createElement('input');
  inputText.setAttribute('type', 'text');
  inputText.setAttribute('onfocus', 'txt_onfocus(this)');
  w = w - 8;
  inputText.style.cssText = 'height:20px;width:' + w +'px;background-color:rgba(10,10,10,1);color:white;border:2px solid #8842d5;border-radius:2px';
  elem.appendChild(inputText);


  // document.getElementById("editor").classList.add('hidden-scrollbar');
  // document.getElementById("editor").classList.remove('hidden-scrollbar');

  makeActive = function(elem){
    elem.classList.toggle("is-active");
  }
  inputText.addEventListener("click", function(){
        makeActive(accordionCurrent);
  });

}




function txt_onfocus(txt){
  // txt.style.backgroundColor='yellow';
  // txt.style.border= '2px solid green';
  // txt.style.cssText = 'border-bottom: 1px solid #000; box-shadow: 0 1px 0 0 #000';
//   #editor::selection {
//     background: var(--selection-background);
// }

//JavaScript Part
txt.style.setProperty("background-color", "#A4CDFF");
txt.style.setProperty("border-bottom", "1px solid #000");
txt.style.setProperty("box-shadow", "0 1px 0 0 #000");

}



//  - - - - - - - - -  ROUNDEDWIN OBJECT  - - - - - - - - - - -

function TranslateXYWIN(x, y, xo, yo){
  let newx = x + xo;
  let newy = y + yo;
  return {x: newx, y: newy};
}

function RotateXYWIN(x, y, teta){
  let xp =   x * Math.cos(teta) + y * Math.sin(teta);
  let yp = - x * Math.sin(teta) + y * Math.cos(teta);
  return {x: xp, y: yp};
}

function RoundedWin(w, h, round){
  this.w = w;
  this.h = h;
  this.teta = 0;
  this.p1 = {x: 0, y:0};
  this.mp = {x: 0, y:0};
  this.round = round;

  // this.style = new StyleRGBA();

  this.setPosition  = SetRoundedWinPosition(this);
  this.setSize      = SetRoundedWinSize(this);
  this.paint        = DrawRoundedWin(this);

}

function SetRoundedWinSize(roundWin){
  return (w, h, round) =>{
    roundWin.w = w;
    roundWin.h = h;
    roundWin.mp = {x: 0, y:0};
    roundWin.round = round;
    roundWin.setPosition(roundWin.p1.x , roundWin.p1.y, roundWin.teta);

  }
}

function SetRoundedWinPosition(roundWin) {
  return (x, y, teta) => {

    x = x - roundWin.w/2;
    y = y - roundWin.h/2;

    this.teta      = teta;
    roundWin.p1   = {x: 0  , y: 0};
    roundWin.p4   = {x: roundWin.w  , y: 0};
    roundWin.p7   = {x: roundWin.w  , y: roundWin.h};
    roundWin.p10  = {x: 0  , y: roundWin.h};
    roundWin.mp   = {x: roundWin.w/2  , y: roundWin.h/2};

    let dz = 0;
    if( roundWin.w > roundWin.h) dz = (roundWin.h/2) * (roundWin.round/100);
    else dz = (roundWin.w/2) * (roundWin.round/100);

    roundWin.p2   = {x: dz      , y: 0      };
    roundWin.p3   = {x: roundWin.w - dz  , y: 0      };
    roundWin.p5   = {x: roundWin.w       , y: dz     };
    roundWin.p6   = {x: roundWin.w       , y: roundWin.h - dz };
    roundWin.p8   = {x: roundWin.w - dz  , y: roundWin.h      };
    roundWin.p9   = {x:  dz     , y: roundWin.h      };
    roundWin.p11  = {x: 0       , y: roundWin.h - dz };
    roundWin.p12  = {x: 0       , y: dz     };

    if(teta!=0){
      roundWin.p2 = RotateXYWIN(roundWin.p2.x, roundWin.p2.y, teta);
      roundWin.p3 = RotateXYWIN(roundWin.p3.x, roundWin.p3.y, teta);
      roundWin.p4 = RotateXYWIN(roundWin.p4.x, roundWin.p4.y, teta);
      roundWin.p5 = RotateXYWIN(roundWin.p5.x, roundWin.p5.y, teta);
      roundWin.p6 = RotateXYWIN(roundWin.p6.x, roundWin.p6.y, teta);
      roundWin.p7 = RotateXYWIN(roundWin.p7.x, roundWin.p7.y, teta);
      roundWin.p8 = RotateXYWIN(roundWin.p8.x, roundWin.p8.y, teta);
      roundWin.p9 = RotateXYWIN(roundWin.p9.x, roundWin.p9.y, teta);
      roundWin.p10 = RotateXYWIN(roundWin.p10.x, roundWin.p10.y, teta);
      roundWin.p11 = RotateXYWIN(roundWin.p11.x, roundWin.p11.y, teta);
      roundWin.p12 = RotateXYWIN(roundWin.p12.x, roundWin.p12.y, teta);
      roundWin.mp = RotateXYWIN(roundWin.mp.x, roundWin.mp.y, teta);
    }

    roundWin.p1 = TranslateXYWIN(roundWin.p1.x, roundWin.p1.y, x , y);
    roundWin.p2 = TranslateXYWIN(roundWin.p2.x, roundWin.p2.y, x, y);
    roundWin.p3 = TranslateXYWIN(roundWin.p3.x, roundWin.p3.y, x, y);
    roundWin.p4 = TranslateXYWIN(roundWin.p4.x, roundWin.p4.y, x, y);
    roundWin.p5 = TranslateXYWIN(roundWin.p5.x, roundWin.p5.y, x, y);
    roundWin.p6 = TranslateXYWIN(roundWin.p6.x, roundWin.p6.y, x, y);
    roundWin.p7 = TranslateXYWIN(roundWin.p7.x, roundWin.p7.y, x, y);
    roundWin.p8 = TranslateXYWIN(roundWin.p8.x, roundWin.p8.y, x, y);
    roundWin.p9 = TranslateXYWIN(roundWin.p9.x, roundWin.p9.y, x, y);
    roundWin.p10 = TranslateXYWIN(roundWin.p10.x, roundWin.p10.y, x, y);
    roundWin.p11 = TranslateXYWIN(roundWin.p11.x, roundWin.p11.y, x, y);
    roundWin.p12 = TranslateXYWIN(roundWin.p12.x, roundWin.p12.y, x, y);
    roundWin.mp  = TranslateXYWIN(roundWin.mp.x, roundWin.mp.y, x, y);

  }
}

function DrawRoundedWin(roundWin) {
  return (ctx) => {

    ctx.fillStyle = 'rgb(20, 20, 20)';
    ctx.beginPath();
    ctx.moveTo(roundWin.p12.x,roundWin.p12.y);// aquí empieza la curva
    ctx.quadraticCurveTo(roundWin.p1.x,roundWin.p1.y, roundWin.p2.x,roundWin.p2.y);
    ctx.lineTo(roundWin.p3.x,roundWin.p3.y);
    ctx.quadraticCurveTo(roundWin.p4.x,roundWin.p4.y, roundWin.p5.x,roundWin.p5.y);
    ctx.lineTo(roundWin.p6.x,roundWin.p6.y);
    ctx.quadraticCurveTo(roundWin.p7.x,roundWin.p7.y, roundWin.p8.x,roundWin.p8.y);
    ctx.lineTo(roundWin.p9.x,roundWin.p9.y);
    ctx.quadraticCurveTo(roundWin.p10.x,roundWin.p10.y, roundWin.p11.x,roundWin.p11.y);
    ctx.lineTo(roundWin.p12.x,roundWin.p12.y);
    ctx.closePath();
    ctx.fill();


  }
}
