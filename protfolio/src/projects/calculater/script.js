function displayValue(val) {
    document.getElementById('display').value=document.getElementById('display').value+val;
}

function allclear(){
    document.getElementById('display').value="";
}

function delval(){
    document.getElementById('display').value= document.getElementById('display').value.toString().slice(0,-1);
}

function solve(){

    var userInput = document.getElementById('display').value;
    var result = eval(userInput);
 
    document.getElementById('display').value = result;
}