function opensearch() {
    if (document.getElementById('search-input').style.display == "block") {
        document.getElementById('search-input').style.display= "none";
    document.getElementById('search-input').style.width= "0";
    document.getElementById('sign-text').style.display= "inline-block";
    }
    else{
    document.getElementById('search-input').style.display= "block";
    document.getElementById('search-input').style.width= "max-content";
    document.getElementById('sign-text').style.display= "none";
    }
}
function signin(){
    window.location.replace("signin.html");
}
function opentab(i) {
    var id = 'items-'+ i;
    var item = document.getElementById(id);
        console.log(item)
    if (item.style.display == 'none') {
        item.style.display = 'block';
    }else{
        item.style.display = 'none';
    }
    
}