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

//    Drag'n'drop
let bills = document.querySelectorAll(".money img");






for (let bill of bills) {
    bill.onmousedown = dragMoney;
    
}
function dragMoney(event) { // Все слушатели события возвращают в функцию первым параметром объект event
    console.log("You buttoned on bill");
    console.log([event.clientX, event.clientY]);
    console.log(this.getBoundingClientRect());
    event.preventDefault();
    let bill = this;
    let billCoords = bill.getBoundingClientRect();
    let billWidth = billCoords.width;
    let billHeight = billCoords.height;
    bill.style.position = "absolute";
    bill.style.transform = "rotate(90deg)";
        bill.style.top = event.clientY - billWidth / 2 + "px";
        bill.style.left = event.clientX - billHeight / 2 + "px";
    
    window.onmousemove = function(event) {
        let billCoords = bill.getBoundingClientRect();
        let billWidth = billCoords.width;
        let billHeight = billCoords.height;

        bill.style.top = event.clientY - billWidth / 2 + "px";
        bill.style.left = event.clientX - billHeight / 2 + "px";
        
        
        //console.log([event.clientX, event.clientY]);
    };
    
    bill.onmouseup = function() {
        inAtm(bill);
        window.onmousemove = null;
        bill.style.transform = "rotate(0deg)";
    };
}

function inAtm(bill) {
    console.log(bill);
    let atm = document.querySelector(".atm img");

    let atmCoords = atm.getBoundingClientRect();
    let atmWidth = atmCoords.width;
    let atmHeight = atmCoords.height;
    let atmLeftX =  atmCoords.x;
    let atmTopY =  atmCoords.y;
    let atmRightX = atmLeftX + atmWidth;
    let atmBottomY = atmTopY + atmHeight / 3.5;
    
    let billCoords = bill.getBoundingClientRect();
    let billWidth = billCoords.width;
    let billHeight = billCoords.height;
    let billLeftX = billCoords.x;
    let billRightX = billCoords.x + billCoords.width;
    let billY = billCoords.y;
    if (billLeftX > atmLeftX 
        && billRightX < atmRightX 
        && billY > atmTopY 
        && billY < atmBottomY) 
        {
            bill.style.display = "none";
    }
}