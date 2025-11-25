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

*(Screenshots would be placed here in a real repo)*

## API Endpoints

- `GET /routes`: Fetch all routes
- `POST /routes/:id/baseline`: Set a route as baseline
- `GET /routes/comparison`: Get comparison data
- `POST /banking/bank`: Bank surplus
- `POST /pools`: Create a pool
