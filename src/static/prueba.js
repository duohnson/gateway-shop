/* PRUEBA.JS - test/demo file for purchase functionality */

/* ===========================
   PURCHASE DATA
   =========================== */

// TOTAL amount for the purchase
var total_amount = Number(9);

// SAMPLE items array (products in cart)
var items = [
    { 
        "Id": 5, 
        "class": "cocina", 
        "name": "sarten", 
        "price": 23.99, 
        "quantity": 90, 
        "brand": "suavitel", 
        "color": "blanco", 
        "Aviable": true, 
        "image": "" 
    }, 
    { 
        "Id": 5, 
        "class": "cocina", 
        "name": "sarten", 
        "price": 23.99, 
        "quantiy": 90, // NOTE: typo in original (should be quantity)
        "brand": "suavitel", 
        "color": "blanco", 
        "Aviable": true, 
        "image": "" 
    }
];

/* ===========================
   API REQUEST
   =========================== */

// SEND purchase data to backend API
fetch("https://localhost:3500/buy", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        Total_amount: total_amount,
        Items: items
    })
})
.then(response => {
    if (response.ok) {
        return response.json();
    }
    throw new Error('Network response was not ok');
})
.then(data => {
    console.log('Purchase successful:', data);
})
.catch(error => {
    console.error('Purchase failed:', error);
});
