package methodsupdate

import (
	"App/src/database/connect"
	"App/src/models"

	"github.com/gofiber/fiber/v3"
)

func UpdateProduct(c fiber.Ctx) error {
	data := new(models.ProductUpdate)
	err := c.Bind().Body(data)
	if err != nil {
		return &fiber.Error{Message: err.Error(), Code: 500}
	}
	_, err = connect.DB.Exec("UPDATE product SET category=?, SET name=?, SET desc=?, SET price=?, SET quantity=?, SET brand=?, SET color=?, SET image=? WHERE id=?", data.Category, data.Name, data.Desc, data.Price, data.Quantity, data.Brand, data.Color, data.Image, data.Id)
	if err != nil {
		return &fiber.Error{Message: err.Error(), Code: 500}
	}
	return nil
}
