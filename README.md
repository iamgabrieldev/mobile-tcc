# Carbon Footprint Calculator

**Personal Carbon Footprint Tracking on Mobile**
(*Calculadora de Pegada de Carbono*)

A mobile application, built with React Native and Expo, that calculates and monitors a person's
carbon footprint from their daily habits. Users record their daily consumption of transport,
electricity and gas, and the application converts it into CO₂ emissions using emission factors
based on IPCC guidelines, tracks the monthly trend, suggests ways to reduce emissions and rewards
reductions through a points-based ranking.

> This application was developed as an undergraduate final project (*Trabalho de Conclusão de
> Curso*).

**Authors**

- André Luiz Przybysz
- Gabriel Fernando Sousa de Oliveira
- Regina Negri Pagani
- Eduardo F. Damasceno
- Eduarda Maganha de Almeida

## Overview

The application covers the full cycle of personal emissions tracking. Daily consumption is
recorded per category and converted into emissions locally on the device. Reports show how
emissions evolve month by month and how they are distributed across categories, and the data
can be exported to PDF or CSV. Tips are generated from the user's own consumption pattern.

Version 2.0 added four features on top of this core: a global ranking, AI-based habit analysis
with Google Gemini Pro, an estimate of how many trees would offset the user's emissions, and a
points system that rewards reductions. A quick guide to these features is available in
[GUIA_RAPIDO_NOVAS_FEATURES.md](./GUIA_RAPIDO_NOVAS_FEATURES.md).

**Interface language.** The application interface is written in Brazilian Portuguese. The source
code and this README are in English.

## Features

### Home

Shows the emissions for the current day and a monthly summary, with cards breaking emissions
down by category and shortcuts to consumption recording and reports.

### Consumption recording

An input form for daily consumption, organised in four categories: land transport (with vehicle
type selection), air transport (domestic or international), electricity (kWh) and gas (LPG or
natural gas). Emissions are calculated automatically, input is validated, and every record feeds
the points system.

### Reports

A line chart of the monthly trend over the last six months, a pie chart of the distribution per
category, a detailed statistical summary, and export to PDF and CSV.

### Personalised tips

Tips based on the user's consumption pattern, classified by impact (very high, high, medium,
low) and organised by category, with practical and actionable suggestions.

### Ranking

A global ranking of users with filters by period (overall, weekly, daily), the user's own
position, medals for the top three and points-based gamification that encourages friendly
competition around sustainability.

### Profile

Personal statistics (total monthly emissions, accumulated points and breakdown per category),
AI habit analysis, the tree offset calculation and settings (Gemini API key management and
logout).

The AI analysis uses Google Gemini Pro to produce a personalised review of the user's habits:
strengths, areas for improvement, specific practical recommendations and personalised goals.
Without an API key the application falls back to a basic analysis.

The tree calculation estimates how many trees would have to be planted to offset the user's
emissions, together with motivational messages and educational information about the impact.

### Points system

Users earn 10 points per kg of CO₂ reduced and lose points when their emissions increase.
Points are tracked daily, weekly and in total, and they determine the user's position in the
ranking.

## Requirements

All requirements listed below are implemented.

### Functional requirements

| ID   | Requirement |
|------|-------------|
| FR01 | Daily consumption recording (transport, energy, food and gas) |
| FR02 | Automatic carbon footprint calculation using IPCC factors |
| FR03 | Monthly comparative reports with charts |
| FR04 | Personalised tips for reducing emissions |
| FR05 | Data export to PDF and CSV |

### Non-functional requirements

| ID    | Requirement |
|-------|-------------|
| NFR01 | Response time under 2 s for local calculations |
| NFR02 | High availability (local storage plus Firebase) |
| NFR03 | Compatibility with Android 10+ and iOS 14+ (through Expo) |
| NFR04 | Secure storage with Firebase Auth |
| NFR05 | Accessible and responsive interface |

### Business rules

| ID   | Rule |
|------|------|
| BR01 | Emission factors follow the IPCC 2023 guidelines |
| BR02 | E-mail verification is mandatory |
| BR03 | Comparative data is anonymised |
| BR04 | Calculations are rounded to two decimal places |
| BR05 | History is kept for 24 months |

## Emission factors

The factors are defined in `src/constants/emissionFactors.js`.

| Category | Source | Factor | Unit |
|----------|--------|--------|------|
| Land transport | Small car (up to 1.4 L), petrol | 0.192 | kg CO₂/km |
| Land transport | Medium car (1.5 to 2.0 L), petrol | 0.232 | kg CO₂/km |
| Land transport | Large car (over 2.0 L), petrol | 0.250 | kg CO₂/km |
| Land transport | Car, diesel | 0.250 | kg CO₂/km |
| Land transport | Urban bus, diesel | 0.105 | kg CO₂/km |
| Land transport | Intercity bus, diesel | 0.060 | kg CO₂/km |
| Air transport | Domestic flight (round trip) | 0.150 | kg CO₂/km |
| Air transport | International flight (round trip) | 0.200 | kg CO₂/km |
| Electricity | Brazilian average | 0.084 | kg CO₂/kWh |
| Gas | Liquefied petroleum gas (LPG, cooking gas) | 2.983 | kg CO₂/kg |
| Gas | Natural gas (NG) | 2.000 | kg CO₂/m³ |

## Architecture

The application is a single Expo project. Emission calculations run locally on the device, and
external services are used for authentication, shared data and AI analysis:

```
User (Expo app)
   |
   |-- AsyncStorage          local data and local calculations
   |-- Firebase Auth         e-mail/password login and e-mail verification
   |-- Firestore             points and ranking
   |-- Google Gemini API     habit analysis (optional)
```

Business logic lives in `src/services/`:

| Module | Responsibility |
|--------|----------------|
| `carbonCalculator` | Converts recorded consumption into CO₂ emissions |
| `storageService`   | Local persistence |
| `tipsService`      | Personalised tips |
| `pointsService`    | Points system |
| `geminiService`    | Integration with Google Gemini |
| `treeService`      | Tree offset calculation |

Authentication state is shared across screens through `src/contexts/AuthContext.js`, and
navigation is configured in `src/navigation/AppNavigator.js`.

## Stack

React Native, Expo, Firebase (Auth and Firestore), AsyncStorage, React Navigation,
React Native Chart Kit, Expo Print and Expo Sharing, Google Gemini.

## Getting started

### Prerequisites

Node.js 18+, npm or yarn, Expo CLI and a Firebase account.

### Installation

```bash
git clone <repository-url>
cd mobile-tcc
npm install
```

### Firebase configuration

1. Create a project in the [Firebase Console](https://console.firebase.google.com/).
2. Enable e-mail/password authentication.
3. Enable Firestore Database, which is required for the ranking and the points system.
4. Configure the Firestore security rules.
5. Copy the project credentials into `src/config/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

The full Firestore setup guide is in [FIRESTORE_SETUP.md](./FIRESTORE_SETUP.md).

### Google Gemini configuration (optional)

AI habit analysis requires a Gemini API key, which can be obtained from
[Google AI Studio](https://makersuite.google.com/app/apikey). The key is entered in the
application itself, on the Profile screen. Full instructions are in
[GEMINI_SETUP.md](./GEMINI_SETUP.md).

The application works normally without a key, using the basic analysis instead.

### Running

```bash
npm start
```

Then run on a device or emulator:

```bash
npm run android
npm run ios
```

Alternatively, scan the QR Code shown by `npm start` with the Expo Go app.

## Design

The interface follows Material Design, with a green colour scheme (sustainability) and orange
accents. It uses adequate contrast and legible font sizes, adapts to different screen sizes,
and gives clear visual feedback through loading states and confirmations.

## Security and privacy

- Authentication through Firebase Auth, with mandatory e-mail verification.
- Encrypted local storage (AsyncStorage).
- Personal data is not shared with other users; comparative data is anonymised.
- Compliance with the LGPD (*Lei Geral de Proteção de Dados*, Brazil's General Data Protection
  Law).

## Roadmap

Planned improvements, not yet implemented:

- Full offline mode
- Push notifications for reminders
- Additional badges and achievements
- Comparison with regional and national averages
- Integration with public transport APIs
- Dark mode
- Multi-language support
- Friends and sharing
- Weekly and monthly challenges
- Detailed points history

## Supplementary documentation

| File | Content |
|------|---------|
| [GUIA_RAPIDO_NOVAS_FEATURES.md](./GUIA_RAPIDO_NOVAS_FEATURES.md) | Quick guide to the version 2.0 features |
| [NOVAS_FUNCIONALIDADES.md](./NOVAS_FUNCIONALIDADES.md) | Detailed documentation of the version 2.0 features |
| [FIRESTORE_SETUP.md](./FIRESTORE_SETUP.md) | Firestore setup |
| [GEMINI_SETUP.md](./GEMINI_SETUP.md) | Google Gemini setup |

## Repository layout

```
mobile-tcc/
  src/
    components/    reusable components (Button, Card, EmissionCard, Input, TipCard)
    config/        Firebase configuration
    constants/     colours and emission factors
    contexts/      authentication context
    navigation/    navigation setup
    screens/       Home, Login, Signup, Register, Reports, Tips, Ranking, Profile
    services/      calculation, storage, tips, points, Gemini and tree services
  App.js           root component
  app.json         Expo configuration
  package.json     dependencies
```

## Contributing

Contributions are welcome:

1. Fork the project.
2. Create a branch for your feature (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## Support

For questions or support, open an issue in the repository.

## License

This project was developed for academic purposes as an undergraduate final project
(*Trabalho de Conclusão de Curso*).
