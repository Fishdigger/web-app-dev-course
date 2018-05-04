package routes

import (
	"net/http"

	"github.com/Fishdigger/web-app-dev-course/HenryBooks/server/controllers"
	"github.com/Fishdigger/web-app-dev-course/HenryBooks/server/version"
	"github.com/julienschmidt/httprouter"
)

var Router *httprouter.Router

func Initialize() {
	Router = httprouter.New()
	Router.GET("/books/:id", controllers.GetBook)
	Router.GET("/books/", controllers.GetAllBooks)
	Router.POST("/books/", controllers.CreateBook)
	Router.POST("/books/:id", controllers.EditBook)
	Router.DELETE("/books/:id", controllers.DeleteBook)
	Router.GET("/branches/:id", controllers.GetBranch)
	Router.GET("/branches/", controllers.GetAllBranches)
	Router.POST("/branches/", controllers.CreateBranch)
	Router.POST("/branches/:id", controllers.EditBranch)
	Router.DELETE("/branches/:id", controllers.DeleteBranch)
	Router.GET("/inventories/:id", controllers.GetInventory)
	Router.GET("/inventories", controllers.GetAllInventories)
	Router.POST("/inventories", controllers.CreateInventory)
	Router.POST("/inventories/:id", controllers.EditInventory)
	Router.DELETE("/inventories/:id", controllers.DeleteInventory)
	Router.POST("/users/create", controllers.CreateUser)
	Router.POST("/users", controllers.Authenticate)
	Router.GET("/", home)
}

func home(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	v := version.GetVersion()
	w.Write([]byte(v))
}
