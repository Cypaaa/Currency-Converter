const inputs = document.getElementsByTagName("input");
const selects = document.getElementsByTagName("select");

[...inputs].forEach(input => {
    input.addEventListener("focus", (e) => {
        e.target.parentElement.style.outline = "1px solid";
    });
    input.addEventListener("blur", (e) => {
        e.target.parentElement.style.outline = "none";
    });
});

fetch("https://www.floatrates.com/daily/eur.json").then(resp => {
    let loading_screen = document.getElementsByClassName("loading_screen").item(0);
    loading_screen.classList.add("fade");
    setTimeout(() => loading_screen.remove(), 350);
    return resp.json();
}).then(data => {
    let array = Object.entries(data);
    array.sort().forEach(currency => {
        let option = document.createElement("option");
        option.text = currency[1].alphaCode;
        option.value = currency[1].rate;
        option.title = currency[1].name;
        [...selects].forEach(select => {
            option.id = select.id + currency[1].alphaCode;
            select.appendChild(option.cloneNode(true));
        });
    });
    selects.item(0).value = document.getElementById("s1ARS").value;
}).catch(() => document.getElementById("loading_text").textContent = "Error while loading currency rates");

console.log(selects.item(1).value);
console.log(selects.item(0).value);

inputs.item(0).oninput = (e) => inputs.item(1).value = Math.round((e.target.value * selects.item(1).value / selects.item(0).value) * 1000) / 1000;
inputs.item(1).oninput = (e) => inputs.item(0).value = Math.round((e.target.value * selects.item(0).value / selects.item(1).value) * 1000) / 1000;