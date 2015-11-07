
  $.ajax({
         url : Esf.contextPath + '/wskill/querynum',
         type : 'POST',
         data : goodsParam,
         success : function(data) {
             if(data.respCode=="ok"){
                   hasAmount = "true";
                   $("#hitNum").text(data.hitNum);
             }else if(data.respCode=="noNum"){
                 hasAmount = "false";
                 $("#hitNum").text(data.hitNum);
             }
             if(hasAmount=="true" && data.hitNum!=0 ){
               document.getElementById("verifyCaptcha").click();
             }

            console.log(hasAmount+" "+data.hitNum+" "+new Date());
             //initPage();
         }
     });



$(".captcha").attr("src","/mall-web/CaptchaGenerate/init?timestamp=1440986400000");

$(".captcha").attr("src","");
var captchatime;
var blobUrl;
function loadCaptcha(){
    var file='http://www.10010.com/mall-web/CaptchaGenerate/init?timestamp='+new Date().getTime();
    var oReq = new XMLHttpRequest();

    oReq.open('GET', file, true);
     oReq.responseType = 'blob';

     oReq.onload = function() {
       captchatime=oReq.getResponseHeader('Date');
       var blob11 = new Blob ([oReq.response], {type: 'image/jpeg'});
       blobUrl = URL.createObjectURL(blob11);
       document.getElementsByClassName("captcha")[0].setAttribute("src",blobUrl);
       $('.unity_checkT span').text(captchatime);

   };
      oReq.send();

    $('.img-check-input').val('');
    $('.J_input-error').hide();

}

  function submit(param){
      $(".loadingStyle").show().center();
      buyFlag="";
      goodsParam.captchaCode = param.captchaCode;
      $.ajax({
          url : Esf.contextPath + '/wskill/submit',
          type : 'POST',
          data : goodsParam,
          success : function(data) {
            console.log(data);
              var respCode = data.respCode;
              var respMsg = data.respMsg;
              if(respCode == "success"){
                  $("#buyInfo_1").center().show();
                  $(".thickdiv").show();
                  buyFlag="2";
                  goodsUrl = data.goodsUrl;
                  window.goodUrl=data.goodsUrl;
                  console.log(data);
                  timeOut();
              }else{
                    $.publish('/Captcha/show', []);     //不成功就刷新验证码
              }
              $(".loadingStyle").hide();
          },
          error:function(data) {
              $(".loadingStyle").hide();
              $(".thickdiv").show();
              Message.showFailMsg("提示", "哎呀，人太多，被卡住了", "再来一次", function(){
                  $.publish('/Captcha/show', []);
              });
          }
      });
  }


  $(".nowBuyAt").show();
  document.querySelector(".img-check-input").tabIndex=1;

  $(".img-check-input").keydown(function(e){ if (e.keyCode == 13) {$("#verifyCaptcha").click();} });


  $(document).keydown(function(e){
     if(e.keyCode == 13 && e.ctrlKey){
       	 $.publish('/Captcha/show', []);
     }
  });


  $('#verifyCaptcha').die().live('click', function(){
         var captchaCode = $('.img-check-input').val();
         var re = new RegExp('^[a-zA-Z]{4}$');
         if(!re.test(captchaCode)){
             $('.J_input-error').show().text('请输入拼音首字母');
             return false;
         }
        // $('#unity_check').hide();
         var param = {'captchaCode':captchaCode};
         submit(param);
        // $.publish('/Captcha/submit', [param]);
     });

var qiaogoutime=new Date();
qiaogoutime.setHours(9);
qiaogoutime.setMinutes(35);
qiaogoutime.setSeconds(0);
qiaogoutime.setMilliseconds(0);
qiaogoutime.toGMTString();

var qh1=setInterval(function(){
    
    var captchatime=$(".unity_checkT.ie6Png span").text();
    if(captchatime &&captchatime>=qiaogoutime.toGMTString()){
        clearInterval(qh1);
    }else{
    	loadCaptcha();
    }

},100);


    var system_sec=parseInt($("#systime").val())-parseInt(start_time_str);
  //system_sec=start_time-systime;
   //system_sec=10;
   var isFirst=true;

   var tr1=setInterval(function(){
     if(isFirst && system_sec<0.4){
           isFirst=false;
           $.publish('/Captcha/show', []);
           clearInterval(tr1);
     }
     console.log("curdate"+system_sec);
     system_sec=system_sec-0.1;
   },100);






   setInterval(function(){

   }
   ,200
   );


//360buy
var lastprice=0;

function jdqiang(price1,msec,stepprice){



      var itl=setInterval(function(){
        initCurrentData();
      var curUser=$(".phone:first").text();       //当前领先的用户
      var myuser=$(".link-user").text();           //我自己
      var userprice = $("#bidPrice").val();
      var price = Number(jQuery.trim(userprice));
      if(price>=price1)     clearInterval(itl);
      if(curUser!='****字这么难'){
        $("#bidPrice").val(currentPrice+stepprice);
        incre();
        bid();
      }

    },msec);
}


$.ajax({
url : "http://www.10010.com/mall-web/CaptchaGenerate/init?timestamp=1442110807668",
type : 'HEAD',
success : function(data){
   //file exists
            console.log(data);
},
error : function(){
   //file not exists

}
});



// 乐视
//  var link="4446,5008,4675,5296,5298,5295,4674,4993,5002,4748";//这次活动的id列表

$('.buyAction').removeClass('hidden');
$('#openVerificationCode').removeClass('hidden');
$("#verifycode").keydown(function(e){ if (e.keyCode == 13) {$("#verificationCodeSubmit").click();} });
var randomSum = function(min,max){
  return 1;
};


//抢购代码 19号之前的秒杀
var cid;

var rcode=1;
var rushId=4674;
var time=25;
function qiaogou(){
    if(time--<0)    clearInterval(cid);
              var startTime = new Date().getTime();

          var buyurl= sendLink.varnish+"v2/api/web/rush.jsonp?timestamp="+ startTime +"&rushId="+ rushId;
  Js.sendDataForCall(buyurl,{dataType:'jsonp',type:'post',manualClose:true},function(data){
    console.log(data);
    /**0:普通异常1:成功101:活动未开启102:活动已结束103:超过最大抢购次数104:已售罄105:未预约*/
    switch(parseInt(data.status)){
      case 1:
                        if(isRecommend !=""){
                        window.location.href = "/rushSuccessInfo-j-jingxi-tj-"+ data.result.promotionId +".html";
                          }else{
                        window.location.href = "/rushSuccessInfo-j-jingxi.html";
                      }
                          clearInterval(cid);
                        break; //成功

      default : break;

    }
  });
}

cid=setInterval(qiaogou,200);
