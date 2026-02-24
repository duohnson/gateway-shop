package methodspost

import (
	"App/src/database/connect"
	"fmt"

	"github.com/gofiber/fiber/v3"
)

func CreateProduct(c fiber.Ctx) error {
	// READ multipart/form values
	name := c.FormValue("nombre")
	if name == "" {
		return &fiber.Error{Message: "missing name", Code: 400}
	}
	category := c.FormValue("categoria")
	priceStr := c.FormValue("precio")
	img := c.FormValue("img")

	// parse price
	var price float64
	if priceStr != "" {
		fmt.Sscanf(priceStr, "%f", &price)
	}

	// default values
	brand := c.FormValue("brand")
	color := c.FormValue("color")
	quantity := 1

	_, err := connect.DB.Exec("INSERT INTO products (name,category,price,brand,color,aviable,img,quantity) VALUES (?,?,?,?,?,?,?,?);", name, category, price, brand, color, true, img, quantity)
	if err != nil {
		return &fiber.Error{Message: err.Error(), Code: 500}
	}
	return c.SendStatus(200)
}
