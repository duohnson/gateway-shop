package methodsget

import (
	"App/src/configs"

	"github.com/gofiber/fiber/v3"
)

func IndexPage(c fiber.Ctx) error {
	return c.SendFile(configs.STATIC_FILES_PATH + "public/index.html")
}
func ShopPage(c fiber.Ctx) error {
	return c.SendFile(configs.STATIC_FILES_PATH + "public/shop.html")
}

// solo utiliza "configs.STATIC_FILES_PATH +" y luego la ruta a la pagina sin utilizar "/" antes de el archivo ya q la ruta base es "./static/"
