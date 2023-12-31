package routing

import (
	"encoding/json"
	"github.com/TinyRogue/Ebiz-4/web/model"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"net/http"
)

const (
	categoriesEndpoint = "/categories"

	categoryNotFoundErrorMessage = "Category not found"
)

func registerCategories(e *echo.Echo, db *gorm.DB) {
	e.GET(categoriesEndpoint, func(c echo.Context) error {
		var categories []model.Category
		db.Find(&categories)
		return c.JSON(http.StatusOK, categories)
	})

	e.GET(categoriesEndpoint+"/:id", func(c echo.Context) error {
		id := c.Param("id")
		var category model.Category
		result := db.First(&category, id)
		if result.Error != nil {
			return c.String(http.StatusNotFound, categoryNotFoundErrorMessage)
		}
		return c.JSON(http.StatusOK, category)
	})

	e.POST(categoriesEndpoint, func(c echo.Context) error {
		var category model.Category
		if err := json.NewDecoder(c.Request().Body).Decode(&category); err != nil {
			return err
		}
		db.Create(&category)
		return c.NoContent(http.StatusCreated)
	})

	e.PUT(categoriesEndpoint+"/:id", func(c echo.Context) error {
		id := c.Param("id")
		var category model.Category
		if err := json.NewDecoder(c.Request().Body).Decode(&category); err != nil {
			return err
		}
		result := db.Model(&category).Where("id = ?", id).Updates(category)
		if result.Error != nil {
			return c.String(http.StatusNotFound, categoryNotFoundErrorMessage)
		}
		return c.NoContent(http.StatusAccepted)
	})

	e.DELETE(categoriesEndpoint+"/:id", func(c echo.Context) error {
		id := c.Param("id")
		result := db.Delete(&model.Category{}, id)
		if result.RowsAffected == 0 {
			return c.String(http.StatusNotFound, categoryNotFoundErrorMessage)
		}
		return c.NoContent(http.StatusAccepted)
	})
}
