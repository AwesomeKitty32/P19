var PLAY=1;
var END=0;
var gameState=PLAY;

var ninja, ninja_running, ninja_collided;
var ground, groundImage
var ground, invisibleGround, groundImage;

var obstaclesGroup, obstacle1, obstacle2, obstacle3;
var backgroundImg;

var score;
var gameOver,restart;

function preload(){
    ninja_running = loadAnimation("run1.png","run2.png","run3.png","run4.png","run5.png");
    groundImage = loadImage("ground.png");

    backgroundImg = loadImage("background.jpg");

    obstacle1= loadImage("obstacle1.png");
    obstacle2= loadImage("obstacle2.png");
    obstacle3= loadImage("obstacle3.png");

    gameOverImage=loadImage("GameOver.png");
    restartImage=loadImage("restart.png");
}

function setup() {
    createCanvas(windowWidth,windowHeight);

    ninja = createSprite(50, 160, 20, 50);
    ninja.addAnimation("running", ninja_running);
    ninja.scale = 0.5;

    ground=createSprite(200,700,400,20);
    ground.addImage(groundImage);

    edges = createEdgeSprites();

    ground.x = ground.width /2;
    ground.velocityX = -4;

    gameOver=createSprite(300,100);
    gameOver.addImage(gameOverImage);
    gameOver.scale=0.5;

    restart=createSprite(300,140);
    restart.addImage(restartImage);
    restart.scale=0.5;


    invisibleGround=createSprite(200,700,400,10);
    invisibleGround.visible=false;

    obstaclesGroup = new Group();

    console.log("Hello" + 5);

    ninja.setCollider("circle",0,0,40);
    ninja.debug=true;
  
    score = 0;
}


function draw(){
    background(backgroundImg);
    textSize(20);
    fill("red");
    text("Score:"+score,500,50);

    if(gameState === PLAY){
        gameOver.visible=false;
        restart.visible=false;

        ground.velocityX = -4;

        score=score+Math.round(frameCount/60);

        if (ground.x < 0){
            ground.x = ground.width/2;
          }

          if(keyDown("space")&& ninja.y >= 100) {
            ninja.velocityY = -10;
          }

          ninja.velocityY = ninja.velocityY + 0.8

          spawnObstacles();

        if(obstaclesGroup.isTouching(ninja)){
            gameState=END;
        }
    else if(gameState === END){
        gameOver.visible=true;
        restart.visible=true;
        ground.velocityX = 0;
        ninja.velocityY = 0;

        ninja.changeAnimation("collided",ninja_collided);

        obstaclesGroup.setLifetimeEach(-1);

        obstaclesGroup.setVelocityXEach(0);
    }
 

      ninja.collide(invisibleGround);

      
      drawSprites();
}  
    }

    function spawnObstacles(){
        if(frameCount % 60 === 0){
          var obstacle=createSprite(600,700,10,40);
          obstacle.velocityX= -6;
      
          var rand= Math.round(random(1,6));
          switch(rand){
            case 1: obstacle.addImage(obstacle1);
                    break;
            case 2: obstacle.addImage(obstacle2);
                    break;
            case 3: obstacle.addImage(obstacle3);
                    break;
            default: break;
          }
      
          obstacle.scale=0.35;
          obstacle.lifetime=100;

          obstaclesGroup.add(obstacle);
        }
    }

    function reset(){
        gameState = PLAY;
        gameOver.visible = false;
        restart.visible = false;
        
        obstaclesGroup.destroyEach();
        
        ninja.changeAnimation("running",ninja_running);
        
        score = 0;
        
      }