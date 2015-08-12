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
             console.log(hasAmount+new Date());
             //initPage();
         }
     });
}
,1000
);
