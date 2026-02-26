package methodspost

import (
	"App/src/controllers/db"
	"App/src/encrypt"
	"App/src/globals"
	"App/src/models"

	"github.com/gofiber/fiber/v3"
)

func Login(c fiber.Ctx) error {
	data := new(models.User)
	err := c.Bind().Body(data)
	if err != nil {
		return &fiber.Error{Message: err.Error(), Code: 500}
	}
	password, err := db.IsUser(data.User)
	if err != nil {
		return err
	}
	if password == data.Password {
		token := encrypt.Generatekey()
		globals.Mutex.Lock()
		globals.RegistredToken[token] = true
		globals.Mutex.Unlock()
		c.Res().Response().Header.Add("Acces-Token", token)
		return nil
	} else {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Credenciales incorrectas",
		})
	}
}
