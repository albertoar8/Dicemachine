let diceIDCount = 0; //Used to count dice ids and ensure they remain unique
const dice = ["dice-0"]; //Stores dice arrays
const maxSides = 9999;

const rollMax = 10;
let rollCount = {};
rollCount["dice-0"] = 0;
let gotTotal = false;

function diceHTML(diceID) {
    return `
    <div id="dice-0" class="col">
    <div id="dice" align="center" class="border border-5 rounded-2"">
    <h2 id="diceTitle">D 6</h2>
    <button class="btn-close btn-close-white" style="margin:0.2rem; position:absolute; top:0; right:0;" onclick="removeDice('${diceID}')"></button><br>
    
    <label style="display: block" for="sidesDropdown">Sides:</label>
    
    <select id="sidesDropdown" onchange="dropDownChanged('${diceID}')">
        <option>2</option>
        <option>4</option>
        <option selected>6</option>
        <option>8</option>
        <option>10</option>
        <option>12</option>
        <option>20</option>
        <option>Custom</option>
    </select>
    <input id="customSides" onchange="customSidesChanged('${diceID}')" type="number" style="width:40%; display: none" value="50"></input>
    
    <h5>Result:</h5>
    <div id="resultBorder" align="center" class="justif border border-5 rounded-4 d-flex justify-content-center align-items-center" style="width:6.5rem; height:6.5rem;">
        <h5 id="result">0</h5>
    </div>
    <button id="btnRoll" class="btn btn-light" style="margin: 0.2rem" onclick="roll('${diceID}'); rollAnimStart('${diceID}'); gotTotal=false; disableAllButtons();">Roll</button>
    </div><!--Dice div-->
    </div><!--Dice col-->`
}

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