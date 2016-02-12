/**
 * Created by Administrator on 2016/1/11 0011.
 */
var picX;
var savePicX;//触屏开始记录X
var leavePicX;//离开屏幕记录X
var flag;
var rollBox=document.getElementById("rollTouch");
var pics=rollBox.getElementsByTagName("img");
var rollCells=rollBox.getElementsByTagName("li");
var rollIndexCells=document.getElementById("rollIndex").getElementsByTagName("li");
var body=document.getElementsByTagName("body");
var CellWidth=document.body.clientWidth;
//var CellWidth=rollBox.clientWidth;
var timer;
var indexNum=0;

function topSlide(){
    for (var j=0;j<pics.length;j++){
        pics[j].ondragstart=imgdragstart;//禁止图片被拖拽
        rollCells[j].value=j;
        rollCells[j].addEventListener("touchstart", handleStart, false);
        rollCells[j].addEventListener("touchend", handleEnd, false);
        rollCells[j].addEventListener("touchmove", handleMove, false);
    }
}

function handleMove(event){
    //evt.preventDefault();
    var current=event.currentTarget;
    //currentTarget属性返回事件当前所在的节点，即正在执行的监听函数所绑定的那个节点。作为比较，target属性返回事件发生的节点。
    var touches = event.changedTouches;//由于触屏可能是多点接触，所以这里touches返回的是一个数组

    var index=current.value;
    var indexLeft;
    var indexRight;
    if(index==0){
        indexLeft=rollCells.length-1;
        indexRight=index+1;
    }else if(index==(rollCells.length-1)){
        indexLeft=index-1;
        indexRight=0;
    }else{
        indexLeft=index-1;
        indexRight=index+1;
    }

    picX=touches[0].pageX;
        rollCells[index].style.left=(picX-savePicX)+"px";//接触元素的位移

    rollCells[indexLeft].style.left=(picX-savePicX)-CellWidth+"px";//相邻接触元素左侧元素的位移
        rollCells[indexRight].style.left=(picX-savePicX)+CellWidth+"px";//相邻接触元素右侧侧元素的位移
}
function handleStart(event){
    var touches = event.changedTouches;
    flag=1;
    savePicX=touches[0].pageX;
    var current=event.currentTarget;
    var index=current.value;
    for(var i=0;i<pics.length;i++){
        rollCells[i].style.transition="none";//拖拽的时候存在延迟是因为，设有transition
        rollCells[i].style.mozTransform="none";//拖拽的时候存在延迟是因为，设有transition
    }
    Initialization(index);
    clearInterval(timer);
}
function handleEnd(event){
    flag=0;
    var touches = event.changedTouches;
    var current=event.currentTarget;
    var index=current.value;
    leavePicX=touches[0].pageX;
    for(var i=0;i<pics.length;i++){
        rollCells[i].style.transition="all 300ms ease";//拖拽的时候存在延迟是因为，设有transition
        rollCells[i].style.mozTransform="all 300ms ease";//拖拽的时候存在延迟是因为，设有transition
    }
    if((leavePicX-savePicX)<-60){ //实现如果手指在屏幕上划过（完成手指离开触屏动作）超过60px 判定为翻页
        index=index+1;
        if(index>(rollCells.length-1)){
            index=0;
        }
    }else if((leavePicX-savePicX)>60){
        index=index-1;
        if(index<0){
            index=rollCells.length-1;
        }
    }else{
        index=index+0;
    }
    Initialization(index);
    indexNum=index;
    timer=setInterval(timerPosition,3000);

}
function  Initialization(index){
    var indexLeft;
    var indexRight;
    if(index==0){
         indexLeft=rollCells.length-1;
         indexRight=index+1;
    }else if(index==(rollCells.length-1)){
         indexLeft=index-1;
         indexRight=0;
    }else{
         indexLeft=index-1;
         indexRight=index+1;
    }

    for (var j=0;j<pics.length;j++){
        rollCells[j].style.zIndex=-1+"";
        rollCells[j].style.left=0+"px";
        rollIndexCells[j].className="";
    }
    rollIndexCells[index].className="on";
    rollCells[index].style.left=0+"px";
    rollCells[indexRight].style.left=CellWidth+"px";
    rollCells[indexLeft].style.left=0-CellWidth+"px";

    rollCells[index].style.zIndex=12+"";
    rollCells[indexRight].style.zIndex=11+"";
    rollCells[indexLeft].style.zIndex=11+"";

}
function timerPosition(){     //定时器自动翻页（触屏则停止，反之开始）
    Initialization(indexNum);
    if(indexNum==(rollCells.length-1)){
        indexNum=0;
    }else{
        indexNum++;
    }
}
timer=setInterval(timerPosition,3000);
Initialization(0);
topSlide();

