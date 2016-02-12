/**
 * Created by Administrator on 2016/1/18 0018.
 */
function HandSlide(){
    var HandSlideBox=document.getElementById("HandSlideBox");
    var picX;
    var HSSavePicX;//触屏开始记录X
    var HSLeavePicX;//离开屏幕记录X
    var HandSlideContainer=document.getElementById("HandSlideContainer");

    HandSlideBox.addEventListener("touchstart", HandSlideStart, false);
    HandSlideBox.addEventListener("touchend", HandSlideEnd, false);
    HandSlideBox.addEventListener("touchmove", HandSlideMove, false);
    function HandSlideStart(event){         //在触摸屏上滑动该元素时触发
        var touches = event.changedTouches;
        HSSavePicX=touches[0].pageX;
        HandSlideBox.style.transition="none";//拖拽的时候存在延迟是因为，设有transition

    }

    function HandSlideEnd(event){           //在触摸屏上结束滑动该元素时触发
        var touches = event.changedTouches;
        var HandSlideBoxLeft=HandSlideBox.offsetLeft;
        var cellWidth=HandSlideBox.getElementsByTagName("li")[0].offsetWidth;
        var HandSlideContainerWidth=HandSlideContainer.offsetWidth;
        var HandSlideBoxWidth=HandSlideBox.offsetWidth;
        var num;
        HSLeavePicX=touches[0].pageX;       //该坐标以屏幕左上角为原点，而不是元素内容的左上角
        HandSlideBox.style.transition="all 300ms ease";//拖拽的时候存在延迟是因为，设有transition
        if(HandSlideBoxLeft<0){//判断是否是向左划
            currentPosition=currentPosition+HSLeavePicX-HSSavePicX;//实现更换坐标原点的目的
            if(currentPosition<-(HandSlideBoxWidth-HandSlideContainerWidth)){//判断是否划出ul范围
                currentPosition=-(HandSlideBoxWidth-HandSlideContainerWidth);
                HandSlideBox.style.left=currentPosition+"px";//划出ul范围,实现回弹效果
                window.location.href="http://www.baidu.com";//移动超过指定长度则跳转到新页面(在当前窗口中打开)
                //window.open("http://www.baidu.com");//移动超过指定长度则跳转到新页面(在新窗口中打开)
            }
            num=Math.ceil(-currentPosition/cellWidth);
            if((HSLeavePicX-HSSavePicX)<=0){ //判断是否是向左划
                adjustment(num);
            }else{
                num=num-1;
                adjustment(num);
            }
        }

    }

    var currentPosition=0;
    function HandSlideMove(event){             //在触摸屏上移动该元素时触发
        var touches = event.changedTouches;    //由于触屏可能是多点接触，所以这里touches返回的是一个数组
        var HandSlideBoxLeft=HandSlideBox.offsetLeft;
        picX=touches[0].pageX;
        if(!(HandSlideBoxLeft>=0&&((picX-HSSavePicX)>=0))){
            HandSlideBox.style.left=(picX-HSSavePicX)+currentPosition+"px";
        }
    }

    function adjustment(index){                  //根据滑动的位置，调整所应当移动的距离
        var cellWidth=HandSlideBox.getElementsByTagName("li")[0].offsetWidth;
        currentPosition=-index*cellWidth;
        HandSlideBox.style.left=currentPosition+"px";
    }
}
HandSlide();