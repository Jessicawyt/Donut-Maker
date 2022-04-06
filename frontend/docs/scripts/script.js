
const donutCount = document.getElementById('donutCount');
const makeDountBtn = document.getElementById('makeDountBtn');
const autoclickerBtn = document.getElementById('autoClickerBtn');
const clickMultiplierBtn = document.getElementById('clickMultiplierBtn');
const autoClickerCost = document.getElementById('autoClickerCost');
const multiplierCost = document.getElementById('multiplierCost');
const autoClickerOwned = document.getElementById('autoClickerOwned');
const multiplierOwned = document.getElementById('multiplierOwned');
const resetBtn = document.getElementById('reset');
const canvas = document.querySelector(".canvas");
const donuts = document.querySelector(".donuts");
const img = document.getElementsByTagName('img')[0];
const bite = document.getElementById("bite");
const otherHalf = document.getElementById("other-half");
const overlap = document.querySelector(".overlap");
const TsuBtn = document.getElementById('donutColorDuringTsu');
const left = document.querySelector(".left");
const gameName = document.querySelector('h1').children;
const startBtn = document.querySelector('#startBtn');
const startTop = document.querySelector('#startTop');
const startBottom = document.getElementById('startBottom');
const autoClicker = document.querySelector('.auto-clicker');
const multiplier = document.querySelector('.multiplier');
const clickerTitle = document.querySelector('.clickerTitle');
const mulTitle = document.querySelector('.mulTitle');
const rdFact = document.getElementById('rdFact');
const factAndAuto = document.getElementsByClassName('factAndAuto')[0];
const ingredients = document.getElementsByClassName('ingredients')[0];
const ingrdAndMul = document.getElementsByClassName('ingrdAndMul')[0];






Array.prototype.forEach.call(gameName,function(e,i){
    if (i % 2 == 0) {
        e.style.animation = "skippingLogoEven 0.5s";
        e.style.animationIterationCount = "infinite";
    }else{
        e.style.animation = "skippingLogoOdd 0.5s";
        e.style.animationIterationCount = "infinite";
    }  
});

for (let i = 0; i < 3; i++) {
    let donutsImg = document.createElement('img');
    donutsImg.src = "/docs/css/images/whiteDonut.png";
    donutsImg.style.height= '20px';
    clickerTitle.style.height = '25px';
    clickerTitle.append(donutsImg);
    mulTitle.append(donutsImg.cloneNode(true));
}


let donutMaker = new DonutMaker();
let refreshId = undefined;
let autoAnimaId = undefined;
var TsunamiId = undefined;
var tsunami = undefined;
let makeDountBtnDisabled = true;
let rdFactStart = 2;

ShowStartButton();


let clickSound = new Audio();
clickSound.src = "/docs/scripts/Sound/Click.wav";
clickSound.volume = 0.03;
let startSound = new Audio();
startSound.src = "/docs/scripts/Sound/GameIntro.wav";
startSound.volume = 0.08;
let eatSound = new Audio();
eatSound.src = "/docs/scripts/Sound/EatSoundLonger.wav";
eatSound.volume = 0.03;

startBtn.addEventListener('click', StartGame);
makeDountBtn.addEventListener('click', MakeADonut);
autoclickerBtn.addEventListener('click', AutoMakeDonut);
clickMultiplierBtn.addEventListener('click', Multiply);
resetBtn.addEventListener('click', Reset);
rdFact.addEventListener('click', GetRdFact);



function StartGame(){
    autoClickerCost.textContent = donutMaker.AutoClickerCostStart;
    multiplierCost.textContent = donutMaker.MultiplierCostStart;
    autoClickerCost.style.opacity = '1';
    multiplierCost.style.opacity = '1';
    //play sound effect
    startSound.play();
    //Animate button
    //StartBtn disappear && disabled after 1.5s--------------WORKS
    startBtn.style.animation ="startDisappear 0.25s";
    startBtn.style.animationDelay = "1.25s";

    startTop.style.animation = "startTopBreaking 1.5s";
    startTop.style.animationIterationCount = "infinite";
    if(startTop.style.animationPlayState == "paused"){
        startTop.style.animationPlayState = "running";
    }
    startBottom.style.animation = "startBottomBreaking 1.5s";
    startBottom.style.animationIterationCount = "infinite";
    if(startBottom.style.animationPlayState == "paused"){
        startBottom.style.animationPlayState = "running";
    }

    // canvas.src = "/docs/css/images/blackHollowDonut.svg";

    setTimeout(function(){
        donutMaker.AutoClickerCost = donutMaker.AutoClickerCostStart;
        donutMaker.MultiplierCost = donutMaker.MultiplierCostStart;
        startBtn.style.opacity = '0';
        startBtn.disabled = true;
        startBtn.style.cursor = 'default';//
        startTop.style.animationPlayState = "paused";
        startBottom.style.animationPlayState = "paused";
        //add transition animation for buttons
        makeDountBtn.style.animation = "clickAppear .1s ease-out";
        makeDountBtn.style.opacity = '1';
        makeDountBtnDisabled = false;
    },1500); 
    //ToDo: Start Tsunami
    StartTsunami();
    //ToDo: SetInterterval for refresh numbers
    refreshId = setInterval(RefreshCount,1000);
}

function StartTsunami() {
    TsunamiId = setInterval(function(){
        if (donutMaker.DonutCount >= 50 ) {

            Popup(`I'm taking your donuts.`, '- Jessica the Baker',5000,'tr');
           
            tsunami = setInterval(function(){
                donutMaker.DonutCount -= Math.floor(donutMaker.DonutCount/25);
                TsunamiEffect(); 
            },1000);

            setTimeout(function(){
                clearInterval(tsunami);
                tsunami = undefined;
                ClearTsuEffect();
                console.log(tsunami);
            },5000);  

        }//for if

    },30000);
}

function TsunamiEffect(){
    makeDountBtn.style.animation = "tsuMotion 5s";   
    makeDountBtn.style.animationIterationCount = "infinite";
    left.style.animation = "tsuColor 10s";
    left.style.animationIterationCount = "infinite";

    
    let playPromise = eatSound.play();
    if (playPromise !== undefined) {
        playPromise.then(_ => {
            eatSound.play();
        })
        .catch(error => console.log(error));
    }
       
}

function ClearTsuEffect(){
    left.style.animation = '';
    makeDountBtn.style.animation = '';
    eatSound.pause();
}

function RefreshCount(){
    let currentCnt = Math.round(donutMaker.DonutCount);
    donutCount.value = currentCnt;   
    UpdateBtnStatus();
    if (currentCnt >= 9999) {
        donutCount.style.fontSize = '4rem';
    }
    //new achievement unlocked notification
    //animation changes accordingly
    NewAchievement(currentCnt);

}

function GetRdFact(){
    if (rdFact.style.opacity == '1') {
        GetData("https://uselessfacts.jsph.pl//random.json?language=en",data=>{
            Popup(`${data.text}`,``,10000,'br');
        });
    }
}

function NewAchievement(currentCnt){
    if (currentCnt >= 1 && currentCnt % 100 == 0) {
        
        let currentAchievement = currentCnt/100;
        GetData("https://localhost:44380/donut",data => {
            if (currentAchievement > data.length) {
                currentAchievement = 0;
            }else{
                currentAchievement--;
            }

            Popup(`New Donut Unlocked: ${data[currentAchievement].name}`,`Check out the ingredients by clicking the donut`,6000,'tr')

            canvas.src = `${data[currentAchievement].image}`;  
            ingredients.src = data[currentAchievement].image;  
            ingredients.style.opacity = '1';

            ingredients.addEventListener('click',function(){
                let ingMsg = "";
                let ingArr = [];
                Array.from(data[currentAchievement].ingredients).forEach(i=>{
                    ingArr.push(i.name);
                    ingMsg = ingArr.join(',');     
                });
                Popup(data[currentAchievement].name + ` Ingredients:`, ingMsg, 6000,'mr');
            });

            
        });
    }
}


function Popup(msgOne,msgTwo,duration,position){
    tata.text(msgOne,msgTwo, {
        position: position,
        duration: duration
    });
}

function GetData(url,callback){
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        callback(data);
    })
    .catch(err=>console.log(err))
}

function DisplayAutoClickerCost(){
    let ClickerPrc = Math.round(donutMaker.AutoClickerCost);
    autoClickerCost.textContent = ClickerPrc;
    autoClickerOwned.textContent = donutMaker.AutoClickerCount;   
}

function DisplayMultiplierCost(){
    let multiplierPrc = Math.round(donutMaker.MultiplierCost);
    multiplierCost.textContent = multiplierPrc;
    multiplierOwned.textContent = donutMaker.MultiplierCount;
    
}

function HideButtons(){
    factAndAuto.style.opacity = "0";
    ingrdAndMul.style.opacity = "0";
    multiplier.style.opacity = "0";
    autoClicker.style.opacity = "0";
    ingredients.style.opacity = '0';
    rdFact.style.opacity = '0';
}

function DisableButton(button,msg){
    button.disabled = msg; 
}



function UpdateBtnStatus(){
    if(donutMaker.DonutCount >= donutMaker.AutoClickerCost){
        // autoclickerBtn.disabled = false;
        DisableButton(autoclickerBtn,false);
        factAndAuto.style.opacity = "1";
        autoClicker.style.opacity = "1";
        autoclickerBtn.style.animation = "jumpingButtons .8s";
        autoclickerBtn.style.animationIterationCount = "1";
        clickerTitle.innerHTML = '';
        clickerTitle.textContent = "MULTIPLIER: ";
        autoclickerBtn.style.opacity = "1";
        autoclickerBtn.style.cursor = 'pointer';
    }else{
        // autoclickerBtn.disabled = true;  
        DisableButton(autoclickerBtn,true);
        autoclickerBtn.style.opacity = "0.3"; 
        autoclickerBtn.style.cursor = 'default';
    }
    if(donutMaker.DonutCount >= donutMaker.MultiplierCost){
        // clickMultiplierBtn.disabled = false;
        DisableButton(clickMultiplierBtn,false);
        ingrdAndMul.style.opacity = "1";
        multiplier.style.opacity = "1";
        multiplier.style.animation = "jumpingButtons .8s";
        multiplier.style.animationIterationCount = "1";
        mulTitle.innerHTML = '';
        mulTitle.textContent = "MULTIPLIER: ";
        overlap.style.opacity = "1";
        clickMultiplierBtn.style.cursor = 'pointer';
    }else{
        // clickMultiplierBtn.disabled = true;
        DisableButton(clickMultiplierBtn,true);
        overlap.style.opacity = "0.3";
        clickMultiplierBtn.style.cursor = 'default';
    }
    
    if(donutMaker.AutoClickerCount >= 1) {
        rdFact.style.opacity = '1';
        rdFact.style.cursor = 'pointer';
    }
}

function PrepareDonut(isAuto){
    if (isAuto == true) {
        //auto donut
        const clone = img.cloneNode(true);
        StyleDonut(clone);
    }else{
        //donut
        const clone = canvas.cloneNode(false);
        StyleDonut(clone);
    }
}

function StyleDonut(clone){
    let rdSize = Math.random()*35+26+'px';
    let rdX = Math.random()*(window.innerWidth-180)+180;
    let rdY = Math.random()*(.55*window.innerHeight)+.45*window.innerHeight;
    clone.style.display = 'block';
    clone.style.width = rdSize;
    clone.style.height = rdSize;
    clone.style.position = 'absolute';
    clone.style.left = Math.random()*500+180+"px";
    clone.style.top = Math.random()*200+150+"px";

    
    if (donuts.childElementCount <= 40) {
        donuts.appendChild(clone);
        gsap.to(clone,{rotation: 540, x:rdX, duration:6});
        gsap.to(clone,{rotation: -900, y:rdY, duration:8});
        setTimeout(function(){
            donuts.removeChild(clone);
        }, 2000);
    }    
}

function CloneDonut(){
    for (let index = 0; index < donutMaker.AutoClickerCount; index++){
        PrepareDonut(true);
    }
}

function MakeADonut(){
    if(!makeDountBtnDisabled){    
        clickSound.play();
  
        gsap.to(bite,{rotation:-6,y:bite.y-20, duration:.1});
        gsap.to(bite,{rotation:0,duration:.1});
        gsap.to(otherHalf,{rotation:8, duration:.1});
        gsap.to(otherHalf,{rotation:0, duration:.1});

        donutMaker.MakeDonut();
        RefreshCount();
        if(donutMaker.MultiplierCount == 0){
            PrepareDonut(false);
        }else{
            for (let index = 0; index < donutMaker.DonutsEarned; index++) {
                PrepareDonut(false);
            }
        }
    }
}

function AutoMakeDonut(){
    
    clickSound.play();
    donutMaker.AutoMakeDonut();
    if(autoAnimaId == undefined ){
        autoAnimaId = setInterval(CloneDonut,1000);
    }
    DisplayAutoClickerCost();
    RefreshCount();
}

function Multiply(){
    
    clickSound.play();
    donutMaker.MultiplyDonut();
    DisplayMultiplierCost();
    RefreshCount();
}

function Reset(){
    clickSound.play();
    clearInterval(autoAnimaId);
    clearInterval(TsunamiId);
    clearInterval(refreshId);
    autoAnimaId = undefined;
    TsunamiId = undefined;
    refreshId = undefined;
    ShowStartButton();
    donutMaker.Clear();
    DisplayAutoClickerCost();
    DisplayMultiplierCost();
    RefreshCount();

    makeDountBtn.style.opacity = '0';
    makeDountBtnDisabled = true;
    HideButtons();
    autoClickerCost.textContent = donutMaker.AutoClickerCostStart;
    multiplierCost.textContent = donutMaker.MultiplierCostStart;

    canvas.src = "/docs/css/images/default.png";
}

function ShowStartButton(){
    startBtn.disabled = false;
    startBtn.style.opacity = '1';
    startBtn.style.animation ="startBtnJumping .8s infinite";
    startBtn.style.cursor = 'pointer';
}

