package routes

import (
	"net/http"

	"github.com/Fishdigger/web-app-dev-course/HenryBooks/server/controllers"
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
	Router.GET("/", home)
}

func home(rw http.ResponseWriter, r *http.Request, p httprouter.Params) {
	rw.Write([]byte("Hello World"))
}
