package main

import (
	"App/src/configs"
	"App/src/database/connect"
	"App/src/middlewares"
	"App/src/routes"
	"log"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
	"github.com/gofiber/fiber/v3/middleware/logger"
	"github.com/gofiber/fiber/v3/middleware/static"
)

func main() {
	//////////////////////////////////////////////////////////////////////////////////////////
	//================//
	connect.ConnectDB() //DB Conection
	//================//
	app := fiber.New()
	//================//
	//
	//=============================//
	app.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"*"},
	}))
	//=============================//
	//
	//==================//
	app.Use(logger.New())
	//==================//
	//==========================================//
	app.Use(static.New(configs.STATIC_FILES_PATH + "public/"))
	//==========================================//
	//
	//==================//
	app.Use("/admin", middlewares.AuthMiddleware)
	//==================//
	//================//
	routes.Router(app)
	//================//
	//
	//===========================================================//
	log.Fatal(app.Listen(configs.SERVER_PORT, fiber.ListenConfig{
		CertFile:    "./certs/localhost+1.pem",
		CertKeyFile: "./certs/localhost+1-key.pem",
	}))
	//===========================================================//
	//////////////////////////////////////////////////////////////////////////////////////////
}
//COOOOOOOOOOOMIT
