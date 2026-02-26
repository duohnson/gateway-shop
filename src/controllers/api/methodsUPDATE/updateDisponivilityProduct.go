package methodsupdate

import (
	"App/src/database/connect"

	"github.com/gofiber/fiber/v3"
)

func UpdateDisponivilityProduct(c fiber.Ctx) error {
	id := c.Params("id")
	aviable := c.Params("aviable")
	_, err := connect.DB.Exec("UPDATE product SET aviable=? WHERE id=?", aviable, id)
	if err != nil {
		return &fiber.Error{Message: err.Error(), Code: 500}
	}
	return nil
}
