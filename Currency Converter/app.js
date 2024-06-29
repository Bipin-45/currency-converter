const BASE_URL = "https://latest.currency-api.pages.dev/v1/"



const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button")
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")

window.addEventListener("load", ()=>{
    updateExchangeRate();

})

for (let select of dropdowns) {
    for (currcode in countryList) {
        let newOption = document.createElement("option")
        newOption.innerText = currcode;
        newOption.value = currcode;
        if (select.name === "from" && currcode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currcode === "NPR") {
            newOption.selected = "selected";
        }
        select.append(newOption)

    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}



const updateFlag = (element) => {
    let currcode = element.value;
    let countryCode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;

}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updateExchangeRate();
    

})


const updateExchangeRate = async () =>{
    let amount = document.querySelector(".amount input")
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    const URL = `${BASE_URL}/currencies/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()]
    let rate2 = rate[toCurr.value.toLowerCase()];
    let finalAmount = amtVal * rate2;
    
    console.log(msg.innerText = `${amtVal} ${fromCurr.value} =${finalAmount} ${toCurr.value}`);
    msg.innerText = `${amtVal} ${fromCurr.value} =${finalAmount} ${toCurr.value}`
}

