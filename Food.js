class Food {
    constructor (){
  
        this.foodStock = foodStock;
        this.lastFed = database.ref('feedTime');
        
        this.image = loadImage("Images/Milk.png")
        //this.body=Bodies.rectangle(x,y,width,height,options);

        //World.add(world,this.body);
    }
    getFoodStock(){
        var foodStockRef = database.ref('foodStock');
        foodStockRef.on("value",(data)=>{
          foodStock = data.val();
        })
    }
    updateFoodStock(){
        database.ref('/').update({
            foodStock: foodStock
          });
    }
    deductFoodStock(x){
        if(x <= 0){
            x = 0;
        }
        else{
            x--
        }
        database.ref('/').update({
            foodStock: x
        })
    }
    display(){
        var x = 80; 
        var y = 100;

        imageMode(CENTER);
        
        if (foodStock != 0){
            for (var i = 0; i<foodStock;i++){
                if (i%10===0){
                    x = 80;
                    y = y + 50;
                }
                image(this.image,x,y,50,50);
                x = x + 30;
            }
        }
    }
  }