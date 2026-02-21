package routes

import (
	methodsget "App/src/controllers/api/methodsGET"

	"github.com/gofiber/fiber/v3"
)

func Router(app *fiber.App) {
	app.Get("/", methodsget.IndexPage)
}
