
# Banking App

## Overview
This project is a React-based application that leverages various optimization techniques to enhance performance and maintainability.

## Installation

To get started, clone the repository and install the necessary dependencies:

```bash
npm install
```

## Environment Variables

Before running the application, ensure that you have the following environment variables set up in your `.env` file:

```bash
REACT_APP_API_URL=<your-api-url>
REACT_APP_GOOGLE_CLIENT_ID=<your-google-client-id>
```

Replace `<your-api-url>` and `<your-google-client-id>` with your actual API URL and Google Client ID.

## Running the Frontend

Once the dependencies are installed and environment variables are set, you can start the frontend by running:

```bash
npm start
```

This will launch the application on `http://localhost:3000`.

## Optimizations

The following optimization techniques have been implemented in the frontend:

- **UseMemo:** Used to memoize expensive calculations, preventing unnecessary re-renders.
- **UseEffect:** Employed to handle side effects and ensure efficient component lifecycle management.
- **UseCallback:** Used to memoize callback functions, avoiding unnecessary re-creations of functions during re-renders.
- **Lazy Loading:** Implemented to load components on-demand, improving the initial load time.
