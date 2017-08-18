/*
   *  selector:  canvas元素选择器
   *  x:绘制的圆形x轴位置
   *  y:绘制的圆y轴位置
   *  r:绘制圆的半径
   *  outColor: 外部圆颜色
   *  innerColor:内部圆颜色
   *  enlarge: 首次是放大还是缩小 默认缩小
   *  timer: 变化速度  默认值 100
   * */
function animationBall(selector, x, y, r, outColor, innerColor, enlarge, timer) {
    var canvas = document.querySelector(selector)
    var context = canvas.getContext('2d')
    var flag = enlarge
    timer = timer || 100
    var bR = r // 获取初始化外圆半径  为后面进行比较
    // 创建内圆和外圆
    function createBall(r) {
        context.lineWidth = 0.3 * r //线条宽度
        ball(r, outColor)
        ball(r * 0.5, innerColor)
    }

    // 根据传入的 半径和颜色  画出圆环
    function ball(r, color) {
        context.beginPath()
        context.arc(x, y, r, 0, Math.PI * 2, true)
        context.strokeStyle = color
        context.stroke()
        context.closePath()
    }

    /*  清除画布指定区域内容*/
    function clearRect(r) {
        var w = 0.3 * r
        var distance = (r + w / 2)
        context.clearRect(x - distance, y - distance, distance * 2, distance * 2)
    }

    /* 定时器  画圆
     *修改时间可以改变发生变化
     */
    setInterval(function () {
        if (r >= bR * 2 || r <= 0.5 * bR) {
            // r = bR
            flag = !flag
        }
        clearRect(r + 2)
        if (flag) {
            createBall(r++)
        }
        else {
            createBall(r--)
        }
    }, timer)
}