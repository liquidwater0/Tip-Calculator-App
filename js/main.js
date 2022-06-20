import TipCalculator from "./TipCalculator.js";

const tipButtons = document.querySelectorAll("[data-tip-button]");
const customTipButton = document.querySelector("[data-custom-tip-button]");
const resetButton = document.getElementById("resetButton");
const inputs = document.querySelectorAll(".input-container input");
const billInput = document.getElementById("billInput");
const peopleInput = document.getElementById("numberOfPeopleInput");
const tipPerPersonTextElement = document.getElementById("tipPerPersonText");
const tipTotalTextElement = document.getElementById("tipTotalText");
const errorMessage = document.getElementById("errorMessage");

const tipCalculator = new TipCalculator(
    billInput, 
    peopleInput, 
    tipButtons,
    customTipButton,
    tipPerPersonTextElement, 
    tipTotalTextElement,
    errorMessage
);

resetButton.addEventListener("click", () => tipCalculator.reset());

customTipButton.addEventListener("blur", event => {
    tipCalculator.setCustomTip(event);
    tipCalculator.calculate();
});

customTipButton.addEventListener("keydown", event => {
    if (event.key !== "Enter") return;

    tipCalculator.setCustomTip(event);
    tipCalculator.calculate();
});

tipButtons.forEach(button => {
    button.addEventListener("click", event => {
        tipCalculator.selectTip(event);
        tipCalculator.calculate();
    });
});

inputs.forEach(input => {
    input.addEventListener("input", () => tipCalculator.calculate());
});