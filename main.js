class Laptop {
    constructor(name, price, description, featurelist, image) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.featurelist = featurelist;
        this.image = image;
    }
}
const laptopData = [
    new Laptop("Lenovo Thinkpad", 7490, "This is a good computer", ['Silver', 'I5 processor'],
        'https://www.elgiganten.se/image/dv_web_D180001002255592/31877/lenovo-thinkpad-l390-133-baerbar-dator-i58-gb-svart.jpg?$prod_all4one$'),
    new Laptop("HP Pavilion", 6990, "HP is the new in", ['Good looking', 'I5 processor'],
        'https://store.hp.com/SwedenStore/Html/Merch/Images/c06243334_500x367.jpg'),
    new Laptop("Lenovo Yoga", 7490, "Good on the go", ['Touchscreen 2 in 1 computer', 'I7 processor'],
        'https://images-na.ssl-images-amazon.com/images/I/81QOFCi7vXL._AC_SL1500_.jpg'),
    new Laptop("MacBook Pro", 34999, "Expensive but its an apple thing", ['Silver', 'Its apple'],
        'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp13touch-space-select-202005_GEO_SE?wid=892&hei=820&&qlt=80&.v=1587460171480'),];
let laptopPosition = 0;

let bankBalance = 20000;
let hasLoan = false;
let payBalance = 0;

const updateBalanceText = () => document.getElementById('textBalance').innerHTML = `Balance: ${bankBalance} kr`;
const updatePayText = () => document.getElementById('textPayBalance').innerHTML = `Pay: ${payBalance} kr`;

//IIFE, self execute to load the values to the index page
( () => {
    updateBalanceText();
    updatePayText();
    getLaptops();
    getLaptopFeatureList();
    getLaptopInfo();
})();

//Takes the user input and alerts the user with the result
function getLoan() {
    console.log("In get loan: ");

    let loanAmount = prompt("Enter amount of money you want to loan");
    let amount = Number(loanAmount);
    console.log("Amount: " + amount);
    console.log("Amount type: " + typeof amount);

    let resMessage = checkLoan(amount);
    alert(resMessage);
    updateBalanceText();
}
//Checks if the user has a loan or if the user can loan and returns a string with the result
const checkLoan = (amount) => {
    let resMessage = '';
    if (hasLoan === true)
        resMessage = 'You already have a active loan';
    else if (amount <= (bankBalance * 2) && amount > 0) {
        bankBalance += amount;
        resMessage = 'LOAN ACCEPTED';
        hasLoan = true;
    }
    else {
        resMessage = 'NOT ACCEPTED';
    }
    return resMessage;
}
//Updates payBalance by a 100
function getWork() {
    payBalance += 100;
    updatePayText();
}
//Gets the user input and display the alert with a message
function getBank() {
    let amount = prompt(`How much do you want to transfer to your bank balance? (Balance: ${payBalance} kr)`);
    let payAmountTransfer = Number(amount);
    let resMessage = checkTransfer(payAmountTransfer);
    alert(resMessage);
    updateBalanceText();
    updatePayText();
}
//Checks if the transfer is suceeded and returns a string with the result
const checkTransfer = (payAmountTransfer) => {
    let resMessage = '';

    if (payAmountTransfer <= payBalance && payAmountTransfer > 0 && (payBalance - payAmountTransfer) >= 0) {
        bankBalance += payAmountTransfer;
        payBalance = payBalance - payAmountTransfer;
        resMessage = "Transfer succeeded";
    }
    else
        resMessage = 'Not a valid input';

    return resMessage;
}
//Puts all the laptops in select
function getLaptops() {
    let optionsHTML = "";
    for (let i = 0; i < laptopData.length; i++) {
        optionsHTML += `<option value=${i}>${laptopData[i].name}</option>`;
    }
    document.getElementById('selectLaptop').innerHTML = optionsHTML
}
//Gets the selectedlaptops id
function selectedLaptop(selectObject) {
    laptopPosition = selectObject.value;
    getLaptopFeatureList();
}
 //Present the featurelist for the selected laptop
function getLaptopFeatureList() {
    let featureListHTML = "";
    const laptop = laptopData[laptopPosition];
    for (let i = 0; i < laptop.featurelist.length; i++) {
        featureListHTML += `<div>${laptop.featurelist[i]}</div>`;
    }
    document.getElementById('laptopFeatureList').innerHTML = featureListHTML;
    getLaptopInfo();
}
//Gets the laptop info
function getLaptopInfo() {
    const laptop = laptopData[laptopPosition];
    document.getElementById('laptopImage').src = laptop.image;
    document.getElementById('laptopTitle').innerHTML = laptop.name;
    document.getElementById('laptopDescription').innerHTML = laptop.description;
    document.getElementById('laptopPrice').innerHTML = laptop.price;
}
//Checks if the user can buy the laptop and alerts the user with the result
function getBuyNow() {
    const laptop = laptopData[laptopPosition];
    let message = '';
    if (laptop.price > bankBalance)
        message = "You cant afford this";
    else {
        bankBalance = bankBalance - laptop.price;
        message = "You are now the owner of this laptop!"
        hasLoan = false;
    }
    alert(message);
    updateBalanceText();
}