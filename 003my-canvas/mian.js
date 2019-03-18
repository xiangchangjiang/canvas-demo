


var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');
lineWidth = 5


autoSetCanvas(yyy)

listenToUser(yyy)


//======================
var eraserEnabled = false;
pen.onclick=function(){
  eraserEnabled=false
  pen.classList.add('active')
  eraser.classList.remove('active')

}
eraser.onclick=function(){
  eraserEnabled=true
  eraser.classList.add('active')
  pen.classList.remove('active')
}

black.onclick=function(){
  context.strokeStyle="black"
  black.classList.add('active')
  red.classList.remove('active')
  green.classList.remove('active')
  blue.classList.remove('active')
  eraserEnabled=false
  pen.classList.add('active')
  eraser.classList.remove('active')
}

red.onclick=function(){
  context.strokeStyle="red"
  red.classList.add('active')
  black.classList.remove('active')
  green.classList.remove('active')
  blue.classList.remove('active')
  eraserEnabled=false
  pen.classList.add('active')
  eraser.classList.remove('active')
}
green.onclick=function(){
  context.strokeStyle="green"
  green.classList.add('active')
  red.classList.remove('active')
  black.classList.remove('active')
  blue.classList.remove('active')
  eraserEnabled=false
  pen.classList.add('active')
  eraser.classList.remove('active')
}
blue.onclick=function(){
  context.strokeStyle="blue"
  blue.classList.add('active')
  red.classList.remove('active')
  green.classList.remove('active')
  black.classList.remove('active')
  eraserEnabled=false
  pen.classList.add('active')
  eraser.classList.remove('active')
}

thin.onclick=function() {
  lineWidth=5
  thin.classList.add('active')
  thick.classList.remove('active')
}
thick.onclick=function(){
  lineWidth=10
  thick.classList.add('active')
  thin.classList.remove('active')
}

clear.onclick=function(){
  context.clearRect(0,0,yyy.width,yyy.height)
}

save.onclick=function(){
  var url=yyy.toDataURL('image/png')
  var a=document.createElement('a')
  document.body.appendChild(a)
  a.href=url
  a.download='my canvas'
  a.click()
}


// eraser.onclick = function () {
//   //eraserEnabled = !eraserEnabled
//   //console.log(eraserEnabled)
//   // if(eraserEnabled){
//   //   eraser.textContent='画笔'
//   // }else{
//   //   eraser.textContent='橡皮擦'
//   // }
//   //----上面可以实现页面显示当前是画笔还是橡皮擦的状态，但是最好不用
//   //-----一个按钮只做一件事,用css与js实现 使用一个的时候另一个隐藏。
//   eraserEnabled = true
//   buttonWrapper.className = 'active x'

// }
// brush.onclick = function () {
//   eraserEnabled = false
//   buttonWrapper.className = 'active'
// }


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
  context.lineWidth = lineWidth //线宽
  context.stroke()
}

function listenToUser(canvas) {

  var using = false;
  var lastPoint = {
    'x': undefined,
    'y': undefined
  }
  if (document.body.ontouchstart !== undefined) {
    //触屏设备
    canvas.ontouchstart = function (aaa) {
      console.log('开始摸我了')
      console.log("mousedown")
      using = true
      console.log(aaa.touches[0]['clientX'])
      x = aaa.touches[0].clientX;
      y = aaa.touches[0].clientY;
      console.log(x,y)
      if (eraserEnabled) {
        context.clearRect(x - lineWidth/2, y - lineWidth/2, lineWidth, lineWidth)
      } else {
        lastPoint = {
          'x': x,
          'y': y
        }
        //drawCircle(x,y,2)
      }
    }
    canvas.ontouchmove = function (aaa) {
      console.log('边摸边动')
      x = aaa.touches[0].clientX;
      console.log(x)
      y = aaa.touches[0].clientY;
      if (!using) {
        return
      }
      if (eraserEnabled) {
        //if (using) {
        context.clearRect(x - lineWidth/2, y - lineWidth/2, lineWidth, lineWidth)
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

    canvas.ontouchend = function () {
      console.log('摸完了')
      using = false;
    }
  } else {
    //非触屏设备
    canvas.onmousedown = function (aa) {
      //console.log("mousedown")
      using = true
      //console.log(using)
      x = aa.clientX;
      y = aa.clientY;
      if (eraserEnabled) {
        context.clearRect(x - lineWidth/2, y - lineWidth/2, lineWidth, lineWidth)
      } else {
        lastPoint = {
          'x': x,
          'y': y
        }
        //drawCircle(x,y,2)
      }

    }

    canvas.onmousemove = function (aa) {
      //console.log("mousemove")
      x = aa.clientX;
      y = aa.clientY;
      if (!using) {
        return
      }
      if (eraserEnabled) {
        //if (using) {
        context.clearRect(x - lineWidth/2, y - lineWidth/2, lineWidth, lineWidth)
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
      //console.log('mouseup')
      using = false;
    }
  }
}

// function drawCircle(x,y,radius){
// //   context.strokeStyle='black';
//   context.beginPath();
//   context.arc(x,y,radius,0,2*Math.PI);
//   context.fill();
// }