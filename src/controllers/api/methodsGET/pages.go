package methodsget

import (
	"App/src/configs"

	"github.com/gofiber/fiber/v3"
)

func IndexPage(c fiber.Ctx) error {
	return c.SendFile(configs.STATIC_FILES_PATH + "public/index.html")
}
