let animals = ['deer', 'elephant', 'frog', 'kangaroo', 'lion', 'zebra']

function display_animal(){
    animalName = document.getElementById("msg_input").value.toLowerCase();
    document.getElementById("msg_input").value = "";
    if (animals.includes(animalName)){
        displayImage(animalName)
    }
    else{
        displayNotFound(animalName)
    }
}

function displayImage(animalName){
    let image = new Image();
    image.src = "images/"+animalName+".jpg";
    image.onload = function(){
        fillImageInCanvas(image)
    }
    console.log(animalName);
}

function fillImageInCanvas(image){
    let canvas = document.getElementById("myCanvas");
    let context = canvas.getContext("2d");
    context.fillStyle = '#f8f8f8';
    context.fillRect(0, 0, canvas.width, canvas.height);
    var hRatio = canvas.width / image.width    ;
    var vRatio = canvas.height / image.height  ;
    var ratio  = Math.min ( hRatio, vRatio );
    var centerShiftX = ( canvas.width - image.width*ratio ) / 2;
    var centerShiftY = ( canvas.height - image.height*ratio ) / 2;  
    context.drawImage(image, 0, 0, image.width, image.height, centerShiftX, centerShiftY, image.width*ratio, image.height*ratio);
}

function displayNotFound(animalName){
    let canvas = document.getElementById("myCanvas");
    let context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "30px Arial";
    context.fillStyle = "#337ab7";
    text = animalName.charAt(0).toUpperCase() + animalName.substring(1, animalName.length) + " is not found"
    context.fillText(text, 10, 50);
}