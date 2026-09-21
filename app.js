const components = [
  { icon: '⌘', color: 'blue', name: 'Processore', detail: 'Intel Core i5-12400F · 6 core', score: '92%', bar: 'b1' },
  { icon: '▰', color: 'pink', name: 'Scheda video', detail: 'NVIDIA GeForce RTX 3060 · 12 GB', score: '64%', bar: 'b2' },
  { icon: '▱', color: 'yellow', name: 'Memoria RAM', detail: '16 GB DDR4 · 3200 MHz', score: '74%', bar: 'b3' },
  { icon: '◫', color: 'green', name: 'Archiviazione', detail: 'SSD NVMe · 465 GB / 512 GB', score: '45%', bar: 'b4' }
];

const list = document.querySelector('#componentList');
list.innerHTML = components.map(item => `
  <div class="component-row">
    <div class="component-icon ${item.color}">${item.icon}</div>
    <div><span class="component-name">${item.name}</span><span class="component-detail">${item.detail}</span></div>
    <div class="bar" title="Stato: ${item.score}"><i class="${item.bar}"></i></div>
  </div>`).join('');

const toast = document.querySelector('#toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

document.querySelector('#scanBtn').addEventListener('click', (event) => {
  const button = event.currentTarget;
  button.disabled = true;
  button.innerHTML = '<span class="scan-icon">◌</span> Analisi in corso...';
  setTimeout(() => {
    button.disabled = false;
    button.innerHTML = '<span class="scan-icon">↻</span> Rifai la scansione';
    showToast('Scansione completata ✓');
  }, 1200);
});

document.querySelector('#detailsBtn').addEventListener('click', () => {
  showToast('Tutti i componenti sono aggiornati');
});

document.querySelector('#upgradeBtn').addEventListener('click', () => {
  showToast('Consiglio: SSD NVMe da 1 TB');
});

document.querySelector('.close-insight').addEventListener('click', (event) => {
  event.currentTarget.closest('.insight-strip').remove();
});

// Aggiorna il saluto in base all'ora locale senza raccogliere dati personali.
const hour = new Date().getHours();
if (hour < 12) document.querySelector('.hero h1').innerHTML = 'Buongiorno, <em>Simone</em>.<br>Conosci meglio il tuo PC.';
else if (hour >= 18) document.querySelector('.hero h1').innerHTML = 'Buonasera, <em>Simone</em>.<br>Conosci meglio il tuo PC.';
