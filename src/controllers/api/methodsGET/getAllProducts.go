package methodsget

import (
    "App/src/database/connect"
    "App/src/models"

    "github.com/gofiber/fiber/v3"
)

// GetAllProducts returns all products from the database as JSON
func GetAllProducts(c fiber.Ctx) error {
    rows, err := connect.DB.Query("SELECT * FROM products")
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

    return c.JSON(list)
}
