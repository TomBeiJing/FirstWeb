/**
 * Created by Administrator on 2016/1/19 0019.
 */
$(function(){
    $.ajax({
        type:"get",
        url:"http://192.168.2.108/work25/d1.php",
        success:function(data){
            Countdown(data);
            //Countdown('2016-01-20T15:26:00');//��ʱ��ʽ��2016-01-19T15:26:00Ϊ��
            //������ڲ��������ߣ�-����ʽ�ָ����Ҿ���ǰ��0��JavaScript����Ϊ����һ��ISO��ʽ�������ַ��������·��ص�ʱ������UTCʱ������ġ�
        },
        error:function(){
            console.log("error");
        }
    })
});
function Countdown(data){
//Date���󷵻صĶ��ǵ�ǰʱ����ʱ�䡣
    var CountdownHour=document.getElementById("CountdownHour");
    var CountdownMinute=document.getElementById("CountdownMinute");
    var CountdownSeconds=document.getElementById("CountdownSeconds");
    var CountdownTimer;
    var d1=Date.parse(data);
    CountdownTimer=setInterval(function(){
        var d2=Date.now();
        var TargetData=Math.floor(d1-d2-8*1000*3600)/1000;//����ת��Ϊ����λΪ�룩��+8*1000*3600����������������UTC��ʱ��
        var Hour=Math.floor(TargetData/(3600));
        var Minute=Math.floor((TargetData-Hour*3600)/60);
        var Seconds=Math.floor(TargetData-Hour*3600-Minute*60);
        if((TargetData)<2){
            clearInterval(CountdownTimer);
            $.ajax({
                type:"get",
                url:"http://192.168.2.108//work25/d2.php",//������ʵ�ַΪlocalhost������Ҳдlocalhost������Ҫ��·���з���192.168.2.115
                success:function(data){
                    Countdown(data);
                    //Countdown('2016-01-20T15:26:00');//��ʱ��ʽ��2016-01-19T15:26:00Ϊ��
                    //������ڲ��������ߣ�-����ʽ�ָ����Ҿ���ǰ��0��JavaScript����Ϊ����һ��ISO��ʽ�������ַ��������·��ص�ʱ������UTCʱ������ġ�
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
