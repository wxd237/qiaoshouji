


var user=2;


if(user==0){
  var customname="王西迪";
  var idcardno="513030198905063012";
  var mobileno="18690173700";
  var addressname="乌鲁木齐天山区金银路82号";

}

if(user==1){
var customname="张凡";
var idcardno="130125198906247017";
var mobileno="15026000595";
var addressname="伊宁市环城北路北苑二区";
}

if(user==2){
    var customname="马婧云";
    var idcardno="65010419900330162X";
    var mobileno="18690829627";
    var addressname="乌鲁木齐市新市区高新街长沙路158号绿苑雅筑7号楼门面长沙路社区";
}

$("#detailAddress").val(addressname);
$("#receiverName").val(customname);
$("#consignee").val(customname);
$("#mobile").val(mobileno);
$("#idCard").val(idcardno);
//$("#recommend").val("王西迪");
//$("#recommendCode").val('18690173700');

//$("#recommend").attr("readonly","readonly")
//$("#recommendCode").attr("readonly","readonly")

var se=document.getElementById('cityId');


  $("#networkInfoSave").trigger("click");
  $("#netProtocol").trigger("click");
  $("#networkInfoSave").click();


  document.getElementsByClassName('nowBuyAt')[0].style.display="block";
