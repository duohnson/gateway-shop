package methodspost

import (
	"App/src/models"

	"github.com/gofiber/fiber/v3"
)

func GetProducts(c fiber.Ctx) error {
	data := new(models.Card)
	err := c.Bind().Body(data)
	if err != nil {
		return &fiber.Error{Message: "Error al obtener datos del carrito", Code: 500}
	}
	//cobrar_pago(data.Total_amount)
	return nil
}
