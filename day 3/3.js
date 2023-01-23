//------------2----------------------
var nums2 = []
var sumofodd = 0;

function send() {
    var allnums = parseInt(document.getElementById('number').value);
    nums2.push(allnums);
    if (allnums % 2 != 0) {
        sumofodd += allnums
    }
    console.log(sumofodd)
    document.getElementById('sumOfodd').innerHTML= '<span id="sumOfodd">'+ sumofodd + '</span>';
    console.log(allnums)
    console.log(nums2)
    document.getElementById('number').innerText= "";
}

