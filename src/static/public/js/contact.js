// LOAD GitHub user avatars from API
async function loadGitHubAvatars() {
    const cards = document.querySelectorAll('.designer.card[data-username]');

    // LOOP through each designer card
    for (const card of cards) {
        const user = card.getAttribute('data-username');
        const img = card.querySelector('img.avatar');
        const nameEl = card.querySelector('.gh-name');
        const linkEl = card.querySelector('.gh-link');

        try {
            // FETCH user data from GitHub API
            const res = await fetch('https://api.github.com/users/' + encodeURIComponent(user));

            if (!res.ok) throw new Error('GitHub API error');

            const data = await res.json();

            // UPDATE avatar image if availible
            if (data.avatar_url) {
                img.src = data.avatar_url;
            }

            // UPDATE real name if available
            if (data.name) {
                nameEl.textContent = data.name;
            }

            // UPDATE profile link
            if (linkEl && data.html_url) {
                linkEl.href = data.html_url;
            }

        } catch (err) {
            // FALLBACK avatar if API fails
            img.src = 'https://avatars.githubusercontent.com/u/583231?v=4';
            console.warn('Could not load avatar for', user, err);
        }
    }
}

// HANDLE contact form submission
function handleContactFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    // LOG form data to console (for development)
    console.log('Contact data:', Object.fromEntries(formData.entries()));

    // SHOW success message
    alert('Mensaje enviado. Gracias.');

    // RESET form fields
    form.reset();
}

// INIT when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // LOAD GitHub avatars
    loadGitHubAvatars();

    // ATTACH form submit handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
});
