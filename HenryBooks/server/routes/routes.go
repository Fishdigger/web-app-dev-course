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
	Router.GET("/", home)
}

func home(rw http.ResponseWriter, r *http.Request, p httprouter.Params) {
	rw.Write([]byte("Hello World"))
}
