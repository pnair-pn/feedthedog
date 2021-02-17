var dog,sadDog,happyDog, database, fedTime, lastFed, foodStock;
var feedButton, addButton, foodObj;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  var canvas = createCanvas(1000,400);
  database = firebase.database();
  fedTime = database.ref('feedTime')
  fedTime.on("value",(data)=>{
    lastFed = data.val();
  })
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  foodObj = new Food();
  //foodObj.addImage(foodImage);

  var nameInput = createInput("Name The Dog");
  nameInput.position(900,400)

  feedButton = createButton("Feed The Dog");
  feedButton.position(700,95);
  feedButton.mousePressed(feedDog)

  addButton = createButton("Add Food");
  addButton.position(800,95);
  addButton.mousePressed(addFood);
}

function draw() {
  background(46,139,87);
  fill(0);
  if(lastFed>=12) { 
    text("Last Fed: "+lastFed%12+" PM", 10, 30); } 
    else if(lastFed===0) { 
  text("Last Fed: Never", 10, 30); } 
  else { text("Last Fed: "+lastFed + " AM", 10, 30); } 

  foodObj.display();
  foodObj.getFoodStock();
  drawSprites();
    }


//function to read food Stock
function feedDog(){
  dog.addImage(happyDog);

  foodObj.deductFoodStock(foodStock);
  database.ref("/").update({
    foodStock: foodStock,
    feedTime: hour()
  })
  
  }




//function to add food in stock
function addFood(){
  foodStock++;
  database.ref('/').update({
    foodStock: foodStock
  })
}