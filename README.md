# PC Checcer — versione browser

PC Checcer è una dashboard web in italiano con UI responsive per mostrare i componenti di un PC e suggerire quale upgrade conviene fare.

## Avvio rapido

Non servono installazioni: apri direttamente `index.html` con Chrome, Edge o Firefox.

In alternativa, dalla cartella del progetto puoi usare un server locale:

```bash
npx serve .
```

Poi apri l'indirizzo mostrato nel terminale.

## Pubblicazione online

Puoi caricare il repository su GitHub Pages, Netlify o Vercel. È un'app statica composta da `index.html`, `styles.css` e `app.js`.

## Nota importante

Per motivi di sicurezza, una pagina web normale non può leggere liberamente CPU, GPU, RAM, temperature e dischi del computer. La dashboard usa dati dimostrativi. Per rilevare davvero l'hardware serve un'app desktop, un'estensione del browser con permessi specifici o un piccolo programma locale collegato alla pagina.
