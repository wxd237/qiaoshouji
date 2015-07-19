// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function seluser(user){
  if(user==0){
    var customname="刘俊";
    var idcardno="412728198707010827";
    var mobileno="18139035603";
    var addressname="""乌市天山区南门国际置地A2一单元1401";

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
      var addressname="乌市天山区南门国际置地B3 一单元1401";
  }

  if(user==4){
      var customname="宋浩";
      var idcardno="654127198701090034";
      var mobileno="15809911938";
      var addressname="乌鲁木齐市天山区金银路82号农信科技中心";
  }

  if(user==5){
      var customname="王振亭";
      var idcardno="372922199008257366";
      var mobileno="13554198990";
      var addressname="乌鲁木齐市天山区金银路82号农信科技中心";
  }

  if(user==6){
      var customname="蔡叙伦";
      var idcardno="372922199008257366";
      var mobileno="13554198990";
      var addressname="乌鲁木齐市天山区金银路82号农信科技中心";
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
