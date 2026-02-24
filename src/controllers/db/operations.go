package db

import (
	"App/src/database/connect"

	"github.com/gofiber/fiber/v3"
)

func IsUser(user string) (string, error) {
	var password string
	row := connect.DB.QueryRow("SELECT password FROM admin WHERE user=?", user)
	err := row.Scan(&password)
	if err != nil {
		return "", &fiber.Error{Message: err.Error(), Code: 500}
	}
	if password != "" {
		return password, nil
	} else {
		return "", &fiber.Error{Message: "Usuario no encontrado", Code: 404}
	}
}
