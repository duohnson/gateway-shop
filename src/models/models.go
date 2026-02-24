package models

type Card struct {
	Total_amount int       `json:"total_amount"`
	Items        []Product `json:"items"`
}
type Product struct {
	Id       int     `josn:"id"`
	Class    string  `json:"class"`
	Name     string  `json:"name"`
	Price    float64 `json:"price"`
	Quantity int     `json:"quantity"`
	Brand    string  `json:"brand"`
	Color    string  `json:"color"`
	Aviable  bool    `josn:"aviable"`
	Image    string  `json:"image"`
}
