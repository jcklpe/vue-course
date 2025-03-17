let count = 0;
const countHeader = document.getElementById("count");
const countAddButton = document.getElementById("add");
const countSubtractButton = document.getElementById("subtract");

countHeader.innerText = count;

countAddButton.addEventListener("click", () => {
    count++;
    countHeader.innerText = count;
});

countSubtractButton.addEventListener("click", () => {
    count--;
    countHeader.innerText = count;
});