var total_amount = Number(9)
var items = [{ "Id": 5, "class": "cocina", "name": "sarten", "price": 23.99, "quantity": 90, "brand": "suavitel", "color": "blanco", "Aviable": true, "image": "" }, { "Id": 5, "class": "cocina", "name": "sarten", "price": 23.99, "quantiy": 90, "brand": "suavitel", "color": "blanco", "Aviable": true, "image": "" }]
fetch("https://localhost:3500/buy", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        Total_amount: total_amount,
        Items: items
    }

    )
})