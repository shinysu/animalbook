let staticAnimals = ['deer', 'elephant', 'frog', 'kangaroo', 'lion', 'zebra'];
let movingAnimals = ['cat', 'dog'];
let frameID;
input = document.getElementById("msg_input")
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("button").click();
  }
});

function display_animal(){
    animalName = document.getElementById("msg_input").value.toLowerCase().trim().split(" ")[0];
    console.log(animalName);
    document.getElementById("msg_input").value = "";
    if (frameID){
        window.cancelAnimationFrame(frameID);
    }
    if (staticAnimals.includes(animalName)){
        displayImage(animalName)
    }
    else if(movingAnimals.includes(animalName)){
        animateAnimal(animalName)
    }
    else{
        displayNotFound(animalName)
    }
}

function animateAnimal(animalName){
    let image = new Image();
    image.src = "images/"+animalName+".png";
    image.onload = function(){
        let canvas = document.getElementById("myCanvas");
        let context = canvas.getContext("2d");
        window.addEventListener('resize', resizeCanvas, false);
        window.addEventListener('orientationchange', resizeCanvas, false);
        resizeCanvas(canvas)
        context.fillStyle = '#f8f8f8';
        context.fillRect(0, 0, canvas.width, canvas.height);
        animateImage(canvas, context, image)
    }
}

function displayImage(animalName){
    let image = new Image();
    image.src = "images/"+animalName+".jpg";
    image.onload = function(){
        let canvas = document.getElementById("myCanvas");
        let context = canvas.getContext("2d");
        window.addEventListener('resize', resizeCanvas, false);
        window.addEventListener('orientationchange', resizeCanvas, false);
        resizeCanvas(canvas)
        context.fillStyle = '#f8f8f8';
        context.fillRect(0, 0, canvas.width, canvas.height);
        showImage(canvas, context, image)
    }
    console.log(animalName);
}

function displayNotFound(animalName){
    let canvas = document.getElementById("myCanvas");
    let context = canvas.getContext("2d");
    window.addEventListener('resize', resizeCanvas, false);
    window.addEventListener('orientationchange', resizeCanvas, false);
    resizeCanvas(canvas)
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "40px Arial";
    context.fillStyle = "#337ab7";
    text = animalName.charAt(0).toUpperCase() + animalName.substring(1, animalName.length) + " is not found"
    context.fillText(text, 10, 50);
}

function resizeCanvas(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function showImage(canvas, context, image){
    
    var hratio = canvas.width / image.width    ;
    var vratio = canvas.height / image.height  ;
    let ratio = Math.min(hratio, vratio)
    var centerShiftX = ( canvas.width - image.width*ratio ) / 2;
    var centerShiftY = ( canvas.height - image.height*ratio ) / 2; 
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, image.width, image.height, centerShiftX, centerShiftY, image.width*ratio, image.height*ratio);
  }

  function animateImage(canvas, context, image){
    let counter = 0;
    rows = 3
    cols = 3
    frame_width = image.width / rows;
    frame_height = image.height / cols;
    totalFrames = canvas.width / frame_width;
    window.requestAnimationFrame(animate);
    function animate() {
        let framex = Math.floor(counter % rows);
        let framey = 0;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, framex * frame_width, framey * frame_width, frame_width, frame_height, counter * 10, 0, frame_width, frame_height);
        counter = counter + .10;
        if (counter > (canvas.width-frame_width)/10) counter = 0;
        frameID = window.requestAnimationFrame(animate);
    }
  }