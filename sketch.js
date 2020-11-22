//Naming all variables.
    var monkey , monkey_running;
    var banana ,bananaImage, obstacle, obstacleImage;
    var FoodGroup, obstacleGroup;
    var score;
    var backgroun_d , back_ground;
    var ground;

    var PLAY=1;
    var END= 0;
    var gameState = PLAY; 

function preload(){
  
//loading all images and animations.  

  
monkey_running =            loadAnimation        ("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage       =       loadImage("banana.png");
  obstaceImage      =       loadImage("obstacle.png");
  back_ground       =       loadImage("1.jpg")
  
  
  
}



function setup() {
 createCanvas(600,600)  
  
//adding monkey image and creating monkey sprite 
    monkey = createSprite(100,520,20,50);
    monkey.addAnimation("running",monkey_running);
    monkey.scale=0.2;

//creating ground sprite 
    ground = createSprite(300,575,600,30)
   
//creating groups for the obstacles and bananas(objects of the game)
    bananasGroup   = createGroup();
    obstaclesGroup = createGroup();
  
  
//defining the standard score
     score=0
}


function draw() {
//adding background image
   background(back_ground);

//displaying score text 
   text("Score: "+ score, 500,50);
  
  
  
//running the game according to the gameStates   i.e. play,end
    if(gameState===PLAY){
    
    
//creating a moving ground    
    ground.velocityX=-3;
//repeating the ground 
    ground.x=ground.width/2;
    
//making the monkey jump 
    if(keyDown("space") && monkey.y >= 400 ){
    monkey.velocityY=  -20
  
  }
    
//giving gravity to the monkey
     monkey.velocityY = monkey.velocityY + 1
  
 
    
//displaying the obstacles and bananas in the games with their properties and functions   
     spawnObstacles();
     spawnBananas();
  
    
//making the monkey feed on bananas and giving the score
    if(bananasGroup.isTouching(monkey)){
    
    score = score+2
    bananasGroup.destroyEach();
  }
  
    
//giving a condition of when we want the game to end
    if(obstaclesGroup.isTouching(monkey)){
        
        gameState = END;
        
  }
    
//defining the END gameState    
      else if (gameState === END) {
      reset();
    
    
  }

//making the monkey move on the ground
    monkey.collide(ground);

//setting a collision radius for the monkey 
    monkey.setCollider("rectangle",0,0,400,600)
  
//drawing all game sprites
    drawSprites();
  
}


  
//defining the spawn function of obstacles
    function spawnObstacles(){
     if (frameCount % 80 === 0){
       var obstacle = createSprite(600,525,10,40);
       obstacle.velocityX = -6;
       obstacle.addImage(obstaceImage);
       obstacle.scale=0.2;
       obstacle.lifetime=600;
       obstaclesGroup.add(obstacle)
       monkey.depth= obstaclesGroup.depth;
       obstacle.setCollider("circle",0,0,200)

     }
    }

  
//defining the spawn function of bananas
    function spawnBananas(){
     if (frameCount %80 === 0){

       var bananas = createSprite(600,525,10,40);
       bananas.y = Math.round(random(150,300));
       bananas.velocityX = -6;
       bananas.addImage(bananaImage);
       bananas.scale=0.1 ;
       bananas.lifetime=600;
       monkey.depth=bananas.depth+1;
       bananasGroup.add(bananas)


     }
}

  
//defining the reset function
    function reset(){
        obstaclesGroup.setVelocityXEach(0)
        bananasGroup.setVelocityXEach(0)
        ground.velocityX=0;  
        score= 0 
        obstaclesGroup.setLifetimeEach(-1);
        bananasGroup.setLifetimeEach(-1); 


    }
    }