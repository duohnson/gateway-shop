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

type NewProduct struct {
	Name     string  `json:"name"`
	Category string  `json:"category"`
	Price    float64 `json:"price"`
	Brand    string  `json:"brand"`
	Color    string  `json:"color"`
	Image    string  `json:"image"`
}

// no had a estructure for the new product to add, a dict, so i create it //
// TRASLATEEEE //
// no tenias una estructura del nuevo producto a agregar, un dict, la cree //
