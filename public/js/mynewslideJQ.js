(function($){

    $.fn.slider=function(sliderwidth,sliderheight){

        function getStyle(obj, str) {
            if (window.getComputedStyle) {
                return window.getComputedStyle(obj, null)[str]
            }
            else {
                return obj.currentStyle[str];
            }
        }
      
        function animation(obj, json, fn) {
            clearInterval(obj.timer);
            obj.timer = setInterval(function () {
                var flag = true;
                for (var key in json) {
                    var target = parseInt(json[key]);
                    if (key == "opacity") {
                        var now = getStyle(obj, "opacity") * 100;
                    }
                    else {
                        var now = parseInt(getStyle(obj, key))
                    }
    
                    var speed = (target - now) / 10;
                    
                    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                    now = now + speed;
                    if (key == "opacity") {
                        obj.style.opacity = now / 100;
                        obj.style.filter = "alpha(opacity=" + now + ")";
                    }
                    else if (key == "zIndex") {
                        obj.style.zIndex = target;
                    }
                    else {
                        obj.style[key] = now + "px";
                    }
    
                    if (target != now) {
                        flag = false;
                    }
    
                }
                if (flag) {
                    clearInterval(obj.timer);
                    if (fn) {
                        fn()
                    }
                }
            }, 20)
        }
    
        var styleArr={
            div:"width:" +sliderwidth+";height: "+sliderheight+";position:relative;margin: 30px 0 50px 0px;overflow: hidden;",
            ulImg:"width: 100%;height: 100%;position: relative;",
            img:"width: 100%;height:90%;margin-bottom:3px;",
            ulImgli:"width: 100%;height:100%;list-style:none; float:left;position: absolute;" ,
            arrow:"position: absolute; width: 100%;top:50%; margin-top: -40px;display:none",
            point:"position: absolute;left: 50%;bottom:12%;",
            pointLi:"float: left;width: 12px;height: 12px;margin:10px 10px 0 0;border-radius: 15px;background: white;cursor: pointer;list-style:none; float:left;",
            current:"background: #ccc;",
            arrowli:"background:rgba(212, 88, 88, 0.5);width: 40px;height: 80px;color: #fff;text-align: center;cursor: pointer;font: 700 20px/80px '微软雅黑';list-style:none; float:left;",
            prev:"float:left",
            next:"float:right"
            }


        var box= this[0];
        box.style.cssText=styleArr.div;
        var newUl1=document.createElement("ul");
        var newUl2=document.createElement("ul");
        box.appendChild(newUl1);
        box.appendChild(newUl2);
        
        var imgUl=box.children[0];
        var imgWidth = box.offsetWidth;
       
        var pointUl=box.children[1];
        var arrowUl=box.children[2];
        var newarr1=document.createElement("li");
        var newarr2=document.createElement("li");
        newarr1.innerText="<"
        newarr2.innerText=">"
        arrowUl.appendChild(newarr1);
        arrowUl.appendChild(newarr2);
        var prev=arrowUl.children[0];
        var next=arrowUl.children[1];
        var liArr =imgUl.children;
        var pointmargin=-liArr.length*11;
        var liimg=document.querySelectorAll(".sliderbox img");
        var num = 0;
        for (var i = 0; i < liArr.length; i++) {
            liArr[i].style.cssText=styleArr.ulImgli;
            liimg[i].style.cssText=styleArr.img;
            var newpoint=document.createElement("li");
            
            pointUl.appendChild(newpoint);
            liArr[i].style.left = imgWidth + "px";
        }
        var pointS=pointUl.children;
        //样式赋予
      
        
        imgUl.style.cssText=styleArr.ulImg;
        pointUl.style.cssText=styleArr.point+"margin-left:"+pointmargin+"px;";
        arrowUl.style.cssText=styleArr.arrow;
        prev.style.cssText=styleArr.arrowli+styleArr.prev;
        next.style.cssText=styleArr.arrowli+styleArr.next;


        
        
        liArr[0].style.left = 0;
       
        prev.onclick = function(){
           
            animation(liArr[num],{left:imgWidth});
            num = --num<0?liArr.length-1:num;
            liArr[num].style.left = -imgWidth+"px";
            animation(liArr[num],{left:0});
            light()
        };
        prev.onmousemove=function(){
            window.getSelection?window.getSelection().removeAllRanges():document.selection.empty();
        }
        next.onclick = autoplay;
        next.onmousemove=function(){
            window.getSelection?window.getSelection().removeAllRanges():document.selection.empty();
        }
       var moveflag=true;
        function reback(){
            moveflag=true;
        }
        for(var j=0;j<pointS.length;j++){
            pointS[j].style.cssText=styleArr.pointLi;
            pointS[j].index = j;
            pointS[j].onclick = function(){
            if(moveflag){
              
               moveflag=false;
                var index = this.index;
                if(index>num){
                    liArr[index].style.left = imgWidth+"px";
                    animation(liArr[index],{left:0},reback);
                    animation(liArr[num],{left:-imgWidth},reback);
                }
                if(index<num){
                    liArr[index].style.left = -imgWidth+"px";
                    animation(liArr[index],{left:0},reback);
                    animation(liArr[num],{left:imgWidth},reback);
                }
               
                num = index;
                
                light()
            }
        }
            
        }
        light();
        clearInterval(box.timer);
        box.timer = setInterval(autoplay,3000);
    
    
        box.onmouseover = function(){
            clearInterval(box.timer);
        };
        box.onmouseout = function(){
            clearInterval(box.timer);
            box.timer = setInterval(autoplay,3000)
        };
    
        function autoplay(){
          
            animation(liArr[num],{left:-imgWidth});
            num = ++num>liArr.length-1?0:num;
            liArr[num].style.left = imgWidth+"px";
            animation(liArr[num],{left:0});
            light();
        };
        function light(){
            for(var i=0;i<pointS.length;i++){
                
                pointS[i].style.cssText =styleArr.pointLi;
            }
            pointS[num].style.cssText=styleArr.pointLi+styleArr.current;
        }





    }


})(jQuery)