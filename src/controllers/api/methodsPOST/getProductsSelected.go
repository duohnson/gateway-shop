package methodspost

import (
	"App/src/models"
	"fmt"

	"github.com/gofiber/fiber/v3"
)

func GetProductsSelected(c fiber.Ctx) error {
	data := new(models.Card)
	err := c.Bind().Body(data)
	if err != nil {
		return &fiber.Error{Message: "Error al obtener datos del carrito", Code: 500}
	}
	total_cost := 0.00
	for _, v := range data.Items {
		total_cost += v.Price
		fmt.Println(fmt.Sprint(v.Name, ":", v.Price))
	}
	fmt.Println(total_cost)
	return nil
}
