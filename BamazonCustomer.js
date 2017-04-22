var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "Bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  connection.query("SELECT * FROM products", function(err, response) {
	      	if (err) throw err;
	      	for(i=0; i < response.length; i++){
	      		console.log("Item ID: "+ response[i].item_id);
	      		console.log("Product Name: "+ response[i].product_name);
	      		console.log("Price: $"+ response[i].price);
	      		console.log("");
	      	}
	  		
	  		promptUser();
		});
});

function promptUser(){
	inquirer.prompt([
		{
			type: "input",
			name: "idFromUser",
			message: "Please enter the id of the product you would like to buy"
		},
		{
			type: "input",
			name: "howMany",
			message: "How many would you like to purchase?"
		}
	]).then(function(input){

	});
}

