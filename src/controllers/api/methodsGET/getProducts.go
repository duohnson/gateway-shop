package methodsget

import (
	"App/src/database/connect"
	"App/src/models"
	"fmt"
	"strings"

	"github.com/gofiber/fiber/v3"
)

func GetProducts(c fiber.Ctx) error {
	query := "SELECT * FROM products WHERE"
	var class string = c.Params("class")
	if class != "" && !strings.Contains(class, "=") && !strings.Contains(class, ",") && !strings.Contains(class, "'") {
		query += fmt.Sprintf(` class="%s"`, class)
	}
	var name string = c.Params("name")
	if name != "" && !strings.Contains(name, "=") && !strings.Contains(name, ",") && !strings.Contains(name, "'") {
		query += fmt.Sprintf(` AND name="%s"`, name)
	}
	rows, err := connect.DB.Query(query)
	if err != nil {
		return &fiber.Error{Message: err.Error(), Code: 500}
	}
	defer rows.Close()
	var list []models.Product
	for rows.Next() {
		var product models.Product
		err := rows.Scan(&product.Id, &product.Name, &product.Class, &product.Price, &product.Quantity, &product.Brand, &product.Color, &product.Aviable, &product.Image)
		if err != nil {
			return &fiber.Error{Message: err.Error(), Code: 500}
		}
		list = append(list, product)
	}
	if len(list) == 0 {
		return c.SendString("No existe este producto \nError 404 Not Found")
	}
	return c.JSON(list)
}
