/**
 * Created by Administrator on 2016/1/26 0026.
 */
$(function(){
    var PasswordRetakeuserNameResult=null;
    var PasswordRetakeyanZhengResult=null;
    $("#PasswordRetakeVerificationCodeText").val("");//验证码输入框初始化

    $("#PasswordRetakeNextBtn").on("mousedown",function(){
        PasswordRetakeusernamejudge();
        PasswordRetakeyanzhengjudge();
        PasswordRetakesubmitJudge();
    });


    function  PasswordRetakeusernamejudge(){
        /**
         *
         * @用户名，手机号，邮箱 {RegExp}
         */
        //  rule1=/\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/;邮箱
        //  rule2=/0?(13|14|15|18)[0-9]{9}/;//手机号
        //  rule3=/^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/;//用户号
        var  rule1=/(\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+)|(0?(13|14|15|18)[0-9]{9})|(^[A-Za-z0-9_\-\u4e00-\u9fa5]+$)/;
        //var  rule1=/0?(13|14|15|18)[0-9]{9}/;
        if(!(rule1).test($("#PasswordRetakeUserNameText").val())){    //没通过
            $("#errorTiShi").css("display","block").text("账户名不存在");
            $("#PasswordRetakeUserNameText").css("borderColor","red");
            PasswordRetakeuserNameResult=false;
        }else{                                     //通过
            PasswordRetakeuserNameResult=true;
            $("#PasswordRetakeUserNameText").css("borderColor","rgb(191,191,191)");
            $("#errorTiShi").css("display","none").text("");
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
    $("#PasswordRetakeVerificationCodeTu").text(random_base64(4));

    $("#PasswordRetakeVerificationCodeTu").text(random_base64(4)).on("mousedown",function(){
        $("#PasswordRetakeVerificationCodeTu").text(random_base64(4));
    });
    function  PasswordRetakeyanzhengjudge(){
        /**
         *
         * @验证码
         */
        var rule3=$("#PasswordRetakeVerificationCodeTu").text();
        if(($("#PasswordRetakeVerificationCodeText").val().toLowerCase())!=(rule3.toLowerCase())){
            //toLowerCase用于将一个字符串转为小写，toUpperCase则是转为大写。实现验证时不区分大小写，这样就可以不用正则了。

            $("#errorTiShi").css("display", "block").text("验证码不正确，请重新输入");
            $("#PasswordRetakeVerificationCodeText").css("borderColor", "red");

            PasswordRetakeyanZhengResult=false;
        }else{

            $("#errorTiShi").css("display", "none").text("");
            $("#PasswordRetakeVerificationCodeText").css("borderColor", "rgb(191,191,191)");

            PasswordRetakeyanZhengResult=true;
        }
    }

    function PasswordRetakesubmitJudge(){
        if(($("#PasswordRetakeUserNameText").val()!="")&&($("#PasswordRetakeVerificationCodeText").val()!="")&&(PasswordRetakeuserNameResult)&&(PasswordRetakeyanZhengResult)){
            //formBtn.disabled=""
            window.location.href="http://www.baidu.com"
        }
        //else{
        //    formBtn.disabled="disabled"
        //}

    }
    function PasswordRetakeNextBtnColorChange(){
        if(($("#PasswordRetakeUserNameText").val()!="")&&($("PasswordRetakeVerificationCodeText")!="")){
            if(($("#PasswordRetakeUserNameText").val()!="")&&($("#PasswordRetakeVerificationCodeText").val()!="")&&(PasswordRetakeuserNameResult)&&(PasswordRetakeyanZhengResult)){
                $("#PasswordRetakeNextBtn").css({"backgroundColor":"green","color":"white"});
            }else{
                $("#PasswordRetakeNextBtn").css({"backgroundColor":"red","color":"white"});
            }
        }else{
            $("#PasswordRetakeNextBtn").css({"backgroundColor":"rgb(215,215,215)","color":"rgb(189,189,189)"});

        }
    }
    $("#PasswordRetakeUserNameText").on("change",function(){
        PasswordRetakeusernamejudge();
        PasswordRetakeNextBtnColorChange();
    });

    $("#PasswordRetakeVerificationCodeText").on("change",function(){
        PasswordRetakeyanzhengjudge();
        PasswordRetakeNextBtnColorChange();
    })
});