var yyy=document.getElementById('xxx');
var context=yyy.getContext('2d');
// console.log(context)


function drawCircle(x,y){
//   context.strokeStyle='black';
  context.beginPath();
  context.arc(x,y,2,0,2*Math.PI);
  context.fill();
}

var painting=false;
var lastPoint={'x':undefined,'y':undefined}
yyy.onmousedown=function(aa){
  painting=true;
  x=aa.clientX;
  y=aa.clientY;
  console.log(x,y)
  drawCircle(x,y)
  lastPoint={'x':x,'y':y}
  
}

yyy.onmousemove=function(aa){
  if(painting){
    x=aa.clientX;
    y=aa.clientY;
    var newPoint={'x':x,'y':y}
    drawCircle(x,y)
    x1=lastPoint['x']
    y1=lastPoint['y']
    x2=newPoint['x']
    y2=newPoint['y']
    drawLine(x1,y1,x2,y2)
    lastPoint=newPoint
  }
}
yyy.onmouseup=function(aa){
  painting=false;
}

function drawLine(x1,y1,x2,y2){
  context.beginPath()
  context.moveTo(x1,y1)  //起点 
  context.lineTo(x2,y2)  //终点 
  context.lineWidth=4    //线宽
  context.stroke()
}