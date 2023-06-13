package routing

import (
	"encoding/json"
	"github.com/TinyRogue/Ebiz-4/web/model"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"net/http"
)

const (
	productsEndpoint = "/products"

	productNotFoundErrorMessage = "Product not found"
)

func registerProducts(e *echo.Echo, db *gorm.DB) {
	e.GET(productsEndpoint, func(c echo.Context) error {
		var products []model.Product
		if err := db.Preload("Category").Find(&products).Error; err != nil {
			return c.String(http.StatusInternalServerError, err.Error())
		}
		return c.JSON(http.StatusOK, products)
	})

	e.GET(productsEndpoint+"/:id", func(c echo.Context) error {
		id := c.Param("id")
		var product model.Product
		result := db.Preload("Category").First(&product, id)
		if result.Error != nil {
			return c.String(http.StatusNotFound, productNotFoundErrorMessage)
		}
		return c.JSON(http.StatusOK, product)
	})

	e.POST(productsEndpoint, func(c echo.Context) error {
		var product model.Product
		if err := json.NewDecoder(c.Request().Body).Decode(&product); err != nil {
			return err
		}
		db.Create(&product)
		return c.NoContent(http.StatusCreated)
	})

	e.PUT(productsEndpoint+"/:id", func(c echo.Context) error {
		id := c.Param("id")
		var product model.Product
		if err := json.NewDecoder(c.Request().Body).Decode(&product); err != nil {
			return err
		}
		result := db.Model(&product).Where("id = ?", id).Updates(product)
		if result.Error != nil {
			return c.String(http.StatusNotFound, productNotFoundErrorMessage)
		}
		return c.NoContent(http.StatusAccepted)
	})

	e.DELETE(productsEndpoint+"/:id", func(c echo.Context) error {
		id := c.Param("id")
		result := db.Delete(&model.Product{}, id)
		if result.RowsAffected == 0 {
			return c.String(http.StatusNotFound, productNotFoundErrorMessage)
		}
		return c.NoContent(http.StatusAccepted)
	})
}
