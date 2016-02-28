/**
 * Created by Administrator on 2016/1/19 0019.
 */
$(function(){
    $.ajax({
        type:"get",
        url:"https://github.com/TomBeiJing/FirstWeb/edit/gh-pages/d1.php",
        success:function(data){
            Countdown(data);
            //Countdown('2016-01-20T15:26:00');//定时格式以2016-01-19T15:26:00为例
            //如果日期采用连词线（-）格式分隔，且具有前导0，JavaScript会认为这是一个ISO格式的日期字符串，导致返回的时间是以UTC时区计算的。
        },
        error:function(){
            console.log("error");
        }
    })
});
function Countdown(data){
//Date对象返回的都是当前时区的时间。
    var CountdownHour=document.getElementById("CountdownHour");
    var CountdownMinute=document.getElementById("CountdownMinute");
    var CountdownSeconds=document.getElementById("CountdownSeconds");
    var CountdownTimer;
    var d1=Date.parse(data);
    CountdownTimer=setInterval(function(){
        var d2=Date.now();
        var TargetData=Math.floor(d1-d2-8*1000*3600)/1000;//（以转换为，单位为秒）“+8*1000*3600”是用来补本地与UTC的时差
        var Hour=Math.floor(TargetData/(3600));
        var Minute=Math.floor((TargetData-Hour*3600)/60);
        var Seconds=Math.floor(TargetData-Hour*3600-Minute*60);
        if((TargetData)<2){
            clearInterval(CountdownTimer);
            $.ajax({
                type:"get",
                url:"https://github.com/TomBeiJing/FirstWeb/edit/gh-pages/d2.php",//如果访问地址为localhost，这里也写localhost。由于要在路由中访问192.168.2.115
                success:function(data){
                    Countdown(data);
                    //Countdown('2016-01-20T15:26:00');//定时格式以2016-01-19T15:26:00为例
                    //如果日期采用连词线（-）格式分隔，且具有前导0，JavaScript会认为这是一个ISO格式的日期字符串，导致返回的时间是以UTC时区计算的。
                },
                error:function(){
                    console.log("error");
                }
            })
        }

        if(TargetData>=0){
            if(Hour>=10){
                CountdownHour.innerHTML=""+Hour;
            }else{
                CountdownHour.innerHTML="0"+Hour;
            }
            if(Minute>=10){
                CountdownMinute.innerHTML=""+Minute;
            }else{
                CountdownMinute.innerHTML="0"+Minute;
            }
            if(Seconds>=10){
                CountdownSeconds.innerHTML=""+Seconds;
            }else{
                CountdownSeconds.innerHTML="0"+Seconds;
            }
        }

    },1000)

}
