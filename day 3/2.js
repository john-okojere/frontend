
//-------------------3--------------

function Odd(nums3) {
    var sum = 0;
    for (let i = 0; i < nums3.length; i++) {
        if (nums3[i] % 2 == 0){
            sum += nums3[i]
        }
    }
    alert('The sum of the odd numbers is '+ sum)
}

nums3 = [20,13,4,63,43,25,4620,13,4,63,43,25,4620,13,4,63,43,25]

Odd(nums3)