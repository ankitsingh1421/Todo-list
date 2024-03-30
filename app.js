
function clearing() {
    document.getElementById('title').value = "";
    document.getElementById('description').value = ""; 
}
function getAndUpdate() {
console.log("Updating List...");
var tit = document.getElementById('title').value;
var desc = document.getElementById('description').value;
if (localStorage.getItem('itemsJson') == null) {
itemJsonArray = [];
itemJsonArray.push([tit, desc]);
localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
} else {
itemJsonArrayStr = localStorage.getItem('itemsJson')
itemJsonArray = JSON.parse(itemJsonArrayStr);
itemJsonArray.push([tit, desc]);
localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
}

update();
clearing();
}

function update() {

if (localStorage.getItem('itemsJson') == null) {
itemJsonArray = [];
localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
} else {
itemJsonArrayStr = localStorage.getItem('itemsJson')
itemJsonArray = JSON.parse(itemJsonArrayStr);
}
// Populate the table
let tableBody = document.getElementById("tableBody");
let str = "";
itemJsonArray.forEach((element, index) => {
str += `
    <tr>
        <th scope="row">${index + 1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td> 
        <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Delete</button></td> 
    </tr>`;
});
tableBody.innerHTML = str;
}

var add = document.getElementById("add");
add.addEventListener("click", getAndUpdate);
update();

function deleted(itemIndex) {
console.log("Delete", itemIndex);
itemJsonArrayStr = localStorage.getItem('itemsJson')
itemJsonArray = JSON.parse(itemJsonArrayStr);
// Delete itemIndex element from the array
itemJsonArray.splice(itemIndex, 1);
localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
update();
}

function clearStorage() {
if (confirm("Do you really want to clear?")) {
console.log('Clearing the storage')
localStorage.clear();
update();
}
}

var clearButton = document.getElementById("clear");
clearButton.addEventListener("click", clearStorage);

var mybutton = document.getElementById('btn');
var myheading = document.getElementById('h3');

function SetUserName() {
var myName = window.prompt("Enter your name:");
if (myName !== null && myName !== "") {
localStorage.setItem('name', myName);
myheading.textContent = myName + '\'s';
} else {
myheading.textContent = "Enter Name";
}
}

if (!localStorage.getItem('name')) {
SetUserName();
} else {
var storedName = localStorage.getItem('name');
myheading.textContent = storedName + '\'s';
}

mybutton.onclick = function() {
SetUserName();
}
document.getElementById("h3").addEventListener("click",SetUserName)

