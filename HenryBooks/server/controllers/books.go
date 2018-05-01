package controllers

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"strconv"

	"github.com/Fishdigger/web-app-dev-course/HenryBooks/server/db"
	"github.com/Fishdigger/web-app-dev-course/HenryBooks/server/entities"
	"github.com/julienschmidt/httprouter"
)

//GetBook ... GET /books/:id
func GetBook(rw http.ResponseWriter, req *http.Request, params httprouter.Params) {
	var book entities.Book
	id, err := strconv.Atoi(params.ByName("id"))
	if err != nil {
		rw.Write([]byte("Bad ID, should be an int"))
		return
	}
	db.Conn.First(&book, id)
	Send(rw, book, http.StatusOK)
}

//GetAllBooks ... GET /books
func GetAllBooks(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	var books []entities.Book
	db.Conn.Find(&books)
	Send(w, books, 200)
}

//EditBook ... POST /books/:id
func EditBook(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	id, err := strconv.Atoi(params.ByName("id"))
	if err != nil {
		w.Write([]byte("Bad ID, should be an int"))
		return
	}

	var existing entities.Book
	db.Conn.First(&existing, id)

	var updated entities.Book

	body, _ := ioutil.ReadAll(r.Body)
	defer r.Body.Close()

	err = json.Unmarshal(body, &updated)
	if err != nil {
		Send(w, err, http.StatusUnprocessableEntity)
		return
	}

	updated.ID = existing.ID
	db.Conn.Save(&updated)

	Send(w, updated, http.StatusAccepted)
}

//CreateBook ... POST /books/
func CreateBook(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	var book entities.Book
	body, _ := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	err := json.Unmarshal(body, &book)
	if err != nil || !db.Conn.NewRecord(book) {
		Send(w, err, http.StatusBadRequest)
		return
	}

	db.Conn.Create(&book)
	db.Conn.First(&book)
	Send(w, book, http.StatusCreated)
}

//DeleteBook ... DELETE /books/:id
func DeleteBook(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	id, err := strconv.Atoi(params.ByName("id"))
	if err != nil {
		Send(w, err, http.StatusNotFound)
		return
	}

	db.Conn.Where("ID = ?", id).Delete(&entities.Book{})
	Send(w, "", http.StatusOK)
}
