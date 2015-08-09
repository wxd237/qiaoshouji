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


  if(user==2){
      var customname="王振亭";
      var idcardno="372922199008257366";
      var mobileno="13554198990";
      var addressname="新疆乌鲁木齐天山区幸福南路70号幸福电影院";
  }


  if(user==3){
      var customname="虞珊玲";
      var idcardno="42092219881111352X";
      var mobileno="13554198990";
      var addressname="新疆乌鲁木齐天山区金银路国土资源厅";
  }


  if(user==4){
    var customname="徐新生";
    var  idcardno="652326196309161532";
    var mobileno="13999361168";
    var addressname="阜康市迎宾路3号信合苑";

  }
  if(user==5){
    var customname="张燕萍";
    var  idcardno="652302196312231561";
    var mobileno="13369802360";
    var addressname="阜康市准噶尔路17号机电市场永安保险公司";
  }


  if(user==6){
    var customname="刘冲亚";
    var  idcardno="412728199010096418";
    var mobileno="18139035602";
    var addressname="新疆昌吉市呼图壁县西市路大唐公寓楼";
  }


  if(user==7){
    var customname="王晓雯";
    var  idcardno="65282919910222142X";
    var mobileno="18690177873";
    var addressname="西山路70号华美博奥小区一期11号楼1单元501";
  }
  if(user==8){
    var customname="王修明";
    var  idcardno="372928198805251294";
    var mobileno="18699086899";
    var addressname="乌鲁木齐市南湖北路亚欧城市映像5号楼2单元1504";

  }
  if(user==9){
    var customname="杨炜";
    var  idcardno="659001198506203414";
    var mobileno="15099155700";
    var addressname="乌鲁木齐市水磨沟区恒翠花园6号楼1单元401";

  }

  if(user==10){
    var customname="张蕾";
    var  idcardno="650104199101201622";
    var mobileno="15199188237";
    var addressname="乌鲁木齐太原路四建加工厂11号楼2单元403";

  }
  if(user==11){
    var customname="何哲";
    var  idcardno="650103199408041815";
    var mobileno="18599034804";
    var addressname="乌鲁木齐扬子江路42号52号楼3单元501";

  }

  if(user==12){
    var customname="郑梓妍";
    var  idcardno="650104199507041622";
    var mobileno="13565837303";
    var addressname="乌鲁木齐太原路家属院三区4号楼三单元201";

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
  var div2=document.getElementById('shezhi');
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
