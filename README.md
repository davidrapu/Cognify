# Cognify
Cognify is a web-based puzzle and pattern recognition game designed to challenge and improve cognitive skills.
Built with a modern tech stack, it combines a smooth frontend experience with a robust backend architecture.

## Features
- Interactive puzzle and pattern games
- User progress tracking
- Responsive and visually engaging UI
- RESTful API backend with PostgreSQL database
- Authentication and user management

## Tech Stack
**Frontend:**
- TypeScript
- React
- Tailwind CSS
- shadcn ui

**Backend:**
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL

## Installation
1. Clone the repository:
```bash
git clone https://github.com/davidrapu/Cognify.git
cd cognify
```

2. Install dependencies for frontend and backend:
```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
npm install
```

3. Setup environment variables:
Create a `.env` file:
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
VITE_API_URL=http://localhost:5000
ENV=development
ACCESS_TOKEN_SECRET=YOUR-TOKEN_HERE
REFRESH_TOKEN_SECRET=YOUR_TOKEN_HERE
```

##### Run the app (production):
```bash
npm run build
npm run start
```

##### Run the app (development):
```bash
npm run dev
```


The app should now be running locally at 
- Frontend: `http://localhost:5173`.
- Backend: `http://localhost:5000`

<!-- ## API Endpoints -->
<!-- - `POST /auth/register` – Register a new user -->
<!-- - `POST /auth/login` – Login and receive a JWT token -->
<!-- - `GET /game/levels` – Fetch available game levels
- `POST /game/score` – Submit user score -->
<!-- *(Add more as your API grows)* -->

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit your work (`git commit -m "Add your message"`)
5. Push to the branch (`git push origin feature/your-feature`)
6. Open a Pull Request

<!-- ## License -->
<!-- This project is licensed under the MIT License. -->

---

Made with ❤️ by David Rapu
