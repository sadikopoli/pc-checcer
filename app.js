const components = [
  { icon: '⌘', color: 'blue', name: 'Processore', detail: 'Intel Core i5-12400F · 6 core', score: 92, bar: 'b1', status: 'Benissimo' },
  { icon: '▰', color: 'pink', name: 'Scheda video', detail: 'NVIDIA GeForce RTX 3060 · 12 GB', score: 64, bar: 'b2', status: 'Buono' },
  { icon: '▱', color: 'yellow', name: 'Memoria RAM', detail: '16 GB DDR4 · 3200 MHz', score: 74, bar: 'b3', status: 'Buono' },
  { icon: '◫', color: 'green', name: 'Archiviazione', detail: 'SSD NVMe · 465 GB / 512 GB', score: 45, bar: 'b4', status: 'Da migliorare' }
];

const componentList = document.getElementById('componentList');
const toast = document.getElementById('toast');
let toastTimer;

function componentMarkup(item, compact = false) {
  return `<div class="${compact ? 'modal-component-row' : 'component-row'}"><div class="component-icon ${item.color}">${item.icon}</div><div><span class="component-name">${item.name}</span><span class="component-detail">${item.detail}</span></div>${compact ? `<strong class="component-status ${item.score >= 85 ? 'excellent-text' : item.score >= 60 ? 'good-text' : 'okay-text'}">${item.status}</strong>` : `<div class="bar" title="Stato: ${item.score}%"><i class="${item.bar}"></i></div>`}</div>`;
}

function renderComponents() {
  componentList.innerHTML = components.map(item => componentMarkup(item)).join('');
}

function renderDetailsModal() {
  document.getElementById('modalComponentList').innerHTML = components.map(item => componentMarkup(item, true)).join('');
  const average = Math.round(components.reduce((total, item) => total + item.score, 0) / components.length);
  const donut = document.getElementById('healthDonut');
  donut.style.setProperty('--value', average);
  donut.querySelector('strong').textContent = average;
  const title = average >= 85 ? 'Benissimo' : average >= 70 ? 'Buono' : average >= 55 ? 'Non male' : 'Da migliorare';
  document.getElementById('healthTitle').textContent = title;
  document.getElementById('healthText').textContent = average >= 70 ? 'La configurazione è equilibrata. Hai una buona base per lavorare e giocare.' : 'Il PC funziona, ma alcuni componenti possono essere migliorati per ottenere più velocità.';
}

function renderUpgradeModal() {
  const recommendations = [
    { rank: '01', icon: '◫', color: 'green', name: 'SSD NVMe da 1 TB', why: 'Più spazio e caricamenti più rapidi', price: '€ 60–90', priority: 'Priorità alta' },
    { rank: '02', icon: '▱', color: 'yellow', name: 'RAM 32 GB DDR4', why: 'Più fluidità con molti programmi aperti', price: '€ 55–80', priority: 'Priorità media' },
    { rank: '03', icon: '▰', color: 'pink', name: 'Scheda video più recente', why: 'Upgrade utile soprattutto per il gaming', price: '€ 300+', priority: 'Priorità bassa' }
  ];
  document.getElementById('upgradeList').innerHTML = recommendations.map(item => `<div class="upgrade-row"><span class="upgrade-rank">${item.rank}</span><div class="component-icon ${item.color}">${item.icon}</div><div class="upgrade-copy"><strong>${item.name}</strong><span>${item.why}</span></div><div class="upgrade-price"><strong>${item.price}</strong><span>${item.priority}</span></div></div>`).join('');
}

function showModal(id) {
  const modal = document.getElementById(id);
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  modal.querySelector('.modal-close').focus();
}

function closeModal(id) {
  const modal = document.getElementById(id);
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  if (!document.querySelector('.modal-backdrop.is-open')) document.body.classList.remove('modal-open');
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

function detectOperatingSystem() {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Windows')) return 'Windows · 64 bit';
  if (userAgent.includes('Mac')) return 'macOS · 64 bit';
  if (userAgent.includes('Linux')) return 'Linux · 64 bit';
  return 'Sistema operativo non rilevato';
}

document.getElementById('scanBtn').addEventListener('click', (event) => {
  const button = event.currentTarget;
  button.disabled = true;
  button.innerHTML = '<span class="scan-icon">◌</span> Analisi in corso...';
  setTimeout(() => { button.disabled = false; button.innerHTML = '<span class="scan-icon">↻</span> Aggiorna analisi'; showToast('Analisi aggiornata ✓'); }, 900);
});

document.getElementById('detailsBtn').addEventListener('click', () => { renderDetailsModal(); showModal('detailsModal'); });
document.getElementById('upgradeBtn').addEventListener('click', () => { renderUpgradeModal(); showModal('upgradeModal'); });
document.querySelector('.close-insight').addEventListener('click', (event) => event.currentTarget.closest('.insight-strip').remove());
document.querySelectorAll('[data-close-modal]').forEach(button => button.addEventListener('click', () => closeModal(button.dataset.closeModal)));
document.querySelectorAll('.modal-backdrop').forEach(backdrop => backdrop.addEventListener('click', (event) => { if (event.target === backdrop) closeModal(backdrop.id); }));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') document.querySelectorAll('.modal-backdrop.is-open').forEach(modal => closeModal(modal.id)); });

const hour = new Date().getHours();
const greeting = hour < 12 ? 'Buongiorno' : hour >= 18 ? 'Buonasera' : 'Buon pomeriggio';
document.getElementById('greetingLine').innerHTML = `${greeting}, <em>utente</em>.<br>Conosci meglio il tuo PC.`;
document.getElementById('osInfo').textContent = detectOperatingSystem();
renderComponents();
