package methodspost

import (
	"App/src/database/connect"
	"App/src/models"

	"github.com/gofiber/fiber/v3"
)

func CreateProduct(c fiber.Ctx) error {
	// READ multipart/form values
	data := new(models.NewProduct)
	err := c.Bind().Body(data)
	if err != nil {
		return &fiber.Error{Message: err.Error(), Code: 500}
	}
	_, err = connect.DB.Exec(`INSERT INTO products 
		(category,
		name,
		desc,
		price,
		quantity,
		brand,
		color,
		aviable,
		img) 
		VALUES (?,?,?,?,?,?,?,?,?);`,
		data.Category,
		data.Name,
		data.Desc,
		data.Price,
		data.Quantity,
		data.Brand,
		data.Color,
		true,
		data.Image)
	if err != nil {
		return &fiber.Error{Message: err.Error(), Code: 500}
	}
	return c.SendStatus(200)
}
