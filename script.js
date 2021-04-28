let animals = ['deer', 'elephant', 'frog', 'kangaroo', 'lion', 'zebra']

function display_animal(){
    animalName = document.getElementById("msg_input").value.toLowerCase().trim();
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
    window.addEventListener('resize', resizeCanvas, false);
    window.addEventListener('orientationchange', resizeCanvas, false);
    resizeCanvas(canvas)
    context.fillStyle = '#f8f8f8';
    context.fillRect(0, 0, canvas.width, canvas.height);
    var hratio = canvas.width / image.width    ;
    var vratio = canvas.height / image.height  ;
    var centerShiftX = ( canvas.width - image.width*hratio ) / 2;
    var centerShiftY = ( canvas.height - image.height*vratio ) / 2; 
    context.drawImage(image, 0, 0, image.width, image.height, centerShiftX, centerShiftY, image.width*hratio, image.height*vratio);
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

function resizeCanvas(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }