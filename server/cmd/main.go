package main

import (
	"fmt"
	"github.com/TinyRogue/Ebiz-4/database"
	"github.com/TinyRogue/Ebiz-4/web/routing"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()

	e.Use(middleware.CORS())
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	db, err := database.Init()
	if err != nil {
		fmt.Printf("Failed to connect to database: %v", err)
		return
	} else {
		fmt.Println("Connected to database")
	}

	routing.RegisterRoutes(e, db)

	e.Logger.Fatal(e.Start(":8080"))
}
