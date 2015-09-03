
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


   setInterval(function(){
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

               console.log(hasAmount+" "+data.hitNum+" "+new Date());
                //initPage();
            }
        });
   }
   ,200
   );
