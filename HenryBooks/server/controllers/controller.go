package controllers

import (
	"encoding/json"
	"net/http"
)

func Send(w *http.ResponseWriter, data interface{}, status int) {
	model, _ := json.Marshal(&data)
	(*w).Header().Set("Content-Type", "application/json")
	(*w).Header().Set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Headers", "*")
	(*w).WriteHeader(status)
	(*w).Write(model)
}
