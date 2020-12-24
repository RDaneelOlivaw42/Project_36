class Food{
    constructor(){
        this.image = loadImage("Food Stock.png");
        this.lastFed;
        this.foodStock = 0;
        this.bedroom = loadImage("Bed Room.png");
        this.washroom = loadImage("Wash Room.png");
        this.garden = loadImage("Garden.png");
        this.livingroom = loadImage("Living Room.png");
        this.dead = loadImage("deadDog.png");
    }

    
    updateFoodStock(foodStock){
       this.foodStock = foodStock;
    }

    deductFood(){
        if(this.foodStock>0){
            this.foodStock = this.foodStock - 1;
        }
    }

    getFedTime(){
        this.lastFed = lastFed;
    }

    getFoodStock(){
        return this.foodStock;
    }

    bedRoom(){
        image(this.bedroom, 750, 300, 300, 350);
    }

    washRoom(){
        image(this.washroom, 750, 300, 300, 350);
    }

    Garden(){
        image(this.garden, 750, 300, 300, 350);
    }

    livingRoom(){
        image(this.livingroom, 750, 300, 300, 350);
    }

    Dead(){
        image(this.dead, 750, 300, 200, 150);
    }

    display(){
        var x = 80, y = 150;
        imageMode(CENTER);
        image(this.image, x, y, 100, 90);

        if(foodStock != 0){
            for(var i = 0; i < foodStock; i++){
                if(i%10 === 0){
                    x = 80;
                    y = y + 50;
                }

                image(this.image, x, y, 50, 50);
                x = x + 30;
            }
        }
    }
}