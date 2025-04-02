## Setup Instructions for Existing NestJS and Prisma Project

### Prerequisites
- Node.js (v16 or later)
- npm or yarn
- PostgreSQL (or any supported database)

### Steps

1. **Install Dependencies**
  ```bash
  npm install
  ```

2. **Configure Database**
  - Create .env file in the root directory and model it after the .env.example file.
  

3. **Generate Prisma Client**
  ```bash
  npx prisma generate
  ```

1. **Run Database Migrations**
  to deploy existing migrations to the database.
  ```bash
  npx prisma migrate deploy
  ```

2. **Start the Application**
  ```bash
  npm run start:dev
  ```

## API Documentation
- The API documentation using SWAGGER is available at `/docs` after starting the application.
You can access the Swagger UI to explore the API endpoints and their details.