# FuelEU Compliance Platform

A full-stack application for managing FuelEU Maritime compliance, built with React, Node.js, and TypeScript using Hexagonal Architecture.

## Overview

This project implements a compliance dashboard with the following features:
- **Routes**: View and manage route data.
- **Compare**: Compare route GHG intensity against a baseline.
- **Banking**: Manage compliance surplus banking.
- **Pooling**: Create and validate compliance pools.

## Architecture

The backend follows **Hexagonal Architecture (Ports & Adapters)** to ensure separation of concerns:

- **Core (Domain & Application)**: Contains business logic (Entities, Use Cases) and is independent of frameworks.
- **Adapters (Infrastructure)**: Contains implementations for HTTP (Express Controllers) and Persistence (Repositories).
- **Ports**: Interfaces that define how the Core interacts with the outside world.

## Setup & Run

### Prerequisites
- Node.js (v18+)
- npm

### Running the Application

1.  **Backend**:
    ```bash
    cd backend
    npm install
    npm run dev
    ```
    Runs on `http://localhost:3000`

2.  **Frontend**:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
    Runs on `http://localhost:5173`

## Testing

### Backend
Run unit tests for the core domain logic:
```bash
cd backend
npm test
```

## Screenshots
<img width="1366" height="768" alt="1" src="https://github.com/user-attachments/assets/161a3f68-ac3b-4f2a-a1c9-0a06754870df" />

<img width="1366" height="768" alt="2" src="https://github.com/user-attachments/assets/9d629efb-47b8-409a-b791-5e2f8cf41c68" />

<img width="1366" height="768" alt="3" src="https://github.com/user-attachments/assets/f85707c9-448b-4b6c-a37f-539a09d8ef06" />

<img width="1366" height="768" alt="4" src="https://github.com/user-attachments/assets/ce0844f9-2c53-487b-889b-b16304039c54" />

<img width="1366" height="768" alt="5" src="https://github.com/user-attachments/assets/e1d0da69-a490-49f7-b204-a7bf6f506a16" />


## API Endpoints

- `GET /routes`: Fetch all routes
- `POST /routes/:id/baseline`: Set a route as baseline
- `GET /routes/comparison`: Get comparison data
- `POST /banking/bank`: Bank surplus
- `POST /pools`: Create a pool
