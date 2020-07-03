let balance = document.querySelector(".balance");
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
        window.onmousemove = null;
        if (inAtm(bill)) {
            let cost = Number(bill.getAttribute("cost"));
            console.log(balance.value, cost);
            balance.value = +balance.value + cost;
            eatBill(bill);
            //bill.remove();
        } else {
            bill.style.transform = "rotate(0deg)";
        }
        
    };
}

function eatBill(bill) {
    let cashCatcher = document.querySelector(".cash-catcher");
    cashCatcher.append(bill);
    bill.style.position = "";
    bill.style.transform = "translateY(50%) rotate(90deg)";
    setTimeout(function(){
            bill.style.transform = "translateY(-1500%) rotate(90deg)";
            
    }, 500); 
    setTimeout(function(){
            
            bill.remove();
    }, 100); 
}

function inAtm(bill) {
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
            return true;
    } else return false;
}
;
//  Take change
let changeBtn = document.querySelector(".change-btn");
let changeBox = document.querySelector(".change-box");
changeBtn.onclick = function() {
    changeBtn.innerHTML += ` ${balance.value}<span class="rub">i</span>`;
    takeChange();
    
    
};

function takeChange() {
    if (balance.value >= 10) {
        balance.value -= 10;
        createCoin2("10");
        setTimeout(function(){
            takeChange();
        }, 100); 
    } else if (balance.value >= 5) {
        balance.value -= 5;
        createCoin2("5");
        setTimeout(function(){
            takeChange();
        }, 100);
    } else if (balance.value >= 2) {
        balance.value -= 2;
        createCoin2("2");
        setTimeout(function(){
            takeChange();
        }, 100);
    } else if (balance.value >= 1) {
        balance.value -= 1;
        createCoin2("1");
        setTimeout(function(){
            takeChange();
        }, 100);
    }  
}

function createCoin(nominal) {
    let imageSrc = "";
    switch (nominal) {
        case "1":
           imageSrc = "img/1rub.png";
           break;
        case "2":
           imageSrc = "img/2rub.png";
           break;
        case "5":
           imageSrc = "img/5rub.png";
           break;
        case "10":
           imageSrc = "img/10rub.png";
           break;
    }
    let changeBox = document.querySelector(".change-box");
    changeBox.innerHTML += `<img src="${imageSrc}">`;
}
function createCoin2(nominal) {
    let coin = {
        1: "img/1rub.png",
        2: "img/2rub.png",
        5: "img/5rub.png",
        10: "img/10rub.png"
    }
    let imageSrc = coin[nominal];
    
    let changeBoxCoords = changeBox.getBoundingClientRect();
    let changeBoxWidth = changeBoxCoords.width;
    let changeBoxHeight = changeBoxCoords.height;
    console.log(changeBoxWidth, changeBoxHeight);
    
    let coinTag = document.createElement('img');
    coinTag.src = coin[nominal];
    coinTag.style.cursor = "pointer";
    coinTag.style.userSelect = "none";
    coinTag.style.width = "30px";
    coinTag.style.position = "absolute";
    coinTag.style.opacity = 0;
    coinTag.style.transform = "translateY(-75%)";
    coinTag.style.transition = "opacity .5s, transform .5s";
    coinTag.style.top = getRandomArbitrary(0, changeBoxHeight - 34) + "px";
    coinTag.style.left = getRandomArbitrary(0, changeBoxWidth - 34) + "px";
    
    setTimeout(function() {
        coinTag.style.opacity = 1;
         coinTag.style.transform = "translateY(0%)";
    }, 10);
    
    changeBox.append(coinTag);
    coinTag.onclick = function() {
        changeBox.innerHTML = ``;
        changeBtn.innerHTML = `Сдача`;
    }
    let coinDropSound = new Audio("sound/coinDrop.mp3");
    coinDropSound.volume = 0.01;
    coinDropSound.play();
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}






