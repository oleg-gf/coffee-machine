let balance = document.querySelector(".balance");
let change = balance.value;

function cookCoffee(name, price) {
    
    if (balance.value >= price) {
        balance.value -= price;
        balance.style.backgroundColor = ""; // Вернуть белый фон
        changeProgress(0);
        changeDisplayText("Ваш " + name + " готовится");
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
    changeProgress(100);
    setTimeout(function(){
    changeDisplayText("Ваш кофе готов")
}, 5000);
}

let timeout = setTimeout(function(){
    changeDisplayText("Передумали заказывать?")
}, 3000);
let interval = setInterval(function(){
    changeDisplayText("Кофе: " + Date.now())
}, 4000);
setTimeout(function(){
    clearTimeout(timeout); //очищаем таймаут
    clearInterval(interval);  // очищаем интервал
    console.log("ghhhhh")
}, 1000);

function changeProgress(percent) {
    let  progress = document.querySelector(".progress-bar");
    progress.style.width = percent + "%";
    progress.style.transition = "width 5s";
}