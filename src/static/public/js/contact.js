// cotnact page - github avtaars + form

async function loadAvatars() {
  var cards = document.querySelectorAll('.designer.card[data-username]');

  for (var i = 0; i < cards.length; i++) {
    var card = cards[i];
    var user = card.dataset.username;
    var img = card.querySelector('img.avatar');
    var nameEl = card.querySelector('.gh-name');
    var linkEl = card.querySelector('.gh-link');

    try {
      var res = await fetch('https://api.github.com/users/' + encodeURIComponent(user));
      if (!res.ok) throw new Error('gh api fail');
      var data = await res.json();

      if (data.avatar_url && img) img.src = data.avatar_url;
      if (data.name && nameEl) nameEl.textContent = data.name;
      if (data.html_url && linkEl) linkEl.href = data.html_url;
    } catch(err) {
      // falblack avatar if api fails or rate liimted
      if (img) img.src = 'https://avatars.githubusercontent.com/u/583231?v=4';
      console.warn('could not load avatar for', user, err);
    }
  }
}

function handleContactSubmit(e) {
  e.preventDefault();
  var form = e.target;
  var fd = new FormData(form);

  // quick valiadtion
  var nombre = (fd.get('nombre') || '').trim();
  var email = (fd.get('email') || '').trim();
  var telefono = (fd.get('telefono') || '').trim();

  if (!nombre || !email || !telefono) {
    showToast('Por favor completa todos los campos');
    return;
  }

  // no bakcend endopint for this yet, just log it
  console.log('contact form:', Object.fromEntries(fd.entries()));
  showToast('Mensaje enviado. ¡Gracias!');
  form.reset();
}

document.addEventListener('DOMContentLoaded', function() {
  loadAvatars();

  var form = document.getElementById('contact-form');
  if (form) form.addEventListener('submit', handleContactSubmit);
});
