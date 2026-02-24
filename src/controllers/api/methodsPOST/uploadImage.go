package methodspost

import (
	"fmt"
	"os"
	"path/filepath"
	"time"

	"github.com/gofiber/fiber/v3"
)

// UploadImage saves an uploaded image to static/public/img/products and returns the path
func UploadImage(c fiber.Ctx) error {
	// get file from form
	file, err := c.FormFile("img")
	if err != nil {
		return &fiber.Error{Message: "missing file", Code: 400}
	}

	// ensure destination dir exists
	dstDir := "./static/public/img/products"
	if err := os.MkdirAll(dstDir, os.ModePerm); err != nil {
		return &fiber.Error{Message: err.Error(), Code: 500}
	}

	// sanitize and build filename
	orig := filepath.Base(file.Filename)
	fname := fmt.Sprintf("%d-%s", time.Now().Unix(), orig)
	dstPath := filepath.Join(dstDir, fname)

	// save file using fiber helper
	if err := c.SaveFile(file, dstPath); err != nil {
		return &fiber.Error{Message: err.Error(), Code: 500}
	}

	// return relative path used by frontend
	rel := filepath.ToSlash(filepath.Join("img/products", fname))
	return c.SendString(rel)
}

// UP UP UP ITS ME, A MARIOOO //
