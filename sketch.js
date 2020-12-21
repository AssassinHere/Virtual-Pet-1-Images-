//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogImg, happyDogImg;
var database;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250, 275);
  dog.addImage(dogImg);
  dog.scale = 0.20;
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20);
}


function draw() {  
background(46, 139, 87);

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDogImg);
}

dog.display();
  drawSprites();
  //add styles here
  fill(255,255,254);
  stroke("black");
  text("Food Remaining : "+foodS,170,200);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}



