# Salesviewer React App (English)

This project is a frontend implementation of the Salesviewer a section application. It was created as part of an interview test for the Salesviewer company.

## Table of Contents

- [Project Overview](#project-overview)
- [Installation and Setup](#installation-and-setup)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Data Flow](#data-flow)
- [Chatbot Integration](#chatbot-integration)
- [TypeScript Usage](#typescript-usage)
- [Responsive Design](#responsive-design)
- [Screenshots](#screenshots)
- [License](#license)

---

## Project Overview

The Salesviewer React App is designed to manage and display session data. This project is built using React and leverages TypeScript for type safety. The application supports features like sorting and grouping session data, as well as integrating a chatbot for user interaction.

## Installation and Setup

To run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/salesviewer-react-app.git
   cd salesviewer-react-app
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Start the development server:
   ```bash
   yarn start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode. The page will reload if you make edits.

### `yarn test`

Launches the test runner in interactive watch mode.

### `yarn build`

Builds the app for production to the `build` folder.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

## Project Structure

```
Home
├── Header and MainMenu (Dummy component for decoration)
├── SessionTable
│   ├── TableHeader        (Handles sorting functionality)
│   ├── TableBody          (Manages and displays sorted and grouped rows)
│   │   └── TableRow       (Displays individual session data)
│   │       └── PopupMenu   (Appears inside TableRow for additional actions)
```

## Data Flow

Data for the application is sourced from a JSON file containing session information. Each component is responsible for a specific part of the data display and interaction, ensuring a modular structure.

## Chatbot Integration

The application includes a chatbot feature implemented using the React Simple Chatbot library GPT 3.5 Turbo. This provides users with an interactive way to ask questions and get assistance within the application. It gives vision how we can assist the user with the application.

## TypeScript Usage

TypeScript is used throughout the application to ensure type safety and improve the developer experience. Each component has defined prop types, and data interfaces are set up for clarity and maintenance.

## Responsive Design

The application is designed to be responsive, adapting to various screen sizes for optimal usability on both desktop and mobile devices.

## Screenshots

![Screenshot 2024-10-23 at 00 06 21](https://github.com/user-attachments/assets/59cae592-287b-41b8-9d73-1d2ec99545ce)
![Screenshot 2024-10-23 at 00 06 37](https://github.com/user-attachments/assets/6631d800-01f6-4172-96b5-d8ae16597466)

## Deployment (Vercel Lazy load)

[Sales Viewer Live Demo](https://salesviewer.vercel.app/)
Pleasem,try this package localy for testing filters.
as its slow on vercel.

Reasons for Slowness on Vercel:

	1.	Large Dataset Loading: Loading all JSON data at once increases initial load times and slows filtering.
	2.	Client-Side Filtering: Filtering happens on the client-side, processing the entire dataset, which is inefficient with larger data.
	3.	Virtual Table Rendering: Managing large data sets in the DOM without pagination affects performance.
	4.	Network Latency: Cloud-based performance can be affected by network delays.

Solutions for Real Application:

	1.	Server-Side Filtering: Move filtering operations to the server, returning only relevant results based on user criteria.
	2.	Pagination or Infinite Scrolling: Load a limited number of records initially to reduce data handling and improve load times.
	3.	Optimize Data Structures: Flatten JSON data and use efficient formats to speed up filtering.
	4.	Caching: Implement caching strategies for frequently accessed data to minimize network requests.
	5.	Web Workers: Use Web Workers for background filtering to keep the UI responsive.
	6.	Throttling/Debouncing: Limit filter operations triggered by user input to reduce processing frequency.
	7.	Server-Side Rendering (SSR): Consider SSR for pre-rendering pages, improving load times and user experience.

## License

This project is licensed under the MIT License -
Contact me for more information.
aprin.farbod@gmail.com
Dr. -Ing Farbod Aprin

---

# Salesviewer React App - Deutsche Version

Dieses Projekt ist eine Frontend-Implementierung der Salesviewer-Anwendung. Es wurde als Teil eines Vorstellungsgesprächs für das Unternehmen Salesviewer erstellt.

## Inhaltsverzeichnis

- [Projektübersicht](#projektübersicht)
- [Installation und Einrichtung](#installation-und-einrichtung)
- [Verfügbare Skripte](#verfügbare-skripte)
- [Projektstruktur](#projektstruktur)
- [Datenfluss](#datenfluss)
- [Chatbot-Integration](#chatbot-integration)
- [Verwendung von TypeScript](#verwendung-von-typescript)
- [Responsive Design](#responsive-design)
- [Screenshots](#screenshots)
- [Lizenz](#lizenz)

---

## Projektübersicht

Die Salesviewer React App ist dafür konzipiert, Sitzungsdaten zu verwalten und anzuzeigen. Dieses Projekt wurde mit React erstellt und verwendet TypeScript für die Typensicherheit. Die Anwendung unterstützt Funktionen wie Sortieren und Gruppieren von Sitzungsdaten sowie die Integration eines Chatbots zur Benutzerinteraktion.

## Installation und Einrichtung

Um das Projekt lokal auszuführen, folgen Sie diesen Schritten:

1. Klonen Sie das Repository:

   ```bash
   git clone https://github.com/your-username/salesviewer-react-app.git
   cd salesviewer-react-app
   ```

2. Abhängigkeiten installieren:

   ```bash
   yarn install
   ```

3. Starten Sie den Entwicklungsserver:
   ```bash
   yarn start
   ```
   Öffnen Sie [http://localhost:3000](http://localhost:3000), um es in Ihrem Browser anzuzeigen.

## Verfügbare Skripte

Im Projektverzeichnis können Sie Folgendes ausführen:

### `yarn start`

Führt die App im Entwicklungsmodus aus. Die Seite wird neu geladen, wenn Sie Änderungen vornehmen.

### `yarn test`

Startet den Testläufer im interaktiven Überwachungsmodus.

### `yarn build`

Baut die App für die Produktion im `build`-Ordner.

### `yarn eject`

**Hinweis: Dies ist eine einseitige Operation. Sobald Sie `eject` verwenden, können Sie nicht zurückkehren!**

## Projektstruktur

```
Home
├── Header und MainMenu (Dummy-Komponente zur Dekoration)
├── SessionTable
│   ├── TableHeader        (Verwaltet die Sortierfunktionalität)
│   ├── TableBody          (Verwaltet und zeigt sortierte und gruppierte Zeilen an)
│   │   └── TableRow       (Zeigt individuelle Sitzungsdaten an)
│   │       └── PopupMenu   (Erscheint innerhalb von TableRow für zusätzliche Aktionen)
```

## Datenfluss

Die Daten für die Anwendung stammen aus einer JSON-Datei, die Sitzungsinformationen enthält. Jede Komponente ist für einen bestimmten Teil der Datenanzeige und -interaktion verantwortlich, um eine modulare Struktur zu gewährleisten.

## Chatbot-Integration

Die Anwendung umfasst eine Chatbot-Funktion, die mit der React Simple Chatbot-Bibliothek GPT 3.5 Turbo implementiert wurde. Dies bietet den Benutzern eine interaktive Möglichkeit, Fragen zu stellen und innerhalb der Anwendung Hilfe zu erhalten. Es gibt einen visuellen Eindruck darüber, wie wir dem Benutzer mit der Anwendung helfen können.

## Verwendung von TypeScript

TypeScript wird in der gesamten Anwendung verwendet, um die Typensicherheit zu gewährleisten und die Entwicklererfahrung zu verbessern. Jede Komponente hat definierte Prop-Typen, und Dateninterfaces sind zur Klarheit und Wartung eingerichtet.

## Responsive Design

Die Anwendung ist so konzipiert, dass sie responsive ist und sich an verschiedene Bildschirmgrößen anpasst, um eine optimale Benutzerfreundlichkeit auf Desktop- und Mobilgeräten zu gewährleisten.

## Screenshots

![Screenshot 2024-10-23 at 00 06 21](https://github.com/user-attachments/assets/59cae592-287b-41b8-9d73-1d2ec99545ce)
![Screenshot 2024-10-23 at 00 06 37](https://github.com/user-attachments/assets/6631d800-01f6-4172-96b5-d8ae16597466)

## Deplyment 

[Sales Viewer Live Demo](https://salesviewer.vercel.app/)

Gründe für die Langsamkeit auf Vercel

	1.	Laden großer Datensätze: Das gleichzeitige Laden aller JSON-Daten erhöht die initialen Ladezeiten und verlangsamt die Filterung.
	2.	Client-seitige Filterung: Die Filterung erfolgt clientseitig, wobei der gesamte Datensatz verarbeitet wird, was bei größeren Daten ineffizient ist.
	3.	Rendering der virtuellen Tabelle: Das Verwalten großer Datensätze im DOM ohne Pagination beeinträchtigt die Leistung.
	4.	Netzwerklatenz: Die Leistung in der Cloud kann durch Netzwerkverzögerungen beeinträchtigt werden.

Lösungen für die reale Anwendung

	1.	Server-seitige Filterung: Verschieben Sie Filteroperationen auf den Server und geben Sie nur relevante Ergebnisse basierend auf den Benutzerkriterien zurück.
	2.	Pagination oder unendliches Scrollen: Laden Sie zunächst eine begrenzte Anzahl von Datensätzen, um die Datenverarbeitung zu reduzieren und die Ladezeiten zu verbessern.
	3.	Datenstrukturen optimieren: Flachere JSON-Daten verwenden und effiziente Formate nutzen, um die Filterung zu beschleunigen.
	4.	Caching: Implementieren Sie Caching-Strategien für häufig verwendete Daten, um Netzwerkrequests zu minimieren.
	5.	Web-Worker: Verwenden Sie Web-Worker für die Hintergrundfilterung, um die Benutzeroberfläche reaktionsfähig zu halten.
	6.	Throttling/Debouncing: Begrenzen Sie die Filteroperationen, die durch Benutzereingaben ausgelöst werden, um die Verarbeitungsfrequenz zu reduzieren.
	7.	Server-seitiges Rendering (SSR): Ziehen Sie SSR in Betracht, um Seiten im Voraus zu rendern, was Ladezeiten und Benutzererfahrung verbessert.

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert -
Kontaktieren Sie mich für weitere Informationen.
aprin.farbod@gmail.com
Dr. -Ing Farbod Aprin

