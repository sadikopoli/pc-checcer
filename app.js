const components = [
  { icon: '⌘', color: 'blue', name: 'Processore', detail: 'Intel Core i5-12400F · 6 core', score: '92%', bar: 'b1' },
  { icon: '▰', color: 'pink', name: 'Scheda video', detail: 'NVIDIA GeForce RTX 3060 · 12 GB', score: '64%', bar: 'b2' },
  { icon: '▱', color: 'yellow', name: 'Memoria RAM', detail: '16 GB DDR4 · 3200 MHz', score: '74%', bar: 'b3' },
  { icon: '◫', color: 'green', name: 'Archiviazione', detail: 'SSD NVMe · 465 GB / 512 GB', score: '45%', bar: 'b4' }
];

const componentList = document.getElementById('componentList');
const toast = document.getElementById('toast');
let toastTimer;

function renderComponents() {
  componentList.innerHTML = components.map(item => `
    <div class="component-row">
      <div class="component-icon ${item.color}">${item.icon}</div>
      <div><span class="component-name">${item.name}</span><span class="component-detail">${item.detail}</span></div>
      <div class="bar" title="Stato: ${item.score}"><i class="${item.bar}"></i></div>
    </div>`).join('');
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

function detectOperatingSystem() {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Windows')) return 'Windows 11 Pro · 64 bit';
  if (userAgent.includes('Mac')) return 'macOS Sonoma · 64 bit';
  if (userAgent.includes('Linux')) return 'Linux Ubuntu · 64 bit';
  return 'Sistema operativo non rilevato';
}

document.getElementById('scanBtn').addEventListener('click', (event) => {
  const button = event.currentTarget;
  button.disabled = true;
  button.innerHTML = '<span class="scan-icon">◌</span> Analisi in corso...';
  setTimeout(() => {
    button.disabled = false;
    button.innerHTML = '<span class="scan-icon">↻</span> Aggiorna analisi';
    showToast('Analisi aggiornata ✓');
  }, 900);
});

document.getElementById('detailsBtn').addEventListener('click', () => showToast('Dettagli hardware disponibili nella dashboard'));
document.getElementById('upgradeBtn').addEventListener('click', () => showToast('Consiglio: SSD NVMe da 1 TB'));
document.querySelector('.close-insight').addEventListener('click', (event) => event.currentTarget.closest('.insight-strip').remove());

const hour = new Date().getHours();
const greeting = hour < 12 ? 'Buongiorno' : hour >= 18 ? 'Buonasera' : 'Buon pomeriggio';
document.getElementById('greetingLine').innerHTML = `${greeting}, <em>utente</em>.<br>Conosci meglio il tuo PC.`;
document.getElementById('osInfo').textContent = detectOperatingSystem();
renderComponents();
