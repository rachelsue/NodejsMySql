DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (50) NULL,
    department_name VARCHAR (30) NULL,
    price DECIMAL (10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fallout 4products", "Video Games", 59.99, 50),
        ("PS4 PRO", "Video Games", 399.99, 15),
        ("Turtle Beach Headphones", "Electronics", 199.99, 50),
        ("Apocalypse Now Blue Ray", "Movies", 29.99, 83),
        ("55-inch OLED TV", "Electronics", 2199.99, 10),
        ("Overwatch", "Video Games", 29.99, 30),
        ("Cool World Blu-Ray", "Movies", 14.99, 65),
        ("Heart of Darkness", "Books", 3.99, 3),
        ("Preacher", "Books", 24.99, 10),
        ("Hardboiled", "Books", 7.69, 20);
