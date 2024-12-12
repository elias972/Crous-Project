# Crous Backend Service
<img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Logo_Crous_vectoris%C3%A9.svg" alt="Crous Logo" width="80" />  
<img src="https://alternance.imt.fr/wp-content/uploads/2020/11/logo_imt_st_etienne-verticale-223x300.jpg" alt="ISMIN Logo" width="50" />

**This project was done by Alex El Chidiac and Elias Ibrahim and presented to Mr. Gaetan Maisse for the Web Development and Android Development course during Semester 9 at ISMIN.**

This repository contains the backend component for the Crous application. It provides a RESTful API built with [NestJS](https://nestjs.com/) that serves data related to Crous facilities. The service supports basic CRUD operations, pagination, and handling of "favorite" flags for Crous entries. It also integrates with an external API to load initial data and offers an endpoint for toggling favorites.

**Note:** This backend is currently deployed to Clever Cloud. You can access the production API at:  
**[Crous Backend Clever Cloud Deployment](https://app-38070179-aa49-47be-b530-6fece93917b4.cleverapps.io/crous)**

## Features

- **CRUD Endpoints:** Create, retrieve, update, and delete Crous records.
- **Pagination:** Fetch Crous data in manageable chunks using the `paginated` endpoint.
- **Favorite Toggling:** Mark/unmark any Crous item as a favorite.
- **Initial Data Load:** Automatically loads a set of Crous data from a public API on startup.
- **Deployed on Clever Cloud:** The service is readily accessible without local setup.

## Prerequisites

- **Node.js** (LTS version recommended)
- **npm** (comes bundled with Node.js)

If you want to run it locally for testing or development, ensure you have these prerequisites installed on your machine.

## Getting Started (Local Development)

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/<your-username>/crous-backend.git

2. **Install Dependencies:**

    ```bash
    cd crous-backend
    npm install

3. **Start the Server in Development Mode:**

    ```bash
    npm run start:dev  
    By default, the server will listen on http://localhost:3000.

-You can access the Crous endpoints, for example:

  -GET http://localhost:3000/crous to list all Crous entries.
  -POST http://localhost:3000/crous to add a new Crous item.
  -GET http://localhost:3000/crous/:id to retrieve a specific item.
  -PUT http://localhost:3000/crous/favorite/:id to toggle the favorite status.

  
