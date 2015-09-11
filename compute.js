
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
var rushId=5298;
function qiaogou(){
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

cid=setInterval(qiaogou,100);

var cid;

var rcode=1;
var rushId=5298;

var rcode=randomSum(0,3000);
function qiang19(){
  var startTime = new Date().getTime();
  var buyurl= sendLink.cartv2+"api/web/rush.jsonp?rushId="+rushId;
  Js.sendDataForCall(buyurl,{dataType:'jsonp',type:'post',manualClose:true},function(data){
    removeCloseLoading();
    /**0:普通异常1:成功101:活动未开启102:活动已结束103:超过最大抢购次数104:已售罄105:未预约*/
    switch(parseInt(data.status)){
      case 1: window.location.href = "/rushSuccessInfo-j-miaosha919.html"; break; //成功
            clearInterval(cid);
      case 10: window.location.href="/huodong/queue-j-miaosha919.html?timestamp="+startTime+"&rush_id="+rushId; break; //排队
      case 107:
        $("#codeError").html("您输入的验证码有误，请重新输入");
        $("#verifycode").focus();
        break; //输入验证码
      case 108:
        if(popVerificationCode){
           popVerificationCode.open();
        }else{
           popVerificationCode = pop('#openVerificationCode',{removeAfterShow:true});
        }
        break; //输入验证码
      default: break;
    }
  });
}
