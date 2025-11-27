const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const result = document.getElementById("result");

// Load currencies
async function loadCurrencies() {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = await res.json();
    const currencies = Object.keys(data.rates);

    currencies.forEach(currency => {
        let option1 = document.createElement("option");
        let option2 = document.createElement("option");

        option1.value = option2.value = currency;
        option1.text = option2.text = currency;

        fromCurrency.add(option1);
        toCurrency.add(option2);
    });

    fromCurrency.value = "USD";
    toCurrency.value = "PKR";
}

loadCurrencies();

// Convert Amount
document.getElementById("convertBtn").addEventListener("click", async () => {
    const amount = document.getElementById("amount").value;

    if (amount === "" || amount <= 0) {
        alert("Enter a valid amount");
        return;
    }

    const from = fromCurrency.value;
    const to = toCurrency.value;

    const response = await fetch(`https://open.er-api.com/v6/latest/${from}`);
    const data = await response.json();

    const rate = data.rates[to];
    const converted = amount * rate;

    // Show in console
    console.log(`${amount} ${from} = ${converted.toFixed(2)} ${to}`);

    // Show on page also
    result.textContent = `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
});
