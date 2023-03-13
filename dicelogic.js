let diceIDCount = 0; //Used to count dice ids and ensure they remain unique
const dice = ["dice-0"]; //Stores dice arrays
const maxSides = 9999;

const rollMax = 10;
let rollCount = {};
rollCount["dice-0"] = 0;
let gotTotal = false;

printResult();
function printResult(){
    let dice = Math.random()*6; //dice of 6 sides
    dice = Math.round(dice);
    console.log("Hi This is the dice result:  "+dice);
}
/*
function disableAllButtons(){
    document.getElementById("btnRollAll").disabled = true;
    document.getElementById("btnAddDice").disabled = true;

    let diceCount = dice.length;
    for (let i = 0; i < diceCount; i ++){
        let _id = dice[i];
        let diceCol = document.querySelector(`#${_id}`);
        diceCol.querySelector("#btnRoll").disabled = true;
    }
}
function enableAllButtons(){
    document.getElementById("btnRollAll").disabled = false;
    document.getElementById("btnAddDice").disabled = false;

    let diceCount = dice.length;
    for (let i = 0; i < diceCount; i ++){
        let _id = dice[i];
        let diceCol = document.querySelector(`#${_id}`);
        diceCol.querySelector("#btnRoll").disabled = false;
    }
}

function getRoll(_sides){
    return Math.floor(Math.random() * _sides) + 1;
}

function rollAnimStart(_id){
    let diceCol = document.querySelector(`#${_id}`);
    let resultBorder = diceCol.querySelector("#resultBorder");
    resultBorder.classList.remove('diceSpin'); // reset animation
    resultBorder.offsetWidth; // trigger reflow
    resultBorder.classList.add('diceSpin'); // start animation
}

function roll(_id){
    let diceCol = document.querySelector(`#${_id}`);
    let sides = diceCol.querySelector("#sidesDropdown").value;

    if (sides == "Custom"){ //Get custom value from custom value input?
        sides = diceCol.querySelector("#customSides").value;
    }

    let roll = getRoll(sides);
    diceCol.querySelector("#result").innerHTML = roll;
    
    if (rollCount[_id] < rollMax){
        repeatRoll(_id);
        rollCount[_id] ++;
    }
    else{
        if (!gotTotal){
            enableAllButtons();
            setTimeout(getTotal, 10);
            gotTotal = true;
        }
        rollCount[_id] = 0;
    }

    return roll;
}

function repeatRoll(_id){
    setTimeout(roll, 100, _id);
}

function rollAll(){
    let diceCount = dice.length;
    let total = 0;
    for (let i = 0; i < diceCount; i ++){
        rollAnimStart(dice[i]);
        total += roll(dice[i]);
    }
}

function getTotal(){
    let diceCount = dice.length;
    let total = 0;
    for (let i = 0; i < diceCount; i ++){
        let _id = dice[i];
        let diceCol = document.querySelector(`#${_id}`);
        let value = Number(diceCol.querySelector("#result").innerHTML);
        total += value;
    }
    document.getElementById("totalRoll").innerHTML = `Total: ${total}`;
}

function addDice(){
    let diceID = `dice-${++diceIDCount}`;
    rollCount[diceID] = 0;

    const diceDiv = document.createElement("div");
    diceDiv.className = "col";
    diceDiv.id = diceID;
    
    diceDiv.innerHTML = diceHTML(diceID);

    var diceContainer = document.getElementById("diceGrid");
    diceContainer.appendChild(diceDiv);

    dice.push(diceID);
}

function removeDice(_id){
    document.querySelector(`#${_id}`).remove();
    let index = dice.indexOf(_id); //Find index of this dice id in array
    dice.splice(index, 1); //Remove the dice id from the array
}

function dropDownChanged(_id){
    let diceCol = document.querySelector(`#${_id}`);
    let diceTitle = diceCol.querySelector("#diceTitle");
    let diceDropDown = diceCol.querySelector("#sidesDropdown");
    let diceCustomInput = diceCol.querySelector("#customSides");

    if (diceDropDown.value == "Custom"){
        diceTitle.innerHTML = `D ${diceCustomInput.value}`;
        diceCustomInput.style.display = "inline";
    }
    else{
        diceTitle.innerHTML = `D ${diceDropDown.value}`;
        diceCustomInput.style.display = "none";
    }
}
// Validate the sides selection
function customSidesChanged(_id){
    let diceCol = document.querySelector(`#${_id}`);
    let sides = diceCol.querySelector("#customSides").value;
    let diceTitle = diceCol.querySelector("#diceTitle");

    sides = Math.floor(sides);
    if (sides < 2){
        sides = 2;
    }
    else if (sides > maxSides){
        sides = maxSides;
    }
    diceCol.querySelector("#customSides").value = sides;
    diceTitle.innerHTML = `D ${sides}`;
}
*/