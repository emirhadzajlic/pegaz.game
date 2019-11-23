let canvas=document.getElementById("canvas");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let ctx=canvas.getContext("2d");

var hx=400;
var hy=300;

const horse=new Image();
horse.src="horse.png"

const trainimg=new Image();
trainimg.src="train.png"

const background=new Image();
background.src="background.jpg"


let jump = new Audio();
jump.src = "jump.mp3";

let dead = new Audio();
dead.src = "dead.mp3";

let score=0;


document.addEventListener("keydown",moveUp);

function moveUp(){
    if((event.key===" " || event.key==="ArrowUp" || event.key==="w") && hy+horse.height>=570){
        jump.play();
        hy -= 200;
    }
    
}

var trains = [];
trains[0]={
    x: canvas.width,
    y: 420
}


var gravity=5;
var l=10;

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.drawImage(background,0,0,canvas.width,canvas.height);

    for(var i=0;i<trains.length;i++){
        ctx.drawImage(trainimg,trains[i].x,trains[i].y,80,100)
         
        trains[i].x = trains[i].x-l;

       if(i%5==1){
        if(trains[i].x<=700 && trains[i].x>=690){
            trains.push({
                x: canvas.width,
                y: 420
            });
        }

       }
       else if(i%5==2 && i%5==4){
        if(trains[i].x<=900 && trains[i].x>=890){
            trains.push({
                x: canvas.width,
                y: 420
            });
        }

       }
        else if(i%5==3){
            if(trains[i].x<=950 && trains[i].x>=940){
                trains.push({
                    x: canvas.width,
                    y: 420
                });
            }

        }
        else{
            if(trains[i].x<=850 && trains[i].x>=840){
                trains.push({
                    x: canvas.width,
                    y: 420
                });
            }
        }



            if(hx + horse.width -90 >= trains[i].x && hx + 110 <= trains[i].x + trainimg.width && hy <= trains[i].y + trainimg.height &&  hy + horse.height - 90 >= trains[i].y){
                dead.play();
                alert("                                             GAME OVER!                          YOUR SCORE: "+score);
                
                    document.location.reload();  
            }

            
            if(trains[i].x>=200 && trains[i].x<=210){
                score++;
                if ((score+1)%10===0){
                    l++;
                    gravity++;
                    hy+=15
                }
            }


        if(hy + horse.height >= 585){
            hy = hy - gravity
        }
        
    
        ctx.font = "45px Changa one"
        ctx.fillStyle = "yellow";
        ctx.fillText("Sc           re:"+score,30,107);

        //ctx.font = "45px Changa one"
        ctx.font = "45px Comic Sans MS"
        ctx.fillStyle = "white";
        ctx.fillText("PEGAZ",1170,50);
    }


    ctx.drawImage(horse,hx,hy,90,90);
    

    hy += gravity;

    requestAnimationFrame(draw);
}
draw()