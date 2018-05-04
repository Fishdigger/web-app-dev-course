package controllers

import (
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/Fishdigger/web-app-dev-course/HenryBooks/server/db"
	"github.com/Fishdigger/web-app-dev-course/HenryBooks/server/entities"
	"github.com/Fishdigger/web-app-dev-course/HenryBooks/server/security"
	"github.com/julienschmidt/httprouter"
)

//CreateUser ... POST /users/create
func CreateUser(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	var user entities.User
	body, _ := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	err := json.Unmarshal(body, &user)
	if err != nil {
		Send(&w, err, http.StatusBadRequest)
		return
	}

	db.Conn.Create(&user)
	Send(&w, "", http.StatusCreated)
}

//Authenticate ... POST /users
func Authenticate(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	var claim entities.User
	var actual entities.User
	body, _ := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	err := json.Unmarshal(body, &claim)
	if err != nil {
		Send(&w, err, http.StatusBadRequest)
		return
	}
	db.Conn.Where("username = ?", claim.Username).First(&actual)
	if actual.ID == 0 {
		Send(&w, "User does not exist", http.StatusUnauthorized)
		return
	}
	if claim.Password != actual.Password {
		Send(&w, "Invalid password", http.StatusUnauthorized)
		return
	}
	token := security.GetToken(claim.Username)
	Send(&w, token, http.StatusOK)
}
