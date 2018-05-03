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

//GetBranch ... GET /branches/:id
func GetBranch(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	var branch entities.Branch
	id, err := strconv.Atoi(params.ByName("id"))
	if err != nil {
		Send(&w, err, http.StatusBadRequest)
		return
	}

	db.Conn.First(&branch, id)
	Send(&w, branch, http.StatusOK)
}

//GetAllBranches ... GET /branches/
func GetAllBranches(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	var branches []entities.Branch
	db.Conn.Find(&branches)
	Send(&w, branches, http.StatusOK)
}

//EditBranch ... POST /branches/:id
func EditBranch(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	id, err := strconv.Atoi(params.ByName("id"))
	if err != nil {
		Send(&w, err, http.StatusBadRequest)
		return
	}

	var existing entities.Branch
	var updated entities.Branch
	db.Conn.First(&existing, id)
	body, _ := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	err = json.Unmarshal(body, &updated)
	if err != nil {
		Send(&w, err, http.StatusUnprocessableEntity)
		return
	}

	updated.ID = existing.ID
	db.Conn.Save(&updated)
	Send(&w, updated, http.StatusAccepted)
}

//CreateBranch ... POST /branches/
func CreateBranch(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	var branch entities.Branch
	body, _ := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	err := json.Unmarshal(body, &branch)
	if err != nil || !db.Conn.NewRecord(branch) {
		Send(&w, err, http.StatusBadRequest)
		return
	}

	db.Conn.Create(&branch)
	Send(&w, branch, http.StatusCreated)
}

//DeleteBranch ... DELETE /branches/:id
func DeleteBranch(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	id, err := strconv.Atoi(params.ByName("id"))
	if err != nil {
		Send(&w, err, http.StatusNotFound)
		return
	}

	db.Conn.Where("ID = ?", id).Delete(&entities.Branch{})
	Send(&w, "", http.StatusOK)
}
