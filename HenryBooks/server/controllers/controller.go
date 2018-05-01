package controllers

import (
	"encoding/json"
	"net/http"
)

func Send(w http.ResponseWriter, data interface{}, status int) {
	model, _ := json.Marshal(&data)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	w.Write(model)
}
