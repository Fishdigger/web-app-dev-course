package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/Fishdigger/web-app-dev-course/HenryBooks/server/db"
	"github.com/Fishdigger/web-app-dev-course/HenryBooks/server/routes"
)

func main() {
	port := ":5001"

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

	fmt.Printf("Running on port %s", port)
	http.ListenAndServe(port, routes.Router)
}
