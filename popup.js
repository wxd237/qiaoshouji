// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function seluser(user){
  if(user==0){
    var customname="刘俊";
    var idcardno="412728198707010827";
    var mobileno="18139035603";
    var addressname="乌市天山区南门国际置地A2一单元1401";

  }

  if(user==1){
  var customname="张凡";
  var idcardno="130125198906247017";
  var mobileno="15026000595";
  var addressname="乌鲁木齐大湾北路幸福花园4期30号楼1单元702";
  }

  if(user==2){
      var customname="马婧云";
      var idcardno="65010419900330162X";
      var mobileno="18690829627";
      var addressname="乌鲁木齐市新市区高新街长沙路158号绿苑雅筑7号楼门面长沙路社区";
  }

  if(user==3){
      var customname="党从飞";
      var idcardno="654127198701090034";
      var mobileno="15809911938";
      var addressname="乌市天山区南门国际置地B3一单元1401";
  }

  if(user==4){
      var customname="宋浩";
      var idcardno="650104198909230018";
      var mobileno="17799106230";
      var addressname="新疆乌鲁木齐天山区中山路百花村软件园6楼";
  }

  if(user==5){
      var customname="王振亭";
      var idcardno="372922199008257366";
      var mobileno="13554198990";
      var addressname="新疆乌鲁木齐天山区幸福南路70号幸福电影院";
  }

  if(user==6){
      var customname="蔡叙伦";
      var idcardno="372922199008257366";
      var mobileno="13554198990";
      var addressname="大湾北路140号工行小区8号楼2单元301";
  }

  if(user==7){
      var customname="虞珊玲";
      var idcardno="42092219881111352X";
      var mobileno="13554198990";
      var addressname="新疆乌鲁木齐天山区金银路国土资源厅";
  }

  if(user==8){
    var customname="张晶";
    var  idcardno="652302199211221528";
    var mobileno="13109022432";
    var addressname="乌鲁木齐天山区市龙泉街171号";
  }

  if(user==9){
    var customname="徐新生";
    var  idcardno="652326196309161532";
    var mobileno="13999361168";
    var addressname="阜康市迎宾路3号信合苑";

  }
  if(user==10){
    var customname="张燕萍";
    var  idcardno="652302196312231561";
    var mobileno="13369802360";
    var addressname="阜康市准噶尔路17号机电市场永安保险公司";
  }

  if(user==11){
    var customname="严雪";
    var  idcardno="652302199107291526";
    var mobileno="15099091229";
    var addressname="乌鲁木齐市新市区北京南路中核大厦B座9楼";
  }

  if(user==12){
    var customname="严焱";
    var  idcardno="652302198703311533";
    var mobileno="13309941776";
    var addressname="昌吉回族自治州阜康市博龙小区11栋3单元202室";
  }

  if(user==13){
    var customname="刘冲亚";
    var  idcardno="412728199010096418";
    var mobileno="18139035602";
    var addressname="新疆昌吉市呼图壁县西市路大唐公寓楼";
  }

  if(user==14){
    var customname="赵慧";
    var  idcardno="652922198009240550";
    var mobileno="18099205026";
    var addressname="乌鲁木齐市天山区幸福花园7期54楼3单元201室";
  }


  chrome.tabs.executeScript(null,
                      {code:"document.getElementById('consignee').value='"+customname+"'"});

  chrome.tabs.executeScript(null,
                      {code:"document.getElementById('receiverName').value='"+customname+"'"});

  chrome.tabs.executeScript(null,
                      {code:"document.getElementById('idCard').value='"+idcardno+"'"});
  chrome.tabs.executeScript(null,
                      {code:"document.getElementById('detailAddress').value='"+addressname+"'"});
  chrome.tabs.executeScript(null,
                      {code:"document.getElementById('mobile').value='"+mobileno+"'"});

    chrome.tabs.executeScript(null,
                      {code:"document.getElementById('mobile').value='"+mobileno+"'"});



    chrome.tabs.executeScript(null,
                      {code:"document.getElementById('receiverName').readOnly=true"});

      chrome.tabs.executeScript(null,
                      {code:"document.getElementById('idCard').readOnly=true"});
        chrome.tabs.executeScript(null,
                    {code:'document.getElementById("networkInfoSave").click();'});



}


document.addEventListener('DOMContentLoaded', function () {
  var divs = document.querySelectorAll('div');
  var div1=document.getElementById('blue');
    div1.addEventListener('click', function(e){
      var delayset=document.getElementById('delayset');
      chrome.tabs.executeScript(null,
               {code:"document.getElementById('pianyi').value='" + delayset.value + "'"});
     chrome.tabs.executeScript(null,
                        {code:"document.getElementById('searchInputBox').value='" + delayset.value + "'"});

          //{code:"document.body.style.backgroundColor='" + e.target.id + "'"});
          //  {code:"document.body.style.backgroundColor='" + delayset.value + "'"});
      window.close();

    });


    var sel=document.getElementById("userid");
    sel.addEventListener('change',function(e){

      seluser(sel.selectedIndex);

    });


    /*
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', click);
  }*/
});
