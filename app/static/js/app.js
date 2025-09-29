const navToggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks?.classList.toggle('is-open');
    navToggle.classList.toggle('is-active');
  });
}

const counters = document.querySelectorAll('[data-count]');
const animateCount = (el) => {
  const target = Number(el.dataset.count || '0');
  const duration = 1600;
  const start = performance.now();

  const step = (ts) => {
    const progress = Math.min((ts - start) / duration, 1);
    const value = Math.floor(progress * target);
    el.textContent = value.toLocaleString('pt-BR');
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        animateCount(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => observer.observe(counter));

const pulseContainer = document.getElementById('pulse-live');

async function fetchPulse() {
  if (!pulseContainer) return;
  pulseContainer.classList.add('pulse--loading');
  try {
    const response = await fetch('/api/pulse');
    const data = await response.json();

    pulseContainer.innerHTML = `
      <article class="pulse__card">
        <h3>Usuários ativos agora</h3>
        <div class="pulse__value">${data.active_users.toLocaleString('pt-BR')}</div>
        <p class="pulse__meta">Uptime: ${data.uptime}</p>
      </article>
      <article class="pulse__card">
        <h3>Próximo evento</h3>
        <div class="pulse__value">${data.next_event.name}</div>
        <p class="pulse__meta">${data.next_event.location} • ${new Date(data.next_event.date).toLocaleDateString('pt-BR')}</p>
      </article>
      <article class="pulse__card">
        <h3>Tendências emergentes</h3>
        <ul class="pulse__list">
          ${data.live_trends
            .map(
              (trend) => `
                <li>
                  <span>${trend.title}</span>
                  <strong>${trend.momentum}</strong>
                </li>
              `
            )
            .join('')}
        </ul>
      </article>
    `;
  } catch (error) {
    pulseContainer.innerHTML = '<p class="pulse__meta">Não foi possível carregar o pulse agora.</p>';
    console.error(error);
  } finally {
    pulseContainer.classList.remove('pulse--loading');
  }
}

fetchPulse();
setInterval(fetchPulse, 15000);

const form = document.querySelector('.contact');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());
  console.table(payload);
  const button = form.querySelector('button');
  const original = button.textContent;
  button.textContent = 'Mensagem enviada!';
  button.disabled = true;
  setTimeout(() => {
    button.textContent = original;
    button.disabled = false;
    form.reset();
  }, 2600);
});
