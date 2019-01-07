

let mysql = require("mysql");
let inquirer = require("inquirer");

let connection = mysql.createConnection({
    host: "localhost" ,
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon",
});

//Connect to MySQL Database
connection.connect(function(err){
    if (err) throw err;
    console.log("Welcome to Bamazon!");
    start(); 
});

function start() {
    //Query Database To Show Product Selection
    connection.query ("SELECT * FROM products", function(err, res){
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].id + 
            "   Product: " + res[i].product_name + 
            "           Price: " + "$" + res[i].price);
        }
        shop() 
    });
}

//Item Selection
function shop() {
    inquirer.prompt([
        {
            name: "ID",
            type: "input",
            message: "Please type the ID # of the item would you like to buy?"
        }
    ]).then(answer => {
        //Checking Database
        connection.query("SELECT * FROM products", function(err, res){
            if (err) throw err;
            //ID Check Logic
            let goodID = [1,2,3,4,5,6,7,8,9,10];
            let choiceID = parseInt(answer.ID);
            chosenItem = res[choiceID - 1]; 
            //If INVALID
            if (goodID.includes(choiceID) === true) {      
                quantity(); //Ask Quantity Selection
            }
            //If Valid
            else {
                console.log("INVALID ID: Please try again");
                shop() //Ask Item Selection
            }
        })
    })
}  

//Quantity Selection
function quantity() {
    inquirer.prompt([
        {
            name: "quantity",
            input: "input",
            message: "How many?"
        }
    ]).then(quant => {
        //Stock Check Logic
       choiceQuantity = parseInt(quant.quantity);  
        //In Stock
        if (choiceQuantity <= chosenItem.stock_quantity) {
            console.log("You have selected " + chosenItem.product_name + " with a quantity of " + choiceQuantity + ".");
            console.log("Quantity: " + chosenItem.stock_quantity + " Name: " + chosenItem.product_name + " " + chosenItem.id);
            doubleCheck();
        }
        //Stock too low
        else {
            console.log("Insufficient quantity!")
            shop();
        }
    });
}   

//Product Selection Verification
function doubleCheck() {
    inquirer.prompt([
        {
            name: "verify",
            type: "list",
            message:"Are you sure?",
            choices: ["Yes", "No"]
        }
    ]).then(verify => {
        if (verify.verify === "Yes") {
            updateDB();
        }
        else {
            end();
        }
    })
}

//Continue Shopping
function end() {
    inquirer.prompt([
        {
            name: "end",
            type: "list",
            message: "Would you like to keep shopping?",
            choices: ["Yes", "No"]
        }
    ]).then(end => {
        //If Yes Restart
        if (end.end === "Yes") {
            console.log("\nGreat! Here is our selection:\n")
            start();
        }
        //If No End Connection
        else {
            console.log("Okay, thank you for looking.")
            connection.end();
        }
    })
}

//Change Quantity 
function updateDB() {
    let newQuantity = chosenItem.stock_quantity - choiceQuantity;
    //Connect To DB And Define Update
    connection.query("UPDATE products SET ? WHERE ?", [
        {
            stock_quantity: newQuantity
        },
        {
            id: chosenItem.id
        }
    ],
    //Confirm Update And Share Price Total
    function(err) {
        if (err) throw err;
        let total = chosenItem.price * choiceQuantity;
        console.log("Thank you! Your total is going to be $" + total + ".");
        end();
    })}