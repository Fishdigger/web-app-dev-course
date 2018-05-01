package entities

import "github.com/jinzhu/gorm"

type Branch struct {
	gorm.Model
	Name          string `gorm:"not null"`
	StreetAddress string
	City          string
	State         string
	ZipCode       string
	PhoneNumber   string
}
