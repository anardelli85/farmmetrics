
# **FarmMetrics**

FarmMetrics è un'applicazione sviluppata in **React** che fornisce strumenti interattivi per l'analisi delle performance aziendali nel settore primario. L'app offre funzionalità per visualizzare dati relativi ad appezzamenti, colture e altre metriche chiave, con filtri personalizzabili.

## **Caratteristiche principali**
- **Dashboard interattiva**: Visualizza dati su colture, temperature e metriche di raccolta.
- **Filtri dinamici**: Filtra i dati per intervalli di date, appezzamenti e tipologie di colture.
- **Grafici personalizzati**: Supporta grafici a barre, a linee e altre visualizzazioni interattive.
- **Responsività**: Ottimizzato per desktop e dispositivi mobili.

## **Tecnologie utilizzate**
- **Frontend**: React, React Router, React Bootstrap, Recharts
- **Stili**: CSS personalizzato
- **Gestione del tempo**: date-fns
- **Altro**: react-datepicker, react-select

## **Requisiti**
- **Node.js**: Versione 14 o superiore
- **NPM**: Versione 6 o superiore

## **Installazione**
Per eseguire l'applicazione in locale, segui questi passaggi:

1. Clona il repository:
   ```bash
   git clone https://github.com/anardelli85/farmmetrics.git
   ```

2. Vai nella directory del progetto:
   ```bash
   cd farmmetrics
   ```

3. Installa le dipendenze:
   ```bash
   npm install
   ```

4. Avvia il server di sviluppo:
   ```bash
   npm start
   ```

5. Apri il browser e vai su:
   ```
   http://localhost:3000
   ```

## **Deploy**
L'applicazione è pubblicata su GitHub Pages ed è accessibile al seguente link:

[FarmMetrics su GitHub Pages](https://anardelli85.github.io/farmmetrics)

Per eseguire il deploy, usa il comando:
```bash
npm run deploy
```

## **Struttura del progetto**
La struttura del progetto segue le migliori pratiche di React:

```
src/
├── components/        # Componenti riutilizzabili (es. Navbar, Filtri)
├── pages/             # Pagine principali dell'app (es. Home, Login, NotFound)
├── styles/            # File CSS per stili personalizzati
├── App.js             # Componente principale
├── index.js           # Punto di ingresso dell'app
```

## **Contributi**
Contributi al progetto sono benvenuti! Puoi inviare una pull request o segnalare un problema tramite la sezione **Issues**.


## **Autore**
L'applicazione è stata sviluppata da **Antonio Nardelli**. Per domande o suggerimenti, contatta [antonio.nardelli85@gmail.com](mailto:antonio.nardelli85@gmail.com).
