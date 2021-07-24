var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
 //gameoverImg = loadImage("gameover.png")
  //spookySound = loadSound("spooky.wav");
  doorsGroup=new Group(); 
  climbersGroup=new Group();
  invisibleBlockGroup=new Group()
}

function setup() {
  createCanvas(600, 600);
 // spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost=createSprite(200,200,50,50)
  ghost.scale=0.08
  ghost.addImage("ghost",ghostImg)
}

function draw() {
  background(200);
  if(gameState==="play"){

  
  if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown("left_arrow")){
      ghost.x=ghost.x-3
    }
    if(keyDown("right_arrow")){
      ghost.x=ghost.x+3
    }if(keyDown("space")){
      ghost.velocityY=-5
    }
    ghost.velocityY=ghost.velocityY+0.8
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0
    }
    if(invisibleBlockGroup.isTouching (ghost)||ghost.y>600){
      ghost.destroy();
      gameState="end"
    }
    spawndoors();
    drawSprites();
  }
    if(gameState==="end"){
    textSize(30)
    text("gameover",230,250)
  
    }
}
  function spawndoors(){
    if(frameCount%240===0){
      var door=createSprite(200,-50)
      door.addImage(doorImg)
      door.x=Math.round(random(120,400));
      door.velocityY=1
      door.lifetime=800
      door.scale=0.5
      doorsGroup.add(door)
      var climber=createSprite(200,45)
      climber.addImage(climberImg)
      climber.velocityY=1
      climber.lifetime=800
      climber.scale=0.2
      climbersGroup.add(climber)
      climber.x=door.x;
      ghost.depth=door.depth
      ghost.depth+=1
      var invisibleBlock=createSprite(200,45)
      invisibleBlock.scale=0.2      
      invisibleBlock.width=climber.width
      invisibleBlock.height=2
      invisibleBlock.x=door.x
      invisibleBlock.velocityY=1
      invisibleBlock.debug=true
      invisibleBlockGroup.add(invisibleBlock)
    }
  }