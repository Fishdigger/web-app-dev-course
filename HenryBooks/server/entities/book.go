package entities

import "github.com/jinzhu/gorm"

type Book struct {
	gorm.Model
	Author       string
	Title        string `gorm:"not null"`
	Description  string
	ThumbnailUrl string
	Price        float64
}
