package database

import (
	"fmt"
	"github.com/TinyRogue/Ebiz-4/web/model"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func Init() (db *gorm.DB, err error) {
	db, err = gorm.Open(sqlite.Open("database.database"), &gorm.Config{})
	if err != nil {
		fmt.Printf("Failed to connect to database: %v", err)
		return nil, err
	}

	err = db.AutoMigrate(&model.Product{}, &model.Category{}, &model.Basket{})
	if err != nil {
		fmt.Printf("Failed to auto-migrate the schema: %v", err)
		return nil, err
	}
	return db, nil
}
