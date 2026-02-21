package models

type Card struct {
	Total_amount int      `json:"total_amount"`
	Items        []string `json:"items"`
}
