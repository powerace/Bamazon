var inquirer = require("inquirer");
var connection = require("./db.js");

inquirer.prompt([
	{
		type: "list",
		name: "task",
		message: "Choose a task",
		choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
	}
]).then(function(input){
	if(input.task === "View Products for Sale"){
		connection.query("SELECT * FROM products", function(err, response) {
		  	if (err) throw err;
		  	for(i=0; i < response.length; i++){
		  		console.log("Item ID: "+ response[i].item_id);
		  		console.log("Product Name: "+ response[i].product_name);
		  		console.log("Price: $"+ response[i].price);
		  		console.log("Quantity: "+ response[i].stock_quantity + "\n");
		  	}
		});
	}
	if(input.task === "View Low Inventory"){
		connection.query("SELECT * FROM products WHERE stock_quantity <= ?", [5], function(err, response) {
	      	if (err) throw err;
	      	for(i=0; i < response.length; i++){
		  		console.log("Item ID: "+ response[i].item_id + "\n");
		  	}    
	      	
	    });
	}
	if(input.task === "Add to Inventory"){
		inquirer.prompt([
			{
				type: "input",
				name: "idFromUser",
				message: "Please enter the id of the product you would like to add"
			},
			{
				type: "input",
				name: "howMany",
				message: "How many would you like to add?"
			}
		]).then(function(input){
			var requestedQuantity = parseFloat(input.howMany);
	      	var stockQuantity = response[0].stock_quantity;
	      	var stockUpdate =  stockQuantity + requestedQuantity;

			connection.query("UPDATE products SET ? WHERE ?", [{
				stock_quantity: stockUpdate
			},{
				item_id: input.idFromUser
			}], function(err, response) {});
			console.log("You've increased the inventory of " + response[0].product_name + " from " + stockQuantity + " to " + stockUpdate);
		});
	}
	if(input.task === "Add New Product"){
		inquirer.prompt([
			{
				type: "input",
				name: "productName",
				message: "Please enter the name of the new product"
			},
			{
				type: "input",
				name: "howMany",
				message: "How many would you like to add?"
			},
			{
				type: "input",
				name: "department",
				message: "Which department?"
			},
			{
				type: "input",
				name: "price",
				message: "What is the price?"
			}
		]).then(function(input){

			connection.query("INSERT INTO products SET ?", {
			  product_name: input.productName,
			  price: input.price,
			  stock_quantity: input.howMany,
			  department_name: input.department
			}, function(err, res) {});
		});

	
	}
});