let diceIDCount = 0; //Used to count dice ids and ensure they remain unique
const dice = ["Dice-0"]; //Stores dice arrays
const maxSides = 9999;
//let dicehtml = document.querySelector(`#${_id}`);

const rollMax = 10;
let rollCount = {};
rollCount["Dice-0"] = 0;
let gotTotal = false;

function getRoll(_sides){
  let dice = Math.random() * _sides; // selected dice number
  dice = Math.round(dice);
  console.log("Hi This is the dice result:  " + dice);
    return dice;
//   let result = document.getElementById("result");
//   result.innerHTML = dice;
}

function printResult(_id) {


    let diceCol = document.querySelector(`#${_id}`);
    let sides = diceCol.querySelector("#sidesDropdown").value;

    if (sides == "Custom"){ //Get custom value from custom value input?
        sides = diceCol.querySelector("#customSides").value;
    }

    let roll = getRoll(sides);
    diceCol.querySelector("#result").innerHTML = roll;
    
    

    return roll;
}

//dicehtml.querySelector("#result").innerHTML = 4;
function addDice(){
    let diceID = `Dice-${++diceIDCount}`;
    rollCount[diceID] = 0;
    
    const diceDiv = document.createElement("div");
    diceDiv.className = "col";
    diceDiv.id = diceID;
    
    diceDiv.innerHTML = diceHTML(diceID);

    var diceContainer = document.getElementById("diceGrid");
    diceContainer.appendChild(diceDiv);

    dice.push(diceID);
}

function diceHTML(diceID) {
    console.log(diceID);
    return `
    <div id="${diceID}" class="col row-cols-auto g-1 justify-content-center" style="margin-bottom: 1rem; border-color: black; background-color: orange;">
              <div class="row row-cols-auto g-1 justify-content-center">
                <h5 id="${diceID}">${diceID}</h5> 
              </div>
              <div class="row row-cols-auto g-1 justify-content-center">
                <label>Choose Dice:</label>
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
              </div>
                <div class="row row-cols-auto g-1 justify-content-center">
                    <input id="customSides" onchange="customSidesChanged('${diceID}')" type="number" style="width:40%; display: none" value="50"></input>
                    <button id="btnRollDice" class="btn btn-danger" onClick="printResult('${diceID}')">Roll</button>  
                </div>       
                <div class="row row-cols-auto g-1 justify-content-center">
                  <h5>Result:</h5> 
                </div>
                <div class="row row-cols-auto g-1 justify-content-center">
                  <h5 id="result">0</h5>
                </div>`
}