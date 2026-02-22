package querys

var CreateTableOfTest = `CREATE TABLE IF NOT EXISTS tests (
	id INTEGER,
	name VARCHAR(20)
	);`
var CreateTableOfProducts = `CREATE TABLE IF NOT EXISTS products (
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(20),
	class VARCHAR(20),
	price FLOAT NOT NULL,
	quantity INT NOT NULL,
	brand VARCHAR(20) NOT NULL,
	color VARCHAR(10) NOT NULL,
	aviable BOOL NOT NULL,
	img TEXT NOT NULL
	);`
