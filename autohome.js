
window.MS1={};


(function () {
    var MS = {};
    // get
    function $(target) {
        if (typeof (target) == 'string') {
            return document.getElementById(target);
        }
        return target;
    }
    // 去空
    function trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }
    // 随机数
    function random(min, max) {
        return Math.floor((max - min + 1) * Math.random()) + min;
    }
    // 替换
    function replaceAll(str, oldStr, newStr) {
        return str.replace(new RegExp(oldStr, 'gm'), newStr);
    }
    // 取参
    function query(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }
    // 转JSON
    function parseJson(str) {
        return window.JSON ? JSON.parse(str) : new Function('return ' + str)();
    }
    // 格式化参数
    function formatQuery(data) {
        var arr = [];
        var value = null;
        if (data) {
            for (var key in data) {
                value = data[key];
                if (value !== undefined && value !== null) {
                    arr.push(key + '=' + encodeURIComponent(data[key]));
                }
            }
        }
        return arr.join('&');
    }
    // ajax
    function ajax(args) {
        var method = 'get';
        if (args.method) {
            method = args.method.toLowerCase();
        }
        if (args.data && method == 'get') {
            if (args.url.indexOf('?') < 0) {
                args.url = args.url + '?' + formatQuery(args.data);
            } else {
                args.url = args.url + '&' + formatQuery(args.data);
            }
        }
        var xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.open(method, args.url);
        xhr.onreadystatechange = function () {
        MS.respDate=xhr.getResponseHeader('Date');
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    if (args.success) {
                        if (args.dataType == 'json') {
                            args.success(parseJson(xhr.responseText));
                        } else {
                            args.success(xhr.responseText);
                        }
                    }
                } else if (args.error) {
                    args.error(xhr.status, xhr.statusText);
                }
            }
        }
        if (args.cache === false) {
            xhr.setRequestHeader('If-Modified-Since', '0');
        }
        if (method == 'post') {
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
            xhr.send(formatQuery(args.data));
        } else {
            xhr.send(null);
        }
    }
    // 格式化时间
    function getFormatTime(millisecond) {
        var secoundTotal = Math.round(millisecond / 1000)
        var day = Math.floor(secoundTotal / 86400);
        secoundTotal = secoundTotal % 86400;
        var hour = Math.floor(secoundTotal / 3600);
        secoundTotal = secoundTotal % 3600;
        var minute = Math.floor(secoundTotal / 60);
        secoundTotal = secoundTotal % 60;
        return day + ' 天 ' + hour + ' 小时 ' + minute + ' 分 ' + secoundTotal + ' 秒';
    }

    // 秒杀
    var MS = {};
    // 属性
    MS.itemId = 1076;
    MS.config = null;
    MS.calibration = null; // 时间
    MS.islogin = false;    // 是否己登陆
    MS.isrecord = false;   // 是否己显示秒杀记录
    MS.isseckill = false;  // 是否己提交

    MS.itemId=window.MS.itemId;
    MS.config = window.MS.config;
    MS.calibration = window.MS.calibration; // 时间
    MS.islogin = window.MS.islogin;    // 是否己登陆
    MS.isrecord = window.MS.isrecord;   // 是否己显示秒杀记录
    MS.isseckill = window.MS.isseckill;  // 是否己提交
    /**
    "{ "login": { "name": "王西迪", "mobile": "18690173700" }, "issue": { "issueId": 551, "ctime": "2015/11/02 10:06:12", "stime": "2015/11/02 15:00:00", "etime": "2015/11/02 15:30:00", "rtime": "2015/11/02 15:30:00" } }"
    */

    // 初始
    MS.initialize = function (config) {
        this.config = config;
        this.itemId = config.itemId;
        ajax({
            url: '/miaosha/service/init.ashx?itemId=' + MS.itemId,
            method: 'GET',
            dataType: 'json',
            cache: false,
            success: function (re) {
                if (re.issue) {
                    var t = {};
                    var issue = re.issue;
                    t.startTime = Date.parse(issue.stime);
                    t.endTime = Date.parse(issue.etime);
                    t.nextTime = Date.parse(issue.rtime);
                    t.localTime = new Date().getTime();
                    t.serviceTime = Date.parse(issue.ctime);
                    t.status = -1; // 0未开始 1进行中 2己结束
                    MS.calibration = t;
                    MS.refreshStatus(); // 开始刷新状态
                } else {
                    MS.record(); // 加载记录
                    $(config.button.container).innerHTML = config.button.end;
                    $(config.statusBox).innerHTML = '己结束';
                }
                MS.bindLogin(re.login);
            }
        });
    }
    // 绑定登陆
    MS.bindLogin = function (login) {
        var loginConfig = this.config.login;
        if (login) {
            $(loginConfig.enter).style.display = 'block';
            $(loginConfig.quit).style.display = 'none';
            $(loginConfig.username).innerHTML = login.name;
            this.islogin = true;
        } else {
            $(loginConfig.enter).style.display = 'none';
            $(loginConfig.quit).style.display = 'block';
            this.islogin = false;
        }
    }
    // 刷新状态
    MS.refreshStatus = function () {
        var t = MS.calibration;
        var currentTime = new Date().getTime();
        var elapsedTime = currentTime - t.localTime;
        var serviceTime = t.serviceTime + elapsedTime;
        var startMillisecond = t.startTime - serviceTime;
        var endMillisecond = t.endTime - serviceTime;
        var nextMillisecond = t.nextTime - serviceTime;
        var buttonConfig = MS.config.button;
        if (startMillisecond > 0) {
            if (t.status != 0) {
                t.status = 0;
                $(buttonConfig.container).innerHTML = buttonConfig.nostart;
            }
            $(MS.config.statusBox).innerHTML = '距开始还有：<span>' + getFormatTime(startMillisecond) + '</span>';
            setTimeout(MS.refreshStatus, 500);
        } else if (endMillisecond > 0) {
            if (t.status != 1) {
                t.status = 1;
                $(buttonConfig.container).innerHTML = buttonConfig.start;
            }
            $(MS.config.statusBox).innerHTML = '距结束还有：<span>' + getFormatTime(endMillisecond) + '</span>';
            setTimeout(MS.refreshStatus, 500);
        } else if (nextMillisecond > 0) {
            $(buttonConfig.container).innerHTML = buttonConfig.end;
            $(MS.config.statusBox).innerHTML = '本期结束，等待下一期开始';
        } else {
            $(buttonConfig.container).innerHTML = buttonConfig.end;
            $(MS.config.statusBox).innerHTML = '己结束';
        }
        if (startMillisecond < 1 && !MS.isrecord) {
            MS.isrecord = true;
            MS.record();
          //  setTimeout(MS.record, random(3000, 9999));
        }
    }
    // 登陆
    MS.login = function (mobileId, mscodeId, fn) {
        var mobile = trim($(mobileId).value);
        var mscode = trim($(mscodeId).value);
        if (mobile == '') {
            fn("请填写手机号码");
            return;
        } else if (!/^0?1[345789]\d{9}$/.test(mobile)) {
            fn("手机号码格式不正确");
            return;
        }
        if (mscode == '') {
            fn("请输入秒杀码");
            return;
        }
        ajax({
            url: '/miaosha/service/login.ashx?itemId=' + MS.itemId + '&mobile=' + mobile + '&mscode=' + mscode,
            method: 'GET',
            dataType: 'json',
            cache: false,
            success: function (re) {
                console.log(re);
                if (re.login) {
                    MS.bindLogin(re.login);
                    fn(1);
                } else {
                    fn(re.msg);
                }
            }
        });
    }
    // 退出
    MS.loginOut = function () {
        ajax({
            url: '/miaosha/service/loginOut.ashx?itemId=' + MS.itemId,
            method: 'GET',
            dataType: 'text',
            cache: false,
            success: function (re) {
                MS.bindLogin(null);
            }
        });
    }
    // 发送秒杀码
    MS.sendMscode = function (mobileId, fn) {
        var mobile = trim($(mobileId).value);
        if (mobile == '') {
            fn("请填写手机号码");
            return;
        } else if (!/^0?1[345789]\d{9}$/.test(mobile)) {
            fn("手机号码格式不正确");
            return;
        }
        ajax({
            url: '/miaosha/service/sendMscode.ashx?itemId=' + MS.itemId + '&mobile=' + mobile,
            method: 'GET',
            dataType: 'text',
            cache: false,
            success: function (re) {
                fn(re);
            }
        });
    }
    // 获取秒杀问题
    MS.refreshQuestion = function (questionId) {
        ajax({
            url: 'question.ashx?itemId=' + MS.itemId,
            method: 'GET',
            dataType: 'text',
            cache: false,
            success: function (re) {
                MS.respmsg=re;
                console.log(re+new Date());
                $(questionId).innerHTML = re;
            }
        });
    }
    // 开秒
    MS.seckill = function (answerId, fn) {
        var answer = trim($(answerId).value);
        if (answer == '') {
            fn("请输入验证答案");
            return;
        }
        if (MS.isseckill) {
            fn("正在提交中...");
            return;
        }
        MS.isseckill = true;
        ajax({
            url: '/miaosha/service/seckill.ashx?itemId=' + MS.itemId + '&answer=' + escape(answer),
            method: 'GET',
            dataType: 'text',
            cache: false,
            success: function (re) {
              console.log(re);
                MS.isseckill = false;
                fn(re);
            },
            error: function (statusCode, statusText) {
                MS.isseckill = false;
            }
        });
    }
    // 获取记录   这里应该是最新秒杀记录
    MS.record = function () {
        if (MS.config.showRecord) {
            ajax({
                url: '/miaosha/service/record.ashx?itemId=' + MS.itemId,
                method: 'GET',
                dataType: 'text',
                cache: false,
                success: function (re) {
                    var obj = parseJson(replaceAll(re, "'", "\""));
                    MS.config.showRecord(obj.item);
                }
            });
        }
    }

    // 暴露
    window.MS = MS;

})();



$("#seckillLayer").layer("show");

$(document).keydown(function(e){
   if(e.keyCode == 13 && e.ctrlKey){
        MS.refreshQuestion('seckillQuestion');
   }
});


$("#seckillAnswer").keydown(function(e){ if (e.keyCode == 13) {  seckill();;} });



var qh1=setInterval(function(){
    if(MS.respmsg=="活动暂未开始，请刷新"){
         	 MS.refreshQuestion('seckillQuestion');
    }else{
    	clearInterval(qh1);
   
    }
},80);