var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');


autoSetCanvas(yyy)

listenToMouse(yyy)







//======================
var eraserEnabled = false;
eraser.onclick = function () {
  //eraserEnabled = !eraserEnabled
  //console.log(eraserEnabled)
          // if(eraserEnabled){
          //   eraser.textContent='画笔'
          // }else{
          //   eraser.textContent='橡皮擦'
          // }
          //----上面可以实现页面显示当前是画笔还是橡皮擦的状态，但是最好不用
          //-----一个按钮只做一件事,用css与js实现 使用一个的时候另一个隐藏。
  eraserEnabled=true
  buttonWrapper.className='active x'
    
}
brush.onclick=function(){
  eraserEnabled=false
  buttonWrapper.className='active'
}


//工具函数
function autoSetCanvas(canvas) {
  setCanvasSize()
  window.onresize = function () {
    setCanvasSize()
  }

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath()
  context.moveTo(x1, y1) //起点 
  context.lineTo(x2, y2) //终点 
  context.lineWidth = 4 //线宽
  context.stroke()
}

function listenToMouse(canvas) {
  var using = false;
  var lastPoint = {
    'x': undefined,
    'y': undefined
  }
  canvas.onmousedown = function (aa) {
    using = true
    //console.log(using)
    x = aa.clientX;
    y = aa.clientY;
    if (eraserEnabled) {
      context.clearRect(x - 5, y - 5, 10, 10)
    } else {
      lastPoint = {
        'x': x,
        'y': y
      }
      //drawCircle(x,y,2)
    }

  }

  canvas.onmousemove = function (aa) {
    x = aa.clientX;
    y = aa.clientY;
    if (!using) {return }
    if (eraserEnabled) {
      //if (using) {
      context.clearRect(x - 5, y - 5, 10, 10)
      //}
    } else {
      
      var newPoint = {
        'x': x,
        'y': y
      }
      //drawCircle(x,y,2)
      x1 = lastPoint['x']
      y1 = lastPoint['y']
      x2 = newPoint['x']
      y2 = newPoint['y']
      drawLine(x1, y1, x2, y2)
      lastPoint = newPoint
    }
  }


  canvas.onmouseup = function (aa) {
    using = false;
  }

}

// function drawCircle(x,y,radius){
// //   context.strokeStyle='black';
//   context.beginPath();
//   context.arc(x,y,radius,0,2*Math.PI);
//   context.fill();
// }