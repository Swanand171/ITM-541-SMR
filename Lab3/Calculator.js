document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('tipCalculatorForm');
    const billTotalInput = document.getElementById('billTotal');
    const tipPercentageInput = document.getElementById('tipPercentage');
    const tipPercentageDisplay = document.getElementById('tipPercentageDisplay');
    const tipAmountInput = document.getElementById('tipAmount');
    const totalBillInput = document.getElementById('totalBill');
    const errorMessage = document.getElementById('errorMessage');
    const currencySelect = document.getElementById('currencySelect');

    const conversionRates = {
        USD: 1,
        INR: 84.07,
        JPY: 149.34
    };

    function calculateTip() {
        const billTotal = parseFloat(billTotalInput.value);
        const tipPercentage = parseInt(tipPercentageInput.value);
        const currency = currencySelect.value;

        // Validation
        if (isNaN(billTotal) || billTotal < 0) {
            errorMessage.textContent = 'Please enter a valid non-negative bill amount';
            tipAmountInput.value = '';
            totalBillInput.value = '';
            billTotalInput.classList.add('error-border');
            return;
        }
        errorMessage.textContent = '';
        billTotalInput.classList.remove('error-border');

        // Tip and total calculations
        const tipAmount = billTotal * (tipPercentage / 100);
        const totalBill = billTotal + tipAmount;

        // Currency conversion
        const convertedTipAmount = tipAmount * conversionRates[currency];
        const convertedTotalBill = totalBill * conversionRates[currency];

        // Display with 2 decimal places
        tipAmountInput.value = convertedTipAmount.toFixed(2);
        totalBillInput.value = convertedTotalBill.toFixed(2);
    }

    // Update tip percentage display
    tipPercentageInput.addEventListener('input', (e) => {
        tipPercentageDisplay.textContent = `${e.target.value}%`;
        calculateTip();
    });

    // Listen for changes in bill total and currency
    billTotalInput.addEventListener('input', calculateTip);
    currencySelect.addEventListener('change', calculateTip);
});
