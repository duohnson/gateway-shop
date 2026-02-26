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
		return &fiber.Error{Message: err.Error(), Code: 500}
	}
	for _, v := range data.Items {
		fmt.Println(fmt.Sprint(v.Name, ":", v.Price))
	}
	return nil
}
