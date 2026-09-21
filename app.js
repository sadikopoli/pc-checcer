const defaultSystem = {
  cpu: {
    brand: 'Intel Core i5',
    cores: '6 core',
    freq: '3.3 GHz'
  },
  gpu: {
    name: 'NVIDIA GeForce RTX 3060',
    vram: '12 GB'
  },
  memory: {
    total: '16 GB',
    type: 'DDR4'
  },
  storage: {
    used: '465 GB / 512 GB',
    kind: 'SSD NVMe'
  },
  score: 78,
  performance: 'Buone',
  performanceText: 'CPU e scheda video solide, con spazio da migliorare sullo storage.',
  adviceTitle: 'Più spazio per i tuoi progetti',
  adviceText: 'Il tuo disco è quasi pieno. Un SSD più capiente renderà il PC più veloce e ti darà lo spazio che ti serve.',
  impact: '+18% velocità percepita',
  investment: '€ 60–90 circa',
  insightTitle: 'Un piccolo upgrade, una grande differenza.',
  insightText: 'La tua CPU e la scheda video sono ancora ottime. Concentrati sullo spazio di archiviazione per un risultato immediato.'
};

const components = [
  { icon: '⌘', color: 'blue', name: 'Processore', detailKey: 'cpu' },
  { icon: '▰', color: 'pink', name: 'Scheda video', detailKey: 'gpu' },
  { icon: '▱', color: 'yellow', name: 'Memoria RAM', detailKey: 'memory' },
  { icon: '◫', color: 'green', name: 'Archiviazione', detailKey: 'storage' }
];

function formatCpuDetail(cpu) {
  return `${cpu.brand || 'CPU'} · ${cpu.cores || '8 core'} · ${cpu.freq || '3 GHz'}`;
}

function formatGpuDetail(gpu) {
  return `${gpu.name || 'Scheda video'} · ${gpu.vram || '8 GB'}`;
}

function formatMemoryDetail(memory) {
  return `${memory.total || '16 GB'} · ${memory.type || 'DDR4'}`;
}

function formatStorageDetail(storage) {
  return `${storage.kind || 'SSD'} · ${storage.used || '465 GB / 512 GB'}`;
}

function buildComponentRows(system) {
  const rows = components.map((item) => {
    let detail = '';
    let score = '72%';

    if (item.detailKey === 'cpu') {
      detail = formatCpuDetail(system.cpu);
      score = '92%';
    }
    if (item.detailKey === 'gpu') {
      detail = formatGpuDetail(system.gpu);
      score = '64%';
    }
    if (item.detailKey === 'memory') {
      detail = formatMemoryDetail(system.memory);
      score = '74%';
    }
    if (item.detailKey === 'storage') {
      detail = formatStorageDetail(system.storage);
      score = '45%';
    }

    return `
      <div class="component-row">
        <div class="component-icon ${item.color}">${item.icon}</div>
        <div>
          <span class="component-name">${item.name}</span>
          <span class="component-detail">${detail}</span>
        </div>
        <div class="bar" title="Stato: ${score}"><i class="${item.color === 'blue' ? 'b1' : item.color === 'pink' ? 'b2' : item.color === 'yellow' ? 'b3' : 'b4'}"></i></div>
      </div>
    `;
  }).join('');

  document.getElementById('componentList').innerHTML = rows;
}

function updateSummary(system) {
  const score = Number(system.score || 78);
  const scoreRing = document.getElementById('scoreRing');
  scoreRing.style.setProperty('--value', score);

  document.getElementById('score').textContent = score;
  document.getElementById('scoreLabel').textContent = score;
  document.getElementById('performanceLabel').textContent = system.performance || 'Buone';
  document.getElementById('performanceText').textContent = system.performanceText || 'Rilevamento completato.';
  document.getElementById('tempValue').textContent = `${system.temperature || 38}° `;
  document.getElementById('tempValue').innerHTML = `${system.temperature || 38}° <small>C</small>`;
  document.getElementById('tempText').textContent = system.tempText || '✓ Tutto nella norma';
  document.getElementById('adviceTitle').textContent = system.adviceTitle || 'Più spazio per i tuoi progetti';
  document.getElementById('adviceText').textContent = system.adviceText || 'Lo storage è il punto da migliorare subito.';
  document.getElementById('impactValue').textContent = system.impact || '+18% velocità percepita';
  document.getElementById('investmentValue').textContent = system.investment || '€ 60–90 circa';
  document.getElementById('insightTitle').textContent = system.insightTitle || 'Un piccolo upgrade, una grande differenza.';
  document.getElementById('insightText').textContent = system.insightText || 'Ti aiuta a capire dove conviene spendere.';
  document.getElementById('priorityBadge').textContent = system.priority || 'PRIORITÀ MEDIA';

  const trendEl = document.getElementById('trendValue');
  trendEl.textContent = `↗ ${system.trend || '+4%'} `;
}

function applyGreeting() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Buongiorno' : hour >= 18 ? 'Buonasera' : 'Buon pomeriggio';
  document.getElementById('greetingLine').innerHTML = `${greeting}, <em>utente</em>.<br>Conosci meglio il tuo PC.`;
}

async function loadSystemInfo() {
  try {
    if (window.pcCheccerAPI && typeof window.pcCheccerAPI.getSystemInfo === 'function') {
      const info = await window.pcCheccerAPI.getSystemInfo();
      if (info && info.cpu) {
        updateSummary({
          ...defaultSystem,
          cpu: { brand: info.cpu.brand || defaultSystem.cpu.brand, cores: info.cpu.cores || defaultSystem.cpu.cores, freq: info.cpu.speed || defaultSystem.cpu.freq },
          gpu: { name: info.gpu?.controllers?.[0]?.model || defaultSystem.gpu.name, vram: info.gpu?.controllers?.[0]?.vram || defaultSystem.gpu.vram },
          memory: { total: `${Math.round((info.mem?.total || 16) / 1024 / 1024 / 1024)} GB`, type: 'DDR4' },
          storage: { kind: 'SSD NVMe', used: info.storage?.used || '465 GB / 512 GB' },
          score: info.score || defaultSystem.score,
          performance: info.performance || 'Buone',
          performanceText: info.performanceText || defaultSystem.performanceText,
          adviceTitle: info.adviceTitle || defaultSystem.adviceTitle,
          adviceText: info.adviceText || defaultSystem.adviceText,
          impact: info.impact || defaultSystem.impact,
          investment: info.investment || defaultSystem.investment,
          insightTitle: info.insightTitle || defaultSystem.insightTitle,
          insightText: info.insightText || defaultSystem.insightText,
          priority: info.priority || 'PRIORITÀ MEDIA',
          temperature: info.temperature || 38,
          tempText: info.tempText || '✓ Tutto nella norma',
          trend: info.trend || '+4%'
        });
        buildComponentRows({
          cpu: { brand: info.cpu.brand || defaultSystem.cpu.brand, cores: info.cpu.cores || defaultSystem.cpu.cores, freq: info.cpu.speed || defaultSystem.cpu.freq },
          gpu: { name: info.gpu?.controllers?.[0]?.model || defaultSystem.gpu.name, vram: info.gpu?.controllers?.[0]?.vram || defaultSystem.gpu.vram },
          memory: { total: `${Math.round((info.mem?.total || 16) / 1024 / 1024 / 1024)} GB`, type: 'DDR4' },
          storage: { kind: 'SSD NVMe', used: info.storage?.used || '465 GB / 512 GB' }
        });
        return;
      }
    }
  } catch (error) {
    console.warn('Rilevamento hardware non disponibile, uso dati demo:', error);
  }

  buildComponentRows(defaultSystem);
  updateSummary(defaultSystem);
}

const toast = document.getElementById('toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

document.getElementById('scanBtn').addEventListener('click', async () => {
  const button = document.getElementById('scanBtn');
  button.disabled = true;
  button.innerHTML = '<span class="scan-icon">◌</span> Analisi in corso...';

  try {
    await loadSystemInfo();
    showToast('Analisi aggiornata ✓');
  } finally {
    button.disabled = false;
    button.innerHTML = '<span class="scan-icon">↻</span> Aggiorna analisi';
  }
});

document.getElementById('detailsBtn').addEventListener('click', () => {
  showToast('Tutti i componenti sono aggiornati');
});

document.getElementById('upgradeBtn').addEventListener('click', () => {
  showToast('Consiglio: SSD NVMe da 1 TB');
});

document.querySelector('.close-insight').addEventListener('click', (event) => {
  event.currentTarget.closest('.insight-strip').remove();
});

applyGreeting();
buildComponentRows(defaultSystem);
updateSummary(defaultSystem);
loadSystemInfo();
