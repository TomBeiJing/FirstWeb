/**
 * Created by Administrator on 2016/1/22 0022.
 */
$(function(){

    passWordBtn();
    FreeLogoinBtn();

    function passWordBtn(){
        var passWordBtnFlag=0;
        $("#passWordBtn").on("mousedown",function(){
            if(passWordBtnFlag==0){
                $("#passWordBtn").removeClass().addClass("passWordBtnON");
                $("#passWordTex").attr("type","text");
                passWordBtnFlag=1;
            }else if(passWordBtnFlag==1){
                $("#passWordBtn").removeClass().addClass("passWordBtnOff");
                $("#passWordTex").attr("type","password");
                passWordBtnFlag=0;
            }
        })
    }
    function FreeLogoinBtn(){
        var FreeLogoinBtnFlag=0;
        $("#FreeLogoinRealBtn").on("mousedown",function(){
            if(FreeLogoinBtnFlag==0){
                $("#FreeLogoinBtn").removeClass().addClass("FreeLogoinOn");
                FreeLogoinBtnFlag=1;
            }else if(FreeLogoinBtnFlag==1){
                $("#FreeLogoinBtn").removeClass().addClass("FreeLogoinOFF");
                FreeLogoinBtnFlag=0;
            }
        })
    }


    var userNameResult=null;
    var passWoldNameResult=null;
    var yanZhengResult=true;
    var loginResult=0;
    $("#VerificationCodeText").val("");//验证码输入框初始化

    $("#inputBtn").on("mousedown",function(){
        usernamejudge();
        passwordjudge();
        if((!userNameResult)||(!passWoldNameResult)||(!yanZhengResult)){
            loginResult++;
        }
        if(loginResult>2){
            $("#VerificationCode").css("display","block");
            yanZhengResult=false;
            yanzhengjudge();
        }
        submitJudge();
    });


    function  usernamejudge(){
        /**
         *
         * @用户名，手机号，邮箱 {RegExp}
         */
        //  rule1=/\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/;邮箱
        //  rule2=/0?(13|14|15|18)[0-9]{9}/;//手机号
        //  rule3=/^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/;//用户号
        var  rule1=/(\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+)|(0?(13|14|15|18)[0-9]{9})|(^[A-Za-z0-9_\-\u4e00-\u9fa5]+$)/;
        //var  rule1=/0?(13|14|15|18)[0-9]{9}/;
        if(!(rule1).test($("#userNameText").val())){    //没通过
            $("#errorTiShi").css("display","block").text("账户名不存在");
            $("#userNameBox").css("borderColor","red");
            userNameResult=false;
        }else{                                     //通过
            //password.focus();
            userNameResult=true;
            $("#userNameBox").css("borderColor","transparent");
            $("#errorTiShi").css("display","none").text("");
        }
    }

    function  passwordjudge() {
        /**
         *
         * @密码 密码不少于6位且不含其它特殊字符 {RegExp}
         */
        //  rule1=/\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/;邮箱
        //  rule2=/0?(13|14|15|18)[0-9]{9}/;//手机号
        //  rule3=/^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/;//用户号
        var rule2 = /^[A-Za-z0-9_-]+$/;
        //var rule2 = /xyz/;
        var str = $("#passWordTex").val();  //这里不能写成  $("#passWordTex").attr("value")
        if (!((rule2).test(str))) {
            $("#errorTiShi").css("display", "block").text("密码不正确");
            $("#passWordBox").css("borderColor", "red");
            passWoldNameResult=false;
        } else {
            $("#errorTiShi").css("display", "none").text("");
            $("#passWordBox").css("borderColor", "transparent");
            passWoldNameResult=true;
            //passWoldNameResult=true;
            //yanzheng.focus();
        }
    }

    //随机字符串产生函数
    var ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    function random_base64(length) {
        var str = "";
        for (var i=0; i < length; ++i) {
            var rand = Math.floor(Math.random() * ALPHABET.length);
            str += ALPHABET.substring(rand, rand+1);
        }
        return str;
    };
    $("#VerificationCodeTu").text(random_base64(4)).on("mousedown",function(){
        $("#VerificationCodeTu").text(random_base64(4));
    });


    function  yanzhengjudge(){
        /**
         *
         * @验证码
         */
        var rule3=$("#VerificationCodeTu").text();
        console.log(($("#VerificationCodeText").val().toLowerCase())!=(rule3.toLowerCase()));
        if(($("#VerificationCodeText").val().toLowerCase())!=(rule3.toLowerCase())){
            //toLowerCase用于将一个字符串转为小写，toUpperCase则是转为大写。实现验证时不区分大小写，这样就可以不用正则了。

            $("#errorTiShi").css("display", "block").text("验证码输入错误，请重新输入");
            $("#VerificationCode").css("borderColor", "red");

            yanZhengResult=false;
        }else{

            $("#errorTiShi").css("display", "none").text("");
            $("#VerificationCode").css("borderColor", "transparent");

            yanZhengResult=true;
        }
    }

    function submitJudge(){
        if(($("#userNameText").val()!="")&&($("#passWordTex").val()!="")&&($("VerificationCodeText")!="")&&(userNameResult)&&(passWoldNameResult)&&(yanZhengResult)){
            //formBtn.disabled=""
            window.location.href="http://www.baidu.com"
        }
        //else{
        //    formBtn.disabled="disabled"
        //}

    }
    function BtnColorChange(){
        if(($("#userNameText").val()!="")&&($("#passWordTex").val()!="")&&($("VerificationCodeText")!="")){
            if(($("#userNameText").val()!="")&&($("#passWordTex").val()!="")&&($("VerificationCodeText")!="")&&(userNameResult)&&(passWoldNameResult)&&(yanZhengResult)){
                $("#inputBtn").css({"backgroundColor":"green","color":"white"});
            }else{
                $("#inputBtn").css({"backgroundColor":"red","color":"white"});
            }
        }else{
            $("#inputBtn").css({"backgroundColor":"rgb(215,215,215)","color":"rgb(189,189,189)"});

        }
    }
    $("#userNameText").on("change",function(){
        usernamejudge();
        BtnColorChange();
    });
    $("#passWordTex").on("change",function(){
        passwordjudge();
        BtnColorChange();
    });
    $("#VerificationCodeText").on("change",function(){
        yanzhengjudge();
        BtnColorChange();
    })
});
