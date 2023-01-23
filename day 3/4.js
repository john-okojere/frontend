//---------------5--------------------
function fibonacci() {
    nums4 = []
    var prev = 0, pres = 1, fibonacci = 0;
    for(var i = 1; i < 19; i++) {
        fibonacci = prev + pres;
        prev = pres;
        pres = fibonacci;
        if(pres < 20){
            nums4.push(pres)
        }
    }
    alert(nums4)

}
fibonacci()