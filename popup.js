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
      var customname="王振亭";
      var idcardno="372922199008257366";
      var mobileno="13554198990";
      var addressname="新疆乌鲁木齐天山区幸福南路70号幸福电影院";
  }


  if(user==2){
      var customname="虞珊玲";
      var idcardno="42092219881111352X";
      var mobileno="13554198990";
      var addressname="新疆乌鲁木齐天山区金银路国土资源厅";
  }


  if(user==3){
    var customname="姚旭";
    var  idcardno="652302199108281514";
    var mobileno="18599308051";
    var addressname="新疆昌吉州阜康市公元6号29号楼1单元";

  }

  if(user==4){
    var customname="刘冲亚";
    var  idcardno="412728199010096418";
    var mobileno="18139035602";
    var addressname="新疆昌吉市呼图壁县西市路大唐公寓楼";
  }


  if(user==5){
    var customname="王修明";
    var  idcardno="372928198805251294";
    var mobileno="18699086899";
    var addressname="乌鲁木齐市南湖北路亚欧城市映像5号楼2单元1504";

  }
  if(user==6){
    var customname="杨炜";
    var  idcardno="659001198506203414";
    var mobileno="15099155700";
    var addressname="乌鲁木齐市水磨沟区恒翠花园6号楼1单元401";

  }

  if(user==7){
    var customname="张蕾";
    var  idcardno="650104199101201622";
    var mobileno="15199188237";
    var addressname="乌鲁木齐太原路四建加工厂11号楼2单元403";

  }
  if(user==8){
    var customname="何哲";
    var  idcardno="650103199408041815";
    var mobileno="18599034804";
    var addressname="乌鲁木齐扬子江路42号52号楼3单元501";

  }

  if(user==9){
    var customname="郑梓妍";
    var  idcardno="650104199507041622";
    var mobileno="13565837303";
    var addressname="乌鲁木齐太原路家属院三区4号楼三单元201";

  }

  if(user==10){
    var customname="王乐";
    var  idcardno="650104198311155316";
    var mobileno="13999804855";
    var addressname="新疆乌鲁木齐市新市区银川路518号";

  }


    if(user==11){
      var customname="廖海荣";
      var  idcardno="652829196601191022";
      var mobileno="18160222157";
      var addressname="乌鲁木齐水磨沟区南湖北路旭东小区24号1单元105";

    }

    if(user==12){
      var customname="赵凯";
      var  idcardno="输入错误";
      var mobileno="15199143215";
      var addressname="乌鲁木齐市新市区经济技术开发区街道广州路8号新能大厦";

    }

    if(user==13){
      var customname="李罗洋";
      var  idcardno="513030199403104114";
      var mobileno="15122256890";
      var addressname="乌鲁木齐市新市区喀什东路950号四季风情苑41号楼7单元501";
    }

    if(user==14){
      var customname="张小云";
      var  idcardno="650104196511272526";
      var mobileno="18599178052";
      var addressname="新疆乌鲁木齐中山路百花村软件园8楼";
    }
    if(user==15){
      var customname="陈瑞雪";
      var  idcardno="654123199203054523";
      var mobileno="18167898568";
      var addressname="新疆乌鲁木齐市水磨沟区五星北路西一巷22号兵运司家属院4号楼三单元502";
    }

    if(user==16){
      var customname="李琪";
      var  idcardno="650104198907270710";
      var mobileno="18690272470";
      var addressname="新疆乌鲁木齐市沙区黄河路168号中国联通3号楼501";
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



function LoginUser(username,password){
    var obj1=new Object;
    obj1.username=username;
    obj1.password=password;
    return obj1;
}



var users=new Array (
  LoginUser("wxd237@gmail.com","wxide237"),
  LoginUser("apple237@163.com","apple237"),
  LoginUser("redhat0001@163.com","redhat0001"),
  LoginUser("redhat0002@163.com","redhat0002")
);

for(var i = 0, l = users.length; i < l; i++) {
   document.getElementById("denglu").options.add(new Option(users[i].username,i));
}



document.addEventListener('DOMContentLoaded', function () {
  var divs = document.querySelectorAll('div');
  var div1=document.getElementById('blue');
  var div2=document.getElementById('youhua');
    var div3=document.getElementById('buyouhua');
  var div4=document.getElementById('denglu');
  var div5=document.getElementById('dama');
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

    div2.addEventListener('click', function(e){
      chrome.tabs.executeScript(null,
               {file:"jianjie.js"});

          //{code:"document.body.style.backgroundColor='" + e.target.id + "'"});
          //  {code:"document.body.style.backgroundColor='" + delayset.value + "'"});
      window.close();

    });

    div3.addEventListener('click', function(e){
      chrome.tabs.executeScript(null,
               {file:"nojianjie.js"});

          //{code:"document.body.style.backgroundColor='" + e.target.id + "'"});
          //  {code:"document.body.style.backgroundColor='" + delayset.value + "'"});
      window.close();

    });
    ;

//"";

div5.addEventListener('click', function(e){
  chrome.tabs.executeScript(null,
           {file:"dama.js"});

      //{code:"document.body.style.backgroundColor='" + e.target.id + "'"});
      //  {code:"document.body.style.backgroundColor='" + delayset.value + "'"});
  window.close();

});

    div4.addEventListener('change', function(e){
      console.debug(e);
      var loginame=users[div4.selectedIndex].username;
      var password=users[div4.selectedIndex].password;
      chrome.tabs.executeScript(null,
                        {code:'document.getElementsByClassName("linkGo")[0].click()'});
      setTimeout(
        function(){
          chrome.tabs.executeScript(null,
                                  {code:'window.frames[0].document.getElementById("userName").value="'+loginame+'";'});
          chrome.tabs.executeScript(null,
                                  {code:'window.frames[0].document.getElementById("userPwd").value="'+password+'";'});

          chrome.tabs.executeScript(null,
                                {code:'window.frames[0].document.getElementById("login1").click();'});                      

        },2000
      );

  //    chrome.tabs.executeScript(null, {file:"dama.js"});

          //{code:"document.body.style.backgroundColor='" + e.target.id + "'"});
          //  {code:"document.body.style.backgroundColor='" + delayset.value + "'"});
    //  window.close();

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
