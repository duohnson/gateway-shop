package methodspost

import (
	"App/src/database/connect"
	"App/src/models"

	"github.com/gofiber/fiber/v3"
)

func CreateProduct(c fiber.Ctx) error {
	data := new(models.NewProduct)
	err := c.Bind().Body(data)
	if err != nil {
		return &fiber.Error{Message: err.Error(), Code: 500}
	}
	_, err = connect.DB.Exec("INSERT INTO products (name,category,price,brand,color,aviable,img) VALUES (?,?,?,?,?,?,?);", data.Name, data.Category, data.Price, data.Brand, data.Color, true, data.Image)
	if err != nil {
		return &fiber.Error{Message: err.Error(), Code: 500}
	}
	return nil
}
