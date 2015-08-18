console.log( Esf.contextPath);

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
             if(hasAmount=="true" && data.hitNum!=0 ){
               document.getElementById("verifyCaptcha").click();
             }

            console.log(hasAmount+" "+data.hitNum+" "+new Date());
             //initPage();
         }
     });
}
,100
);


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
            }else if(respCode == "noLogin"){
                $(".thickdiv").show();
                $("#LoginIframe").attr("src",$("#LoginIframe").attr("srctemp"));
                $("#loginRegister").show().center();
                killNoLogin = "2";
            }else if(respCode == "captchaError"){
                $(".thickdiv").show();
                buyFlag="1";
                $("#buyInfo_2").show().center();
                $("#buyInfo_2 .infoBuy").text(respMsg);
            }else if(respCode == "onceBuy"){
                $(".thickdiv").show();
                $("#buyInfo_2").show().center();
                $("#buyInfo_2 .infoBuy").text(respMsg);
            }else{
                $(".thickdiv").show();
                $("#buyInfo_2 .infoBuy").text("非常抱歉，该商品已被抢光。");
                $("#buyInfo_2").show().center();
                $(".detailTwo .nowBuy").addClass("afterBuy");
                $(".detailTwo .oneYuan").removeClass("cfee").addClass("cfff");
                $(".detailTwo .nowBuyAt").hide();
                $(".detailTwo .nowBuyP").hide();
                $(".detailTwo .nowBuyP2").hide();
                $(".detailTwo .afterBuyP").show();
                $(".detailTwo .InBuyAfter").show();
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









document.querySelector(".img-check-input").tabIndex=1;
$(".img-check-input").keydown(function(e){ if (e.keyCode == 13) {$("#verifyCaptcha").click();} });
$(document).keydown(function(e){
   if(e.keyCode == 13 && e.ctrlKey){

   }
});


$(document).keydown(function(e){
   if(e.keyCode == 13 && e.ctrlKey){
     	 $.publish('/Captcha/show', []);
   }
});
