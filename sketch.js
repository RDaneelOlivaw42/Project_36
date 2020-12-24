var dog, happyDog, foodS, foodStock;
var database;
var feedPet, addFood, foodObj;
var fedTime, lastFed;
var bedImg, gardenImg, washroomImg;
var readState, gameState;
var currentTime, sadDogImg;

function preload()
{
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png");
  bedImg = loadImage("Bed Room.png");
  gardenImg = loadImage("Garden.png");
  washroomImg = loadImage("Wash Room.png");
  sadDogImg = loadImage("Lazy.png");
}

function setup() {
  createCanvas(1000, 500);
  database = firebase.database();
  
  dog = createSprite(750, 300, 10, 10);
  dog.addImage(dogImg);
  dog.scale = 0.3;

  foodStock = database.ref('food');
  foodStock.on("value", readStock, showError);

  feedPet = createButton('Feed Pet');
  feedPet.position(760, 90);
  feedPet.mousePressed(feedDog);

  addFood = createButton('Add Food');
  addFood.position(650, 90);
  addFood.mousePressed(addFoodS);

  foodObj = new Food();

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  })

  readState = database.ref('gameState');
  readState.on("value", function(data){
    gameState = data.val();
  })
}

function draw() {  
background(46, 139, 87);

  drawSprites();

  fill("white");
  textSize(15);
  stroke("white");
  text("Food Remaining : "+foodS, 600, 55);

  foodObj.display();

  //lastFed
  if(lastFed >= 12){
    text("Last Feed: " + lastFed%12 + " P.M.", 250, 55);
  } 
  else if(lastFed === 0){
    text("Last Feed: 12 A.M.", 250, 55);
  }
  else{
    text("Last Feed: " + lastFed + " A.M.", 250, 55);
  }

  currentTime = hour();

  //states
  if(currentTime === (lastFed+1)){
    update("Playing");
    foodObj.Garden();
  }
  else if(currentTime === (lastFed+2)){
    update("Sleeping");
    foodObj.bedRoom();
  }
  else if(currentTime > (lastFed+2) && currentTime <= (lastFed+4)){
    update("Bathing");
    foodObj.washRoom();
  }
  else if(currentTime > (lastFed+5)){
    update("Waiting");
    foodObj.livingRoom();
  }
  else if(currentTime > (lastFed+22)){
    update("Dead");
    foodObj.Dead();
  }
  else{
    update("Hungry");
    foodObj.display();
  }

  if(gameState != "Hungry"){
    feedPet.hide();
    addFood.hide();
  }
  /*else if(gameState === "Hungry"){
    feedPet.show();
    addFood.show();
    dog.addImage(sadDogImg);
  }*/

}

function readStock(data){
  foodS = data.val();
}

function showError(){
  console.log("error");
}

function feedDog(){
  //writeStock(foodS);
  dog.addImage(happyDogImg);

  foodObj.updateFoodStock(foodS-1);
  database.ref('/').update({
    food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function addFoodS(){
  foodS++;
  dog.addImage(dogImg);
  database.ref('/').update({
    food: foodS
  })
}

function update(state){
  database.ref('/').update({
    gameState: state
  })
}