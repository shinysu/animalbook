let animals = ['deer', 'elephant', 'frog', 'kangaroo', 'lion', 'zebra']

input = document.getElementById("msg_input")
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("btn_send").click();
  }
});

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

  function runSpeechRecognition() {
   // var output = document.getElementById("output");
    //var action = document.getElementById("action");
    // new speech recognition object
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();

    // This runs when the speech recognition service starts
    recognition.onstart = function() {
        document.getElementById('btn_voice').style.backgroundColor = '#67c067';
        document.getElementById("msg_input").value = "listening...";
     //   action.innerHTML = "<small>listening, please speak...</small>";
    };
    
    recognition.onspeechend = function() {
    //    action.innerHTML = "<small>stopped listening, hope you are done...</small>";
        recognition.stop();
        document.getElementById('btn_voice').style.backgroundColor = '#ffffff';
        
    }
  
    recognition.onresult = function(event) {
        var animalName = event.results[0][0].transcript.toLowerCase().trim();
        document.getElementById("msg_input").value = animalName;
        setTimeout(function(){
            document.getElementById("msg_input").value = '';
        }, 3000);
       // var confidence = event.results[0][0].confidence;
        console.log(animalName);
     //   output.classList.remove("hide");
     if (animals.includes(animalName)){
        displayImage(animalName)
    }
    else{
        displayNotFound(animalName)
    }
    };
  
    recognition.start();
}