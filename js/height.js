/**
 * Created by Administrator on 2015/12/30 0030.
 */
window.onload=function(){
    heightMain();
    offAD();
    serchInterfaceAppear();
};
window.onresize=function(){
   heightMain();
};
window.onscroll=function(){
    searchChangeColor();
    //offAD();
};
function heightMain(){  //html中一些元素的尺寸获取
    var rollBox=document.getElementById("roll");
    var rollTouch=document.getElementById("rollTouch");
    var screenWidth=document.getElementsByTagName("body")[0].clientWidth;//获取body的宽
    var sreenheight;
    var HandSlideBox=document.getElementById("HandSlideBox");
    var HandSlideCellEnd=document.getElementById("HandSlideCellEnd");

    rollBox.style.height=Math.floor(screenWidth*350/720)+"px";
    rollTouch.style.width=screenWidth*8+"px";
    HandSlideBox.style.width=Math.floor(screenWidth*2/7)*20+HandSlideCellEnd.offsetWidth+"px";

    var serchInterface=document.getElementById("serchInterface");//搜索界面盒子
    //获取窗口高度
    if (window.innerHeight){
        sreenheight = window.innerHeight;
    }else if((document.body) && (document.body.clientHeight)){
        sreenheight = document.body.clientHeight;
    }
    serchInterface.style.height=sreenheight+"px";

}

function offAD(){   //关闭广告模块
    var offADFlag=1;
    var Advertisement=document.getElementById("Advertisement");
    var ADOffBtn=Advertisement.getElementsByClassName("off")[0];
    var sTop=document.body.scrollTop||document.documentElement.scrollTop;
    ADOffBtn.onclick=function(){
        Advertisement.style.display="none";
        offADFlag=0;
    };
    window.addEventListener("scroll", function(){
        //console.log(document.body.scrollTop||document.documentElement.scrollTop);
        if((document.body.scrollTop||document.documentElement.scrollTop)==0){  //滚动条每次移动顶端都对广告是否被用户关闭进行判定，没关才显示
            if(offADFlag){
                Advertisement.style.display="block";
            }else{
                Advertisement.style.display="none";
            }
        }else{
            Advertisement.style.display="none";
        }
    }, false);

}

function searchChangeColor(){       //搜索框根据位置变化跟换透明度
    var searchBg=document.getElementById("searchBg");
    var nav=document.getElementById("nav");
    var header=document.getElementById("header");
    var changeScope=nav.offsetTop-header.offsetTop;
    var currentLocation=document.body.scrollTop||document.documentElement.scrollTop;
    if((changeScope-currentLocation)>0){
        searchBg.style.opacity=(1-((changeScope-currentLocation)/changeScope))+"";
        searchBg.style.mozOpacity=(1-((changeScope-currentLocation)/changeScope))+"";
    }else{
        searchBg.style.opacity="1";
        searchBg.style.mozOpacity="1";
    }
}


function serchInterfaceAppear(){               //搜索界面的显现与隐藏
    var topSearchText=document.getElementById("topSearchText");
    var serchInterface=document.getElementById("serchInterface");//搜索界面盒子
    var serchInterfaceText=document.getElementById("serchInterfaceText");
    var NonSerchInterface=document.getElementById("NonSerchInterface");//为了解决overflowY在iPhone下不兼容所添加的盒子
    topSearchText.onfocus=function(){

        serchInterface.style.display="block";
        NonSerchInterface.style.display="none";
        document.getElementsByTagName("body")[0].style.overflowY="hidden";
        serchInterfaceText.focus();
    };

    var serchInterfaceOffBtn=document.getElementById("serchInterfaceOffBtn");
        serchInterfaceOffBtn.onclick=function(){

        serchInterface.style.display="none";
            NonSerchInterface.style.display="block";
        document.getElementsByTagName("body")[0].style.overflowY="";

    };
}
