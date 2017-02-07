function myDate(id){
    //创建datediv元素
    var oId = document.getElementById(id); 
    var dateDiv = document.createElement('div');
    dateDiv.className = 'dateDiv';
    document.body.appendChild(dateDiv);
    dateDiv.innerHTML = '<ul class="name"><li><span></span><a href="javascript:;" class="a1">上月</a><a href="javascript:;" class="a2">下月</a></li></ul><ul class="week"><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li style="color:#f00;">六</li><li style="color:#f00;">日</li></ul><ul class="dateUl" id ="dateUl"></ul>';
    //获取相关元素
    var oSpan = dateDiv.getElementsByTagName('span')[0];
    var aBtn = dateDiv.getElementsByTagName('a');
    var oUl = dateDiv.children[2];

    function createCalc(){

        oUl.innerHTML = '';
        //获取第一天星期几，前面空li个数
        var firstDay = getFirstDay(iNow);
        if(firstDay == 0) firstDay==7;
        firstDay--;
        for(var i = 0; i<firstDay;i++){
            var aLi = document.createElement('li');
            oUl.appendChild(aLi);
        }

        //获取总天数，创建li
        var days = getDays(iNow);
        for (var i = 0; i < days; i++) {
            var aLi = document.createElement('li');
            aLi.innerHTML = i + 1;
            oUl.appendChild(aLi);
            //每个都要加点击，将当前日期拼入文本框

            aLi.onclick = function(){
                if (this.className == 'ccc') {
                    alert('日期过期');
                }
                else{
                    oId.value = oDate.getFullYear()+'-'+(oDate.getMonth()+1)+'-'+ this.innerHTML;
                    //添加完毕之后隐藏日历
                    dateDiv.style.display = 'none';
                }
            }

        }

        //设置当前时间 today，判断日期加颜色
        var oDate = new Date();
        oDate.setMonth(oDate.getMonth()+iNow);
        var today = oDate.getDate();
        var aLi = oUl.children;

        if(iNow < 0){
            for (var i = 0; i< aLi.length;i++){
                aLi[i].className = 'ccc';
            }
        }
        else if(iNow > 0){
            for (var i = 0; i < aLi.length; i++) {
                if(i%7 == 5 || i%7 ==6){
                    aLi[i].className = 'sun';
                }
            }
        }
        else{
            for(var i = 0 ; i<aLi.length;i++){
                if (aLi[i].innerHTML< today) {
                    aLi[i].className = 'ccc';
                }
                else if (aLi[i].innerHTML == today) {
                    aLi[i].className = 'red';
                }
                else if (i%7==5 || i%7==6){
                    aLi[i].className ='sun';
                }       
            }
        }
         
        oSpan.innerHTML = oDate.getFullYear() +'年'+ (oDate.getMonth()+1) +'月';
    }
    //end function
    var iNow = 0;//当月
    createCalc();
    aBtn[0].onclick = function (){
        iNow--;
        createCalc();
    }
    aBtn[1].onclick = function (){
        iNow++;
        createCalc();
    }
    dateDiv.style.left = getPos(oId).left + 'px';
    dateDiv.style.top = getPos(oId).top + oId.offsetHeight + 'px';
    dateDiv.style.display = 'none';
    oId.onclick = function(){
        dateDiv.style.display = 'block';
    }
}
       

//获取当月总天数
function getDays(iNow){
    var oDate = new Date();
    oDate.setMonth(oDate.getMonth()+iNow+1);
    oDate.setDate(0);
    return oDate.getDate();
}

//获取当月第一天星期几
function getFirstDay(iNow){
    var oDate = new Date();
    oDate.setMonth(oDate.getMonth()+iNow);
    oDate.setDate(1);
    return oDate.getDay();
}

// 返回日历当前位置
function getPos(obj){
    var l = 0;
    var t = 0;
    while (obj) {
        l+= obj.offsetLeft;
        t+= obj.offsetTop;
        obj = obj.offsetParent;
    }
    return {left:l,top:t};
}

