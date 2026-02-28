function formatCurrency(n) {
	return Number(n).toFixed(2);
}

function getCart() {
	try {
		return JSON.parse(localStorage.getItem('carrito')) || [];
	} catch (e) {
		return [];
	}
}

function calcTotal(cart) {
	return cart.reduce((s, i) => s + (parseFloat(i.precio) || 0) * (i.cantidad || 1), 0);
}

function renderSummary() {
	const cart = getCart();
	const el = document.getElementById('order-summary');
	if (!el) {
		return;
	}

	if (!cart.length) {
		el.innerHTML = '<p>No hay artículos en el carrito.</p>';
		return;
	}

	const rows = cart
		.map(
			i => `
			<div style="display:flex;justify-content:space-between;align-items:center;margin:.35rem 0">
				<div>
					<strong>${i.nombre}</strong>
					<div style="font-size:.9rem;color:#6b7280">Cantidad: ${i.cantidad || 1}</div>
				</div>
				<div class="precio">$${formatCurrency((i.precio || 0) * (i.cantidad || 1))}</div>
			</div>
		`
		)
		.join('');

	const total = calcTotal(cart);
	el.innerHTML = `<div>${rows}</div><div style="text-align:right;margin-top:1rem"><strong>Total: $${formatCurrency(
		total
	)}</strong></div>`;
}

function initPayPalButtons() {
	if (typeof paypal === 'undefined') {
		console.warn('PayPal SDK no cargado');
		return;
	}

	const cart = getCart();
	if (!cart.length) {
		return;
	}

	const total = calcTotal(cart);

	paypal
		.Buttons({
			createOrder: function (data, actions) {
				return actions.order.create({
					purchase_units: [{ amount: { value: formatCurrency(total) } }]
				});
			},
			onApprove: function (data, actions) {
				return actions.order.capture().then(function (details) {
					localStorage.removeItem('carrito');
					window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { length: 0 } }));
					window.location.href = 'success.html';
				});
			},
			onCancel: function () {
				window.location.href = 'cancel.html';
			},
			onError: function (err) {
				console.error(err);
				alert('Ocurrió un error con el pago');
			}
		})
		.render('#paypal-buttons');
}

document.addEventListener('DOMContentLoaded', function () {
	renderSummary();
	setTimeout(initPayPalButtons, 600);
});
