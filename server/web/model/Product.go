package model

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	ID          int      `gorm:"primaryKey" json:"id"`
	Name        string   `gorm:"not null" json:"name"`
	Description string   `json:"description"`
	Price       float64  `json:"price"`
	CategoryID  int      `json:"categoryId"`
	Category    Category `json:"category"`
	BasketID    int      `json:"basketId"`
}
