window.onload= function(){
    var a = false;

    document.getElementById('btn1').onclick = function(){
    if (a == false){            
        document.getElementById('p1').style.height="100%";
        a =true;
    }else{
        document.getElementById('p1').style.height="0px";
        a =false;
    }
}
}
