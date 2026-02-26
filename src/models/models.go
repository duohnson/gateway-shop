package models

type Card struct {
	Total_amount int       `json:"total_amount"`
	Items        []Product `json:"items"`
}
type Product struct {
	Id       int     `josn:"id"`
	Category string  `json:"category"`
	Name     string  `json:"name"`
	Desc     string  `json:"desc"`
	Price    float64 `json:"price"`
	Quantity int     `json:"quantity"`
	Brand    string  `json:"brand"`
	Color    string  `json:"color"`
	Aviable  bool    `josn:"aviable"`
	Image    string  `json:"image"`
}

type NewProduct struct {
	Category string  `json:"category"`
	Name     string  `json:"name"`
	Desc     string  `json:"desc"`
	Price    float64 `json:"price"`
	Quantity int     `json:"quantity"`
	Brand    string  `json:"brand"`
	Color    string  `json:"color"`
	Image    string  `json:"image"`
}
type ProductUpdate struct {
	Id       int     `josn:"id"`
	Category string  `json:"category"`
	Name     string  `json:"name"`
	Desc     string  `json:"desc"`
	Price    float64 `json:"price"`
	Quantity int     `json:"quantity"`
	Brand    string  `json:"brand"`
	Color    string  `json:"color"`
	Image    string  `json:"image"`
}
type User struct {
	User     string `json:"user"`
	Password string `json:"password"`
}

// no had a estructure for the new product to add, a dict, so i create it //
// TRASLATEEEE //
// no tenias una estructura del nuevo producto a agregar, un dict, la cree //
// Nuevo campo Desc (descripcion)
