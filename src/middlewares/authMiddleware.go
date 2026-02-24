package middlewares

import (
	"App/src/globals"

	"github.com/gofiber/fiber/v3"
)

func AuthMiddleware(c fiber.Ctx) error {
	token := c.Get("Acces-Token")
	globals.Mutex.RLock()
	thisToken := globals.RegistredToken[token]
	globals.Mutex.RUnlock()
	if thisToken {
		globals.Mutex.Lock()
		delete(globals.RegistredToken, token)
		globals.Mutex.Unlock()
		return c.Next()
	} else {
		return c.Redirect().To("/login")
	}
}
