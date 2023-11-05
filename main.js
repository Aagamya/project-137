objects=[]
status=""

function preload(){
   video=createVideo("video.mp4")
}

function setup(){
    canvas=createCanvas(480,380)
    canvas.center()
    
    video.hide()
}

function draw(){
    image(video,0,0,480,380)
    if(status!=""){
        objectDetector.detect(video,gotResults)
        for(i=0;i<objects.length;i++){
        document.getElementById("status").innerHTML="status: objects detected"
        document.getElementById("objects").innerHTML="no.of objects detected are:"+objects.length
            fill("red")
            percent =floor(objects[i].confidence*100)
            textSize(20);
            text(objects[i].label+" "+percent+"%",objects[i].x+20,objects[i].y+20)
            
            noFill()
            stroke("red")
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
        }
    }
    
}
function start(){
objectDetector=ml5.objectDetector("cocossd",modelLoaded)
document.getElementById("status").innerHTML= "status: detecting objects"


}

function modelLoaded(){
   console.log("modelLoaded") 
   status=true
   video.loop()
   video.speed(1)
   video.volume(0)
}

function gotResults(error,results){
    if(error){
        console.log(error)
    }
    else{
        console.log(results)
        objects=results
    }

    
}
