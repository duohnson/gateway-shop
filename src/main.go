package main

import (
	"App/src/configs"
	"App/src/database/connect"
	"App/src/routes"
	"log"
	"os"

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
	//
	//==========================================//
	app.Use(static.New(configs.STATIC_FILES_PATH))
	//==========================================//
	//
	//================//
	routes.Router(app)
	//================//
	//
	//===========================================================//
	// ================ no lo toques, esto arregla un problema en el carrito dinamico ==============//
	if os.Getenv("DEV_NO_TLS") == "1" || os.Getenv("DEV_NO_TLS") == "true" {
		log.Println("Starting server WITHOUT TLS (DEV_NO_TLS)")
		log.Fatal(app.Listen(configs.SERVER_PORT))
	}

	log.Fatal(app.Listen(configs.SERVER_PORT, fiber.ListenConfig{
		CertFile:    "./certs/localhost+1.pem",
		CertKeyFile: "./certs/localhost+1-key.pem",
	}))
	//===========================================================//
	//////////////////////////////////////////////////////////////////////////////////////////
}
