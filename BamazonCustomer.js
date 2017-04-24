var inquirer = require("inquirer");
var connection = require("./db.js");

connection.query("SELECT * FROM products", function(err, response) {
  	if (err) throw err;
  	for(i=0; i < response.length; i++){
  		console.log("Item ID: "+ response[i].item_id);
  		console.log("Product Name: "+ response[i].product_name);
  		console.log("Price: $"+ response[i].price + "\n");
  	}
		
		promptUser();
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
		connection.query("SELECT * FROM products WHERE ?", {
			item_id: input.idFromUser
		}, function(err, response) {
	      	if (err) throw err;
	      	console.log(response);
	      	var requestedQuantity = parseFloat(input.howMany);
	      	var stockQuantity = response[0].stock_quantity;
	      	var requestPrice = response[0].price;
	      	var stockUpdate =  stockQuantity - requestedQuantity;
	      	if(stockQuantity >= requestedQuantity){
	      		connection.query("UPDATE products SET ? WHERE ?", [{
						stock_quantity: stockUpdate
					},{
						item_id: input.idFromUser
					}], function(err, response) {});
				console.log("Your total cost is " + (requestedQuantity * requestPrice));

	      	} else {
	      		console.log("Insufficient quantity");
	      	}
	    });
	});
}


