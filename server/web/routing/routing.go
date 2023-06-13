package routing

import (
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func RegisterRoutes(e *echo.Echo, db *gorm.DB) {
	registerCategories(e, db)
	registerProducts(e, db)
	registerBasket(e, db)
}
