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

//GetInventory ... GET /inventories/:id
func GetInventory(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	var inv entities.Inventory
	id, err := strconv.Atoi(params.ByName("id"))
	if err != nil {
		Send(w, err, http.StatusBadRequest)
		return
	}

	db.Conn.First(&inv, id)
	Send(w, inv, http.StatusOK)
}

//GetAllInventories ... GET /inventories/
func GetAllInventories(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	var invs []entities.Inventory
	db.Conn.Find(&invs)
	Send(w, invs, http.StatusOK)
}

//EditInventory ... POST /inventories/:id
func EditInventory(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	id, err := strconv.Atoi(params.ByName("id"))
	if err != nil {
		Send(w, err, http.StatusUnprocessableEntity)
		return
	}

	var existing entities.Inventory
	var updated entities.Inventory

	db.Conn.First(&existing, id)
	body, _ := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	err = json.Unmarshal(body, &updated)
	if err != nil {
		Send(w, err, http.StatusUnprocessableEntity)
		return
	}

	updated.ID = existing.ID
	db.Conn.Save(&updated)
}

//CreateInventory ... POST /inventories/
func CreateInventory(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	var inv entities.Inventory
	body, _ := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	err := json.Unmarshal(body, &inv)
	if err != nil || !db.Conn.NewRecord(inv) {
		Send(w, err, http.StatusBadRequest)
		return
	}
	db.Conn.Create(&inv)
	Send(w, inv, http.StatusCreated)
}

//DeleteInventory ... DELETE /inventories/:id
func DeleteInventory(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	id, err := strconv.Atoi(params.ByName("id"))
	if err != nil {
		Send(w, err, http.StatusNotFound)
		return
	}

	db.Conn.Where("ID = ?", id).Delete(&entities.Inventory{})
	Send(w, "", http.StatusOK)
}
