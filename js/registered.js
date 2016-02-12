/**
 * Created by Administrator on 2016/1/25 0025.
 */
$(function(){
    registeredPassWordBtn();

    function registeredPassWordBtn(){
        var passWordBtnFlag=0;
        $("#registeredPassWordBtn").on("mousedown",function(){
            if(passWordBtnFlag==0){
                $("#registeredPassWordBtn").removeClass().addClass("passWordBtnOff");
                $("#registeredPassWordTex").attr("type","text");
                passWordBtnFlag=1;
            }else if(passWordBtnFlag==1){
                $("#registeredPassWordBtn").removeClass().addClass("passWordBtnON");
                $("#registeredPassWordTex").attr("type","password");
                passWordBtnFlag=0;
            }
        })
    }

    var registeredPhoneResult=null;
    var registeredPassWoldNameResult=null;
    var registeredMessageCodeResult=null;
    $("#MessageCodeText").val("");//验证码输入框初始化

    $("#registeredInputBtn").on("mousedown",function(){
        registeredPhonejudge();
        registeredPasswordjudge();
        MessageCodejudge();
        registeredSubmitJudge();
    });


    function  registeredPhonejudge(){
        /**
         *
         * @用户名，手机号，邮箱 {RegExp}
         */
        //rule1=/\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/;//邮箱
          rule1=/0?(13|14|15|18)[0-9]{9}/;//手机号
        //  rule3=/^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/;//用户号
        //var  rule1=/(\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+)|(0?(13|14|15|18)[0-9]{9})|(^[A-Za-z0-9_\-\u4e00-\u9fa5]+$)/;
        //var  rule1=/0?(13|14|15|18)[0-9]{9}/;
        if(!(rule1).test($("#registeredPhoneText").val())){    //没通过
            $("#errorTiShi").css("display","block").text("手机号格式错误");
            $("#registeredPhoneText").css("borderColor","red");
            registeredPhoneResult=false;
        }else{                                     //通过
            //password.focus();
            registeredPhoneResult=true;
            $("#registeredPhoneText").css("borderColor","rgb(215,215,215)");
            $("#errorTiShi").css("display","none").text("");
        }
    }

    function  registeredPasswordjudge() {
        /**
         *
         * @密码 密码不少于6位且不含其它特殊字符 {RegExp}
         */
        //  rule1=/\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/;邮箱
        //  rule2=/0?(13|14|15|18)[0-9]{9}/;//手机号
        //  rule3=/^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/;//用户号
        var rule2 = /^[A-Za-z0-9_-]+$/;
        //var rule2 = /xyz/;
        var str = $("#registeredPassWordTex").val();  //这里不能写成  $("#passWordTex").attr("value")
        if (!((rule2).test(str))) {
            $("#errorTiShi").css("display", "block").text("密码不正确");
            $("#registeredPassWordBox").css("borderColor", "red");
            registeredPassWoldNameResult=false;
        } else {
            $("#errorTiShi").css("display", "none").text("");
            $("#registeredPassWordBox").css("borderColor", "transparent");
            registeredPassWoldNameResult=true;
            //passWoldNameResult=true;
            //yanzheng.focus();
        }
    };

    function  MessageCodejudge(){
        /**
         *
         * @验证码
         */
        if(($("#MessageCodeText").val().toLowerCase())!="qwer"){
            //toLowerCase用于将一个字符串转为小写，toUpperCase则是转为大写。实现验证时不区分大小写，这样就可以不用正则了。

            $("#errorTiShi").css("display", "block").text("验证码过期或错误");
            $("#MessageCode").css("borderColor", "red");

            registeredMessageCodeResult=false;
        }else{

            $("#errorTiShi").css("display", "none").text("");
            $("#MessageCode").css("borderColor", "transparent");

            registeredMessageCodeResult=true;
        }
    }

    function registeredSubmitJudge(){
        if(($("#registeredPhoneText").val()!="")&&($("#MessageCodeText").val()!="")&&($("registeredPassWordText")!="")&&(registeredPassWoldNameResult)&&(registeredPassWoldNameResult)&&(registeredMessageCodeResult)){
            //formBtn.disabled=""
            window.location.href="http://www.baidu.com"
        }
        //else{
        //    formBtn.disabled="disabled"
        //}

    }
    function registeredBtnColorChange(){
        if(($("#registeredPhoneText").val()!="")&&($("#MessageCodeText").val()!="")&&($("registeredPassWordText")!="")){
            if(($("#registeredPhoneText").val()!="")&&($("#MessageCodeText").val()!="")&&($("registeredPassWordText")!="")&&(registeredPassWoldNameResult)&&(registeredPassWoldNameResult)&&(registeredMessageCodeResult)){
                $("#registeredInputBtn").css({"backgroundColor":"green","color":"white"});
            }else{
                $("#registeredInputBtn").css({"backgroundColor":"red","color":"white"});
            }
        }else{
            $("#registeredInputBtn").css({"backgroundColor":"rgb(215,215,215)","color":"rgb(189,189,189)"});

        }
    }
    function registeredPhoneBtnColorChange(){
        if(($("#registeredPhoneText").val()!="")){
            $("#registeredPhoneTextBtn").removeClass().addClass("registeredPhoneTextBtnON")
        }else{
            $("#registeredPhoneTextBtn").removeClass().addClass("registeredPhoneTextBtnOff")
        }
    }


    $("#registeredPhoneTextBtn").on("mousedown",function(){
        registeredPhonejudge();

    });
    $("#registeredPhoneText").on("change",function(){
        registeredPhonejudge();
        registeredBtnColorChange();
        registeredPhoneBtnColorChange();
    });
    $("#registeredPassWordText").on("change",function(){
        registeredPasswordjudge();
        registeredBtnColorChange();
    });
    $("#MessageCodeText").on("change",function(){
        MessageCodejudge();
        registeredBtnColorChange();
    })
});