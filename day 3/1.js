 //--------------1---------------

 function sum() {
    var nums1 = []
    var sum = 0;

    for (let i = 0; i < 50; i++) {
        var num = prompt("input 50 number");
        var value = parseInt(num);
        nums1.push(value)
    }
    for (let i = 0; i < nums1.length; i++) {
        if ( nums1[i] > 50 ) {
            sum += nums1[i]
        }else{
            continue
        }
    }
    alert( 'The sum of number greater than 50 is '+sum)
}

sum()