class DonutMaker{
    constructor(){
        this.DonutCount = 0;
        this.AutoClickerCount = 0;
        this.AutoClickerCostStart = 100;
        this.AutoClickerCost;
        this.MultiplierCount = 0;
        this.MultiplierCostStart = 30;
        this.MultiplierCost;
        this.DonutsEarned = 1;
        this.AutoMakeId = undefined;
    }


    MakeDonut(){
        this.DonutCount += this.DonutsEarned;
    }

    AutoMakeDonut(){
        if (this.AutoMakeId == undefined) {
            this.AutoMakeId = setInterval(this.AutoMake, 1000);           
        } 
        this.AutoClickerCount += 1;  
        this.DonutCount -= this.AutoClickerCost;
        this.UpdateAutoClickerCost();
    }

    AutoMake = () => {
        for(let i = 1; i<= this.AutoClickerCount; i++){
            this.DonutCount += 1;
        }
    }

    MultiplyDonut(){
        this.MultiplierCount += 1;
        this.DonutCount -= this.MultiplierCost;
        this.UpdateMultiplierCost();
        this.DonutsEarned = Math.round(Math.pow(1.2, this.MultiplierCount));
    }

    UpdateAutoClickerCost(){
        if(this.AutoClickerCount == 0){
            this.AutoClickerCost = this.AutoClickerCostStart;
        }else{
            this.AutoClickerCost += .2*this.AutoClickerCost;//this raise makes more sense to me
        }
    }

    UpdateMultiplierCost(){
        if(this.MultiplierCount == 0){
            this.MultiplierCost = this.MultiplierCostStart;
        }else{
            this.MultiplierCost += .2*this.MultiplierCost;//this raise makes more sense to me
        }
    }

    Clear(){
        this.DonutCount = 0;
        this.AutoClickerCount = 0;
        this.AutoClickerCostStart = 100;
        this.AutoClickerCost;
        this.MultiplierCount = 0;
        this.MultiplierCostStart = 30;
        this.MultiplierCost;
        this.DonutsEarned = 1;
        clearInterval(this.AutoMakeId);
        this.AutoMakeId = undefined;
    }




}