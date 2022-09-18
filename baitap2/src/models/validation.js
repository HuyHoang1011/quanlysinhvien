function Validation(){
    this.kiemTraRong = function (value, divError, mess){
        if(value === ""){
            //show thong bao loi
            getEle(divError).innerHTML= mess;
            getEle(divError).style.display="block";
            return false;
        }else{
            getEle(divError).innerHTML="";
            getEle(divError).style.display = "none";
            return true;
        }
    }
}