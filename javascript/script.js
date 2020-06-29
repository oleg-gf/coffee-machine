"use strict";
let btn = document.querySelector(".btn");
let p = document.querySelector(".text");
let input = document.querySelector(".user-input");

function showMessage() {
    console.log(this);
    alert("Нажалось!");
}

btn.onclick = showMessage;
console.log(p.innerHTML);
console.log(p.innerText);
p.innerHTML = "Text 2";
console.log(p.innerHTML);
p.innerHTML = "<b>Text 3</b>";
console.log(p.innerHTML);

btn.style.color = "white";
btn.style.backgroundColor = "blue";
btn.style.color = "";
// let nominal = +prompt("Введите номинал монеты (1, 2, 5, 10)")
// let message = "";


// switch(nominal) {
//   case 1:  
//     message = "Один рубль";
//     break;

//   case 2:  
//     message = "Два рубля";
//     break;
    
//   case 5:  
//     message = "Пять рублей";
//     break;

//   case 10:  
//     message = "Десять рублей";
//     break;
    
//   default:
//     message = "Неверный номинал";
//     break;
// }
// alert(message);