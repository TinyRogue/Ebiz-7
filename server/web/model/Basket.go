package model

import (
	"gorm.io/gorm"
)

type Basket struct {
	gorm.Model
	ID       int       `gorm:"primaryKey" json:"id"`
	Products []Product `json:"products"`
}
