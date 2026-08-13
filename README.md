# SkillForge AI

SkillForge AI is a GenAI-powered career development platform designed to help students and job seekers build personalized career paths. It uses AI to generate personalized learning roadmaps, recommend projects and provide career guidance based on the user's goals and interests.

## Live Application

**Live Website:** [https://uvce.tech](https://uvce.tech?utm_source=chatgpt.com)

## Features

* User registration and login
* JWT-based authentication
* Personalized AI-generated learning roadmaps
* Career guidance based on user goals
* Project recommendations
* Role-based access control
* Interactive dashboard
* Responsive user interface
* Secure REST APIs
* MongoDB-based data storage
* AI integration for personalized recommendations

## Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Chart.js
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt.js
* REST APIs

### AI

* Generative AI APIs
* Prompt engineering
* AI-powered roadmap generation
* Personalized career recommendations

### Deployment

* Docker
* AWS EC2
* Nginx
* MongoDB Atlas
* GitHub

## Project Architecture

```text
SkillForgeAI/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── Dockerfile
│
├── server/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── controllers/
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md
```

## How It Works

1. The user creates an account or logs in.
2. The user provides their career goals and interests.
3. SkillForge AI processes the user's requirements through the AI service.
4. The AI generates a personalized learning roadmap.
5. The platform recommends relevant projects and skills.
6. Users can track their career development through the dashboard.

## Installation

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* MongoDB or a MongoDB Atlas account
* Git
* Docker (optional)

### Clone the Repository

```bash
git clone https://github.com/kishangowda08a/SkillForgeAI.git
cd SkillForgeAI
```

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AI_API_KEY=your_ai_api_key
```

Start the backend:

```bash
npm start
```

The backend will run on:

```text
http://localhost:5000
```

### Frontend Setup

Open another terminal:

```bash
cd client
npm install
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

## Running with Docker

Build and start the application using Docker Compose:

```bash
docker-compose up --build
```

To run the containers in detached mode:

```bash
docker-compose up -d --build
```

To stop the containers:

```bash
docker-compose down
```

## Environment Variables

| Variable     | Description                            |
| ------------ | -------------------------------------- |
| `PORT`       | Backend server port                    |
| `MONGO_URI`  | MongoDB Atlas connection string        |
| `JWT_SECRET` | Secret key used for JWT authentication |
| `AI_API_KEY` | API key for the selected AI service    |

Never commit your `.env` file to GitHub.

Add it to `.gitignore`:

```text
.env
node_modules/
```

## API Overview

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### AI

```text
POST /api/ai/roadmap
```

The AI endpoint accepts user career information and generates a personalized learning roadmap.

## Security

SkillForge AI implements several security mechanisms:

* JWT-based authentication
* Password hashing using bcrypt
* Protected API routes
* Role-based authorization
* Environment variables for sensitive credentials
* Input validation
* Secure database connection through MongoDB Atlas

## Deployment

The application is deployed using Docker on an AWS EC2 instance.

A typical deployment architecture is:

```text
User
  |
  v
Nginx
  |
  +--------------------+
  |                    |
  v                    v
React Frontend      Node.js API
                        |
                        v
                  MongoDB Atlas
                        |
                        v
                   AI Service
```

## Future Enhancements

* AI-powered resume analysis
* Resume and portfolio generation
* Interview preparation
* AI mock interviews
* Skill gap analysis
* Job recommendation system
* Progress tracking
* Learning resource recommendations
* Career analytics
* Integration with job platforms

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature/new-feature
```

3. Make your changes.
4. Commit your changes.

```bash
git commit -m "Add new feature"
```

5. Push the branch.

```bash
git push origin feature/new-feature
```

6. Create a Pull Request.

## License

This project is developed for educational and portfolio purposes.

## Author

**Kishan Gowda B N**

Electronics and Communication Engineering
University Visvesvaraya College of Engineering, Bengaluru
