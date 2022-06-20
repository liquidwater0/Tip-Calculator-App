export default class TipCalculator {
    constructor(billInput, peopleInput, tipButtons, customTipButton, tipPerPersonTextElement, tipTotalTextElement, errorMessage) {
        this.billInput = billInput;
        this.peopleInput = peopleInput;
        this.tipButtons = tipButtons;
        this.customTipButton = customTipButton;
        this.tipPerPersonTextElement = tipPerPersonTextElement;
        this.tipTotalTextElement = tipTotalTextElement;
        this.errorMessage = errorMessage;

        this.billPrice = 0;
        this.tipPercentage = 0;
        this.numberOfPeople = 0;
    }

    checkIfValid() {
        return (
            !isNaN(this.billPrice) &&
            !isNaN(this.tipPercentage) &&
            !isNaN(this.numberOfPeople) &&
            this.billInput.value.trim() != "" &&
            this.peopleInput.value.trim() != ""
        )
    }

    hasPeople() {
        if (Number(this.peopleInput.value) > 0 || this.peopleInput.value.trim() === "") {
            this.peopleInput.parentElement.classList.remove("error");
            errorMessage.style.visibility = "hidden";
            return true;
        }
    
        if (Number(this.peopleInput.value <= 0) && this.peopleInput.value.trim() !== "") {
            this.peopleInput.value = 0;
            this.peopleInput.parentElement.classList.add("error");
            errorMessage.style.visibility = "visible";
            return false;
        }
    }

    setVariables() {
        const selectedButton = document.querySelector(".selected");

        this.billPrice = Number(this.billInput.value);
        this.tipPercentage = Number(selectedButton ? selectedButton.getAttribute("data-tip") : 0);
        this.numberOfPeople = Number(this.peopleInput.value);
    }

    setCustomTip(event) {
        const button = event.target;
        const tipAsString = button.textContent.replace("%", "");
        const tipAsNumber = Number(tipAsString) / 100;
    
        button.setAttribute("data-tip", tipAsNumber);

        if (isNaN(tipAsNumber) || tipAsString === "") {
            this.unselectAll();
            this.customTipButton.textContent = "Custom";
            return;
        }

        this.selectTip(event)

        const splitText = button.textContent.split("");
        button.textContent = `${button.textContent}${splitText[splitText.length - 1] == "%" ? "" : "%"}`;
    }

    unselectAll() {
        [...this.tipButtons, this.customTipButton].forEach(button => button.classList.remove("selected"));
    }

    selectTip({ target }) {
        this.unselectAll();
        target.classList.add("selected");
        this.setVariables();
    }

    calculate() {
        this.setVariables();

        if (!this.hasPeople() || !this.checkIfValid()) {
            this.tipPerPersonTextElement.textContent = "0.00";
            this.tipTotalTextElement.textContent = "0.00";
            return;
        }

        const tipPerPerson = (this.billPrice * this.tipPercentage) / this.numberOfPeople;
        const totalPerPerson = (this.billPrice + (this.billPrice * this.tipPercentage)) / this.numberOfPeople;

        this.tipPerPersonTextElement.textContent = tipPerPerson.toFixed(2);
        this.tipTotalTextElement.textContent = totalPerPerson.toFixed(2);
    }

    reset() {
        this.unselectAll();
        document.querySelectorAll("input").forEach(input => input.value = "");
        this.tipPerPersonTextElement.textContent = "0.00";
        this.tipTotalTextElement.textContent = "0.00";
        this.customTipButton.textContent = "Custom";
    }
}