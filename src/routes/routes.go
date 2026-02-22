package routes

import (
	methodsget "App/src/controllers/api/methodsGET"
	methodspost "App/src/controllers/api/methodsPOST"

	"github.com/gofiber/fiber/v3"
)

func Router(app *fiber.App) {
	////////////////////////////////////////
	//____________ METHODS_GET____________//
	////////////////////////////////////////
	//=======================================//
	//_________________PAGES_________________//
	//======================================//
	app.Get("/", methodsget.IndexPage) //asi es como debes definir las rutas de las paginas. Ve al modulo de methodGET/pages para crear las funciones de carga de las paginas
	//======================================//
	app.Get("/shop", methodsget.ShopPage)
	app.Get("/:class", methodsget.GetProducts)
	app.Get("/:class/:name", methodsget.GetProducts)

	////////////////////////////////////////
	//
	//====================================//
	//
	////////////////////////////////////////
	//_____________METHODS_POST___________//
	////////////////////////////////////////
	app.Post("/buy", methodspost.GetProductsSelected)
	////////////////////////////////////////
	//
	//====================================//
	//
	////////////////////////////////////////
	//___________METHODS_DELETE___________//
	////////////////////////////////////////
	//CODE...
	////////////////////////////////////////
	//
	//====================================//
	//
	////////////////////////////////////////
	//___________METHODS_UPDATE___________//
	////////////////////////////////////////
	//CODE..
	////////////////////////////////////////
	//
	//====================================//
	//

}
