package db

import (
	"github.com/jinzhu/gorm"
	//required driver
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

//Conn ... Represents a session with the database, run Connect() first
var Conn *gorm.DB

//Connect ... Establishes session with DB, remember to defer Close()
func Connect() error {
	var err error
	Conn, err = gorm.Open("sqlite3", "app.db")
	return err
}

//Close ... End session with DB
func Close() error {
	return Conn.Close()
}
