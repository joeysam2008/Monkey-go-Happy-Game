var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodsGroup, obstaclesGroup;
var ground, score;
var survivalTime=0;
var PLAY =1;
var END =0;
var gameState;

function preload(){
  
 monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}


function setup() {
  createCanvas(600,600);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4
  ground.x = ground.width /2;
  
  obstaclesGroup = createGroup();
  foodsGroup = createGroup();
  
}


function draw() {
  background("white");
  
  var survivalTime=0;
  
  stroke("white")
  textSize(20);
  fill("white");
  text("Score:"+score,300,100);
  
  stroke("black")
  textSize(20);
  fill("black");
  survivalTime=   Math.ceil(frameCount/frameRate());
  text("Survival Time:"+survivalTime,100,50);
  
  if (ground.x < 0)
  {
      ground.x = ground.width/2;
  }
  
  if(keyDown("space"))
  {
    monkey.velocityY= -12; 
  }

  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  
  food();
  obstacles();
  
  
  drawSprites();
}

function food(){
  if(frameCount%80===0){
    var banana = createSprite(500,120,30,20);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX=-8;
    banana.lifetime = 300;
    foodsGroup.add(banana);
  }

}


function obstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(600,330,20,40);
   obstacle.velocityX = -(6 + survivalTime/100);
   obstacle.addImage(obstacleImage);
   obstacle.scale = 0.1;
   obstacle.lifetime = 300;
   
   obstacle.depth = monkey.depth;
   monkey.depth = monkey.depth + 1;
   
   obstaclesGroup.add(obstacle);
 }
}
