/*
调用方式：window.huoDongService.sendRequest({rushId:4675},"${rush_date}");
  参数说明：
    1：{rushId:4675} 活动ID
      2："${rush_date}" 参数页获取标识,例如：tv0919
*/
(function(globle){

var popVerificationCode;
var suffix = new Date().getTime();

var param={rushId:4993};
var paramPageToken='jingxi';//参数页获取标识
var ToolsUtil ={
  suffix:suffix,
  //生成随机数
  randomSum:function(min,max){
    return 0;
  },
  /*
    函数说明：根据MAP返回字符串参数
      param
        map: {mid:"1",page:"2"}
      return "mid=1&page"
  */
  dealParamMapToStr:function(param){
    var str = "";
    var i = 1;
    for(var key in param){
      if (i === 1) {
        str += key+"="+param[key];
      }else{
        str +="&"+ key+"="+param[key];
      }
      i++;
    }
    return str;
  },
  //弹出遮罩功能
  addLoading:function(){
    timerId = window.setTimeout(function(){
      if($("#sendDataLoad").length == 0){
        $("body").append(Js.Tools.getShadeLayer("loadingContent")+
          "<div id='wjLoad-body' class='loadingContent'>" +
          "<div id='sendDataLoad'><img src='/htmlResource/images/loading.gif'/></div>"+
          "<div>"+
          "<div class='wjLoad-text'>努力加载中...<span id='dot'>请稍等</span></div>"+
          "</div>"+
          "</div>"
        );
        Js.Tools.setEleToCenter("#wjLoad-body");
      }
    },10);
  },
  removeCloseLoading:function(){
    Js.closeLoadContent();
  },
  codeError:function(){
    var suffix = this.suffix;
    var closeSubmitLoading = function(){
      $("#verificationCodeSubmit_"+suffix).find("span").html("提交");
    }
    closeSubmitLoading();
    $("#codeError_"+suffix).empty().append("您输入的验证码有误，请重新输入");
          $("#verify_"+suffix).attr("src",sendLink.auth+"validCodeImage?"+(new Date().getTime()));
    $("#verifycode_"+suffix).focus();
  },
  addSubmitLoading:function(){
    $("#verificationCodeSubmit_"+this.suffix).find("span").html("提交中...");
  },
  verificationCode:function(){
    var suffix = this.suffix;
    var verificationCode = $("#verifycode_"+suffix).val();
    if(verificationCode == null || $.trim(verificationCode).length == 0){
      $("#codeError_"+ suffix).empty().append("请填写验证码");
      $("#verifycode_"+ suffix).focus();
      return "";
    }

    return verificationCode;
  },
  /*
    函数说明：延迟执行
      param
        fn:需要执行的函数
        millisec:在执行代码前需等待的毫秒数
  */
  delayExecution:function(fn,millisec){
    setTimeout(fn,1);
  },
  loadcapt:function(){
    var file='http://authentication.go.lemall.com/validCodeImage?'+new Date().getTime();
    var oReq = new XMLHttpRequest();
    oReq.open('GET', file, true);
    oReq.responseType = 'blob';
    oReq.onload = function() {
      captchatime=oReq.getResponseHeader('Date');
      var blob11 = new Blob ([oReq.response], {type: 'image/jpeg'});
      console.log(blob11);
      blobUrl = URL.createObjectURL(blob11);
      $("#verify_"+suffix).attr("src",blobUrl);
      $(".font30.dark").text(captchatime);

    };
    oReq.send();
  },
  createPopElement:function(){
    var str = '<div id="openVerificationCode_'+suffix+'" class="" style="width:600px; margin:0 auto;border:1px solid #dedede;background-color:#fff;">'+
            '<a class="block right  pr5 font14 arial" href="javascript:void(0);" id="closeVerificationCode_'+suffix+'">x</a>'+
            '<div class="p60 t_c">'+
              '<dl>'+
              '<dt><span class="font30 dark">我们一起防黄牛！</span><br /><br /><span class="font18">请您输入下面验证码</span></dt>'+
              '<dd id="code_'+suffix+'" class="pt30 clearfix" style="width:210px; margin:0 auto;">'+
                '<div class="left" style="line-height:36px;"><img id="verify_'+suffix+'" src="http://authentication.go.lemall.com/validCodeImage" title="点击换一张" style="height:36px;" /></div>'+
                '<a class="left pl20" style="line-height:36px;" href="javascript:;" id="a_verify_'+suffix+'">换一张</a>'+
              '</dd>'+
              '<dd  class="pt10 ">'+
                '<input name="" id="verifycode_'+suffix+'" type="text" class="" style="width:210px;height:36px;" />'+
                '</dd>'+
              '<dd class="pt10"><div id="codeError_'+suffix+'" class="error clear red" ></div></dd>'+
              '</dl>'+
              '<div  class="pt30">'+
                '<a class="red_bt_l inline_block" href="javascript:void(0);" id="verificationCodeSubmit_'+suffix+'"><span class="white">确定</span></a>'+
              '</div>'+
            '</div>'+
          '</div>';
    $(document.body).append(str);
    return {
      popId:"#openVerificationCode_"+suffix,
    }
  }
};


//按钮绑定事件
var InitEventBund = {
  suffix:suffix,
  verificationEvent:function(){


    var suffix = this.suffix
    //按钮点击事件
    $("#verificationCodeSubmit_"+suffix).live('click',function(){

      var code = ToolsUtil.verificationCode();
      console.log('wxd'+code);
      if(code !=""){
          console.debug(param);
      //  if(typeof param != "undefined"){
              if(true){
            console.log('code undefined'+code);
          param.RANDOMCODE = code;
          ToolsUtil.addSubmitLoading();
          globle.huoDongService.sendRequest(param,paramPageToken);
          console.log('wxd'+code);
        }
      }else{
        console.log('wxd2'+code);
        return false;
      }
    });
    $("#code_"+suffix).live('click',function(){
      ToolsUtil.loadcapt();
    });

    $("#a_verify_"+suffix).die().live('click',function(){
          ToolsUtil.loadcapt();
    });
    $("#closeVerificationCode_"+suffix).live('click',function(){
      if(popVerificationCode){
         popVerificationCode.close();
      }
    });

    $("#verifycode_"+suffix).keydown(function(e){
       console.log('haha');
         if (e.keyCode == 13) {

             $("#verificationCodeSubmit_"+suffix).click();
           }
      });

    $("#verifycode_"+suffix).live('click',function(){
        $("#codeError_"+suffix).empty();
    });

  }
};
/*
  函数说明：发送抢购服务请求
    param
      args: {rushId:"1",RANDOMCODE:"2"}/{rushId:"1"},如果RANDOMCODE存在说明由验证码处理提交的请求
      param_page_token:参数页获取标识
    return "mid=1&page"
*/
var HuoDongService = function(){};
HuoDongService.prototype.sendRequest = function(args,param_page_token){
  if(typeof args != "undefined"){
    param = args;
  }else{
    param={rushId:4993};
  }
  if(typeof param_page_token != "undefined"){
    paramPageToken = param_page_token;
  }else{
    param_page_token='jingxi';
  }

  if(typeof param != "undefined"){
    param.timestamp = new Date().getTime();
    var requestParam = ToolsUtil.dealParamMapToStr(param);
    if(typeof args.RANDOMCODE == "undefined"){
      ToolsUtil.addLoading();//添加loading
    }else{
      ToolsUtil.addSubmitLoading();//改变提交按钮方字
    }
    var executable = function(){
      if(typeof args.RANDOMCODE == "undefined"){
        setTimeout(ToolsUtil.removeCloseLoading,10000);//如果10秒接口还没有返回，就关闭遮罩
      }
      var startTime = new Date().getTime();
      var buyurl= sendLink.varnish+"v2/api/web/rush.jsonp";//参数rushId=1×tamp=1324546587 或 rushId=1×tamp=1324546587&RANDOMCODE=4056
      if(requestParam != null && requestParam.length > 0){
        buyurl+="?"+ requestParam;
      }
      Js.sendDataForCall(buyurl,{dataType:'jsonp',type:'post',manualClose:true},function(data){
        /**
          0:普通异常,1:成功,101:活动未开启,102:活动已结束,103:超过最大抢购次数,104:已售罄,105:未预约,107:验证码错误,108:需要验证码
        */

        switch(parseInt(data.status)){
          case 1:window.location.href = "/rushSuccessInfo-j-"+ paramPageToken +"-tj-"+ data.result.promotionId +".html"; break; //成功
      //    case 10: window.location.href="/huodong/queue-j-"+ paramPageToken +".html?timestamp="+param.timestamp+"&rush_id="+param.rushId; break; //排队
        //  case 107:
        //    ToolsUtil.codeError();break;
          case 108:
            if(typeof popVerificationCode != "undefined"){
              popVerificationCode.open();
            }else{
              var obj = ToolsUtil.createPopElement();
              popVerificationCode = pop(obj.popId,{removeAfterShow:true});
            }
            break; //输入验证码
        //  default: window.location.href = "/rushFailInfo.html-j-"+ paramPageToken +".html?r="+data.status;
        }
      });
    }
    ToolsUtil.delayExecution(executable,ToolsUtil.randomSum(0,1));
  }
}
InitEventBund.verificationEvent();
var obj = ToolsUtil.createPopElement();
popVerificationCode = pop(obj.popId,{removeAfterShow:true});
globle.huoDongService = new HuoDongService();
globle.loadcapt=ToolsUtil.loadcapt;
globle.verificationEvent=InitEventBund.verificationEvent;
globle.suffix=ToolsUtil.suffix;
})(window)



var randomSum = function(min,max){
  return 0;
};
