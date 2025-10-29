'use strict'

const text = document.getElementById("modifyText");
const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        text.style.color = button.id;
    });
});
