let balance = document.querySelector(".balance");
let change = balance.value;
let state = "waitig"; //"cooking", "ready"
let cup = {
    elem: document.querySelector(".cup"),
    
    changeCupImage(src) {
        let cupImage = this.elem.querySelector(".cup img");
        cupImage.src = src;
    },
    
    showCup() {
        
        cup.elem.style.display = "block";
        setTimeout(function(){
            cup.elem.style.opacity = "1";
        }, 10);
        
        state = "ready";
        cup.elem.style.transition = "opacity 5s";
    },
     
    hideCup(){
        cup.elem.style.display = "none"; 
        cup.elem.style.opacity = "0";
        
    },
    toggleActive() {
        cup.elem.classList.toggle("pointer");
    }
};

function cookCoffee(name, price, elem) {
    if (state != "waitig") {
        return;
    }
    let buttonCup = elem.querySelector("img");
    let cupSrc = buttonCup.src;
    console.log(cupSrc);
    if (balance.value >= price) {
        balance.value -= price;
        balance.style.backgroundColor = ""; // Вернуть белый фон
        changeProgress(0);
        changeDisplayText("Ваш " + name + " готовится");
        cup.changeCupImage(cupSrc);
        state = "cooking";
        startCooking();
    } else {
        changeDisplayText("Недостаточно средств");
        balance.style.backgroundColor = "rgb(255, 50, 50)"; 
    }
    console.log(name, price, balance.value);
}

function changeDisplayText(text) {
    let displayText = document.querySelector(".display-text");
    if (text.length > 25) {
        displayText.innerHTML = text.slice(0, 25) + "...";
    } else displayText.innerHTML = text;
}

function startCooking(){
    cup.showCup();
    changeProgress(100, 5);
    setTimeout(function(){
        changeDisplayText("Ваш кофе готов");
        cup.toggleActive();
        cup.elem.onclick = function() {
            takeCoffee();
            
        };
    }, 5000);
    
}
function takeCoffee() {
    changeProgress(0);
    cup.hideCup();
    changeDisplayText("Выберите кофе!");
    state = "waitig";
    cup.toggleActive();
}

let timeout = setTimeout(function(){
    changeDisplayText("Передумали заказывать?");
}, 3000);
let interval = setInterval(function(){
    changeDisplayText("Кофе: " + Date.now());
}, 4000);
setTimeout(function(){
    clearTimeout(timeout); //очищаем таймаут
    clearInterval(interval);  // очищаем интервал
    console.log("ghhhhh");
}, 1000);


function changeProgress(percent, sec = 0) {
    let  progress = document.querySelector(".progress-bar");
    progress.style.width = percent + "%";
    progress.style.transition = `width ${sec}s`;
}