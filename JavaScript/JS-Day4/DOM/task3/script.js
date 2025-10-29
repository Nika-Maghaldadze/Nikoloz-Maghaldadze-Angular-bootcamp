'use strict'

const textarea = document.getElementById("text");
const counter = document.getElementById("counter");
const submitBtn = document.getElementById("submitBtn");
const maxChars = 100;

textarea.addEventListener("input", () => {
    const length = textarea.value.length;
    counter.textContent = `Characters: ${length} / ${maxChars}`;

    if (length > maxChars) {
        counter.classList.add("exceeded");
        textarea.style.color = "red";
        submitBtn.disabled = true;
    } else {
        counter.classList.remove("exceeded");
        textarea.style.color = "black";
        submitBtn.disabled = false;
    }
});
