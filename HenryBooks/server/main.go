package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/rs/cors"

	"github.com/Fishdigger/web-app-dev-course/HenryBooks/server/db"
	"github.com/Fishdigger/web-app-dev-course/HenryBooks/server/routes"
)

func main() {
	port := ":3001"

	fmt.Println("Connecting to db...")
	err := db.Connect()
	if err != nil {
		panic(err)
	}
	fmt.Println("Initializing DB")
	defer db.Close()
	seed := os.Getenv("SEED_DB")
	if seed == "true" {
		db.Seed()
	}

	fmt.Println("Starting router")
	routes.Initialize()

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000"},
		AllowedMethods: []string{"GET", "POST", "DELETE", "OPTIONS"},
	})

	handler := c.Handler(routes.Router)

	fmt.Printf("Running on port %s", port)
	http.ListenAndServe(port, handler)
}
