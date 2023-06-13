package model

import "gorm.io/gorm"

type Category struct {
	gorm.Model
	ID          int    `gorm:"primaryKey" json:"id"`
	Name        string `gorm:"not null" json:"name"`
	Description string `json:"description"`
}
