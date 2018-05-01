package entities

import "github.com/jinzhu/gorm"

type Inventory struct {
	gorm.Model
	BookID   int `gorm:"not null"`
	BranchID int `gorm:"not null"`
	Quantity int `gorm:"default:0"`
}
