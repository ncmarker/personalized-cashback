# Personalized Cashback

This is a full-stack project that simulates retail transactions and store inventory reports, providing personalized cashback recommendations using syntehtically generated data. The backend is powered by Docker, while the frontend is built with React Native and runs with Expo.

---

## 🚀 Getting Started

Follow the instructions below to run the application on your local machine.

### ✅ Requirements

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [Docker](https://www.docker.com/products/docker-desktop)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)
- A phone with [Expo Go](https://expo.dev/client) installed (iOS or Android), or a browser
- Git (if cloning instead of downloading the zip)

---

## 📁 Project Structure

```
personalized-cashback/
│
├── backend/              # typescript backend, containerized with Docker
│
├── frontend/             # React Native app using Expo
│
├── schemas/              # Format for generated data 
│
├── docker-compose.yml    # Spins up backend services
│
└── README.md             # This file
```

---

## 🛠️ Setup Instructions

### 1. Clone the Repository or Download ZIP

If using Git:

```bash
git clone https://github.com/ncmarker/personalized-cashback.git
cd personalized-cashback
```

Or download the ZIP from GitHub and extract it.

---

### 2. Start the Backend (Docker)

In the root directory of the project:

```bash
docker-compose up -d
```

This starts the backend services in detached mode. The backend will take ~60 seconds to fully initialize.

---

### 3. Start the Frontend (Expo)

In a **new terminal**, navigate to the frontend directory:

```bash
cd frontend
npm install  # Only needed the first time
npm start
```

If you encounter a port conflict, simply press `y` when prompted to use a different port, or manually specify one by running:

```bash
npm start -- --port 8082
```

You’ll be presented with a QR code.

- **Scan the QR with the Expo Go app** on your phone (same Wi-Fi network).
- Or choose to open it in a **web browser** (not all features may work on web).
- If you're on a network with a firewall, run using tunnel mode:

```bash
npx expo start --tunnel
```

---

## 🔍 Viewing Cashback Rewards

1. Wait about **1–2 minutes** for randomized transaction and inventory messages to accumulate.
2. Watch the logs to confirm activity.
3. Once there's enough data, **refresh the cashback rewards** in the app to see personalized recommendations.
4. Note: If no rewards appear, it's likely that the generated data didn’t meet the conditions for a reward.

---

## 🧹 Shutting Down

To stop all backend services:

```bash
docker-compose down
```

---

## 💬 Troubleshooting

- **Docker not found**: Make sure Docker Desktop is installed and running.
- **Expo tunnel issues**: Use `npx expo start --tunnel` especially on university or work Wi-Fi.
- **No rewards showing**: This is expected if random data doesn't meet reward logic; try re-running the backend to generate new data.
- **App not loading on phone**: Make sure your phone and computer are on the same network.

---
