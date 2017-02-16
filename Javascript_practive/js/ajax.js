function jsonUrl(json){
    var arr = [];
    json.t=Math.random();
    for(var name in json){
        arr.push(name+'='+json[name]);
    }
    return arr.join('&');
}

function ajaxFn(url,data,getStyle,time,fnSucc,fnFail){
    // 1. 创建个ajax对象
    if(window.XMLHttpRequest){
        var oAjax = new XMLHttpRequest();
    }else{
        var oAjax = new ActiveXObject('Microsoft.XMLHTTP');
    }
    //2.连接
    oAjax.open(getStyle,url,true);
    oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');


    //3.发送
    oAjax.send(jsonUrl(data));
  
    //4.接收数据
    oAjax.onreadystatechange = function(){
        if (oAjax.readyState == 4) {
            if(oAjax.status>=200 && oAjax.status<300 || oAjax.status==304){
                fnSucc && fnSucc(oAjax.responseText)
            }else{
                fnFail && fnFail(oAjax.status);
            }
        }   
    };

    //网络超时
    timer = setTimeout(function(){
        alert('请检查你的网络');
        oAjax.onreadystatechange = null;
    },time*1000);
}
