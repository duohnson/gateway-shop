package models

type Card struct {
	Items []Product `json:"items"`
}
type Product struct {
	Id       int     `josn:"id"`
	Category string  `json:"category"`
	Name     string  `json:"name"`
	Price    float64 `json:"price"`
	Brand    string  `json:"brand"`
	Color    string  `json:"color"`
	Aviable  bool
	Image    string `josn:"image"`
}
type NewProduct struct {
	Category string  `json:"category"`
	Name     string  `json:"name"`
	Price    float64 `json:"price"`
	Brand    string  `json:"brand"`
	Color    string  `json:"color"`
	Image    string  `json:"image"`
}
