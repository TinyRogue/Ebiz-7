package routing

import (
	"github.com/TinyRogue/Ebiz-4/web/model"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"net/http"
	"strconv"
)

const (
	basketEndpoint        = "/basket/:id"
	invalidIdErrorMessage = "Invalid ID"
)

func registerBasket(e *echo.Echo, db *gorm.DB) {
	e.GET(basketEndpoint, getBasketHandler(db))
	e.PUT(basketEndpoint+"/:productId", addProductHandler(db))
	e.DELETE(basketEndpoint+"/:productId", removeProductHandler(db))
	e.POST(basketEndpoint+"/pay", payHandler(db))
}

func getBasketHandler(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		id := c.Param("id")
		var basket model.Basket
		db.Preload("Products").Find(&basket, id)
		return c.JSON(http.StatusOK, basket)
	}
}

func addProductHandler(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		id := c.Param("id")
		productId := c.Param("productId")
		parsedId, err := strconv.ParseInt(id, 10, 64)
		if err != nil {
			return c.String(http.StatusBadRequest, invalidIdErrorMessage)
		}
		parsedProductId, err := strconv.ParseInt(productId, 10, 64)
		if err != nil {
			return c.String(http.StatusBadRequest, "Invalid Product ID")
		}

		var basket model.Basket
		findRes := db.Preload("Products").First(&basket, parsedId)
		if findRes.Error != nil {
			if err = db.Create(&model.Basket{ID: int(parsedId)}).Error; err != nil {
				return c.String(http.StatusInternalServerError, "Error creating basket")
			}
		}

		var product model.Product
		if err := db.Preload("Category").First(&product, parsedProductId).Error; err != nil {
			return c.String(http.StatusBadRequest, "Could not find a product")
		}

		err = db.First(&basket, parsedId).Association("Products").Append(&product)
		if err != nil {
			return c.String(http.StatusInternalServerError, err.Error())
		}

		return c.NoContent(http.StatusAccepted)
	}
}

func removeProductHandler(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		id := c.Param("id")
		productId := c.Param("productId")
		parsedId, err := strconv.ParseInt(id, 10, 64)
		if err != nil {
			return c.String(http.StatusBadRequest, invalidIdErrorMessage)
		}
		parsedProductId, err := strconv.ParseInt(productId, 10, 64)
		if err != nil {
			return c.String(http.StatusBadRequest, "Invalid Product ID")
		}

		var basket model.Basket
		findRes := db.Preload("Products").First(&basket, parsedId)
		if findRes.Error != nil {
			return c.String(http.StatusBadRequest, "Could not find a basket")
		}

		var product model.Product
		if err := db.First(&product, parsedProductId).Error; err != nil {
			return c.String(http.StatusBadRequest, "Could not find a product")
		}

		err = db.Model(&basket).Association("Products").Delete(&product)
		if err != nil {
			return c.String(http.StatusInternalServerError, err.Error())
		}

		return c.NoContent(http.StatusAccepted)
	}
}

func payHandler(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		id := c.Param("id")
		parsedId, err := strconv.ParseInt(id, 10, 64)
		if err != nil {
			return c.String(http.StatusBadRequest, invalidIdErrorMessage)
		}

		var basket model.Basket
		findRes := db.Preload("Products").First(&basket, parsedId)
		if findRes.Error != nil {
			return c.String(http.StatusBadRequest, "Could not find a basket")
		}
		err = db.Model(&basket).Association("Products").Clear()
		if err != nil {
			return c.String(http.StatusInternalServerError, err.Error())
		}

		return c.NoContent(http.StatusAccepted)
	}
}
