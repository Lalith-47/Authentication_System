# 🔐 Authentication Playground

A modern authentication system built with Node.js and Express, featuring multiple authentication strategies including traditional email/password authentication and OAuth integrations (GitHub, Google, Microsoft).

## ✨ Features

- **Email/Password Authentication** - Secure registration and login with bcrypt password hashing
- **OAuth 2.0 Integration** - GitHub, Google, and Microsoft OAuth support
- **Session Management** - Express sessions with secure cookie handling
- **MongoDB Database** - Persistent user data storage with Mongoose ODM
- **Password Security** - Industry-standard bcrypt hashing with 10 salt rounds
- **Protected Routes** - Session-based route protection middleware
- **Docker Support** - Full Docker and Docker Compose configuration
- **RESTful API** - Clean, well-structured API endpoints

## 🛠️ Technologies

- **Runtime:** Node.js 20+
- **Framework:** Express 5.x
- **Database:** MongoDB 7.0+ (NoSQL database for user data persistence)
- **ODM:** Mongoose (MongoDB object modeling)
- **Authentication:** Passport.js (GitHub, Google, Microsoft strategies)
- **Password Hashing:** bcrypt (Industry-standard encryption)
- **Session Store:** express-session
- **Containerization:** Docker & Docker Compose (Multi-platform container deployment)
- **Secrets Management:** Doppler (Environment variable and secrets injection)

## 📋 Prerequisites

- Node.js 20 or higher
- MongoDB 7.0+ (or use Docker for containerized MongoDB)
- Docker & Docker Compose (for containerized deployment)
- npm or yarn
- GitHub OAuth App credentials (for OAuth login)
- Optional: Doppler account for secrets management
- Optional: Google/Microsoft OAuth credentials

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd login-system
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

#### Option A: Using .env File (Local Development)

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000

# Database
MONGO_URI=mongodb://localhost:27017/auth_playground

# Session Secret (use a strong random string in production)
SECRET=your-secret-key-here

# GitHub OAuth (Create app at https://github.com/settings/developers)
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Optional: Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Optional: Microsoft OAuth
MICROSOFT_CLIENT_ID=your-microsoft-client-id
MICROSOFT_CLIENT_SECRET=your-microsoft-client-secret
```

#### Option B: Using Doppler (Recommended for Production)

[Doppler](https://doppler.com) provides secure secrets management and environment variable injection:

1. **Install Doppler CLI:**

   ```bash
   # macOS
   brew install doppler

   # Linux
   (curl -Ls https://cli.doppler.com/install.sh || wget -qO- https://cli.doppler.com/install.sh) | sh
   ```

2. **Login and Setup:**

   ```bash
   doppler login
   doppler setup
   ```

3. **Add Secrets:**

   ```bash
   doppler secrets set PORT=3000
   doppler secrets set MONGO_URI='mongodb://localhost:27017/auth_playground'
   doppler secrets set SECRET='your-secret-key'
   doppler secrets set GITHUB_CLIENT_ID='your-github-client-id'
   doppler secrets set GITHUB_CLIENT_SECRET='your-github-client-secret'
   ```

4. **Run Application with Doppler:**
   ```bash
   doppler run -- npm start
   doppler run -- npm run dev
   ```

**Benefits of Doppler:**

- ✅ Centralized secrets management
- ✅ Team collaboration with access controls
- ✅ Automatic secret rotation
- ✅ Environment-specific configurations
- ✅ No `.env` files in production
- ✅ Audit logs for secret access

### 4. Setup OAuth Applications

#### GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set **Authorization callback URL** to: `http://localhost:3000/api/auth/github/callback`
4. Copy Client ID and Client Secret to `.env`

#### Google OAuth (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project and enable Google+ API
3. Create OAuth 2.0 credentials
4. Add `http://localhost:3000/api/auth/google/callback` to authorized redirect URIs

#### Microsoft OAuth (Optional)

1. Go to [Azure Portal](https://portal.azure.com/)
2. Register a new application
3. Add `http://localhost:3000/api/auth/microsoft/callback` to redirect URIs

### 5. Run the Application

#### Local Development

```bash
# Start MongoDB (if running locally)
mongod

# Run in development mode with auto-reload
npm run dev

# Or run in production mode
npm start
```

#### Using Docker

```bash
# Build and run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop containers
docker-compose down
```

The API will be available at `http://localhost:3000`

## 📚 API Documentation

### Authentication Endpoints

#### 1. Sign Up (Email/Password)

```bash
POST /api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your-password"
}
```

**Response:**

```json
{
  "message": "User created successfully"
}
```

#### 2. Login (Email/Password)

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your-password"
}
```

**Response:**

```json
{
  "message": "Logged in"
}
```

#### 3. Logout

```bash
POST /api/auth/logout
```

**Response:**

```json
{
  "message": "Logged out"
}
```

#### 4. GitHub OAuth Login

Visit in browser:

```
GET /api/auth/github
```

Redirects to GitHub for authentication, then back to `/` on success.

#### 5. Google OAuth Login (if configured)

```
GET /api/auth/google
```

#### 6. Microsoft OAuth Login (if configured)

```
GET /api/auth/microsoft
```

### Protected Routes

#### Access Protected Resource

```bash
GET /api/protected
```

**Response (Authenticated):**

```json
{
  "message": "Accessing protected"
}
```

**Response (Unauthenticated):**

```json
{
  "message": "Unauthorized"
}
```

### Health Check

```bash
GET /health
```

**Response:**

```json
{
  "status": "OK"
}
```

## 📁 Project Structure

```
login-system/
├── src/
│   ├── config/
│   │   ├── db.js              # MongoDB connection configuration
│   │   └── passport.js        # Passport strategies configuration
│   ├── controllers/
│   │   └── auth.controller.js # Authentication logic
│   ├── middleware/
│   │   └── auth.middleware.js # Session validation middleware
│   ├── models/
│   │   └── User.js            # User schema and methods
│   ├── routes/
│   │   └── auth.routes.js     # Authentication routes
│   └── server.js              # Express app entry point
├── .env                       # Environment variables (create this)
├── .gitignore
├── docker-compose.yml         # Docker Compose configuration
├── Dockerfile                 # Docker container definition
├── package.json
└── README.md
```

## 🔒 Security Features

- **Password Hashing:** Passwords are hashed using bcrypt with 10 salt rounds
- **Session Security:** Secure session management with httpOnly cookies
- **Environment Variables:** Sensitive data stored in environment variables
- **OAuth 2.0:** Industry-standard OAuth implementation
- **No Password Storage for OAuth:** Users authenticated via OAuth don't have passwords stored

## 🐳 Docker Deployment

The application is fully containerized and can be deployed using Docker:

```bash
# Build the image
docker build -t login-system .

# Run with Docker Compose
docker-compose up -d
```

**Services:**

- **backend:** Node.js application (port 5000 → 3000)
- **mongo:** MongoDB database (port 27017)

**Volumes:**

- `DB_data`: Persistent MongoDB data storage

## 🧪 Testing the API

### Using cURL

```bash
# Sign up
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}' \
  -c cookies.txt

# Access protected route (using saved cookies)
curl http://localhost:3000/api/protected -b cookies.txt

# Logout
curl -X POST http://localhost:3000/api/auth/logout -b cookies.txt
```

### Using Postman

1. Import the API endpoints
2. Enable cookie handling in Postman settings
3. Test the authentication flow

## 🔧 Configuration

### Environment Variables

| Variable                  | Description               | Required  | Default |
| ------------------------- | ------------------------- | --------- | ------- |
| `PORT`                    | Server port               | No        | 3000    |
| `MONGO_URI`               | MongoDB connection string | Yes       | -       |
| `SECRET`                  | Session secret key        | Yes       | -       |
| `GITHUB_CLIENT_ID`        | GitHub OAuth client ID    | For OAuth | -       |
| `GITHUB_CLIENT_SECRET`    | GitHub OAuth secret       | For OAuth | -       |
| `GOOGLE_CLIENT_ID`        | Google OAuth client ID    | Optional  | -       |
| `GOOGLE_CLIENT_SECRET`    | Google OAuth secret       | Optional  | -       |
| `MICROSOFT_CLIENT_ID`     | Microsoft OAuth client ID | Optional  | -       |
| `MICROSOFT_CLIENT_SECRET` | Microsoft OAuth secret    | Optional  | -       |

### Session Configuration

Sessions are configured with:

- **Cookie name:** `connect.sid`
- **saveUninitialized:** `false`
- **resave:** `false`

## 👥 User Model

```javascript
{
  email: String (required, unique),
  password: String (required for email/password auth),
  githubId: String (for GitHub OAuth users),
  role: String (default: "user"),
  createdAt: Date,
  updatedAt: Date
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Lalith**

## 🙏 Acknowledgments

- Passport.js for authentication strategies
- Express.js team for the excellent framework
- MongoDB team for the database
- bcrypt for password hashing

## 📞 Support

For issues, questions, or contributions, please open an issue on GitHub.

---

**Note:** This is a playground project for learning authentication patterns. For production use, consider additional security measures such as:

- Rate limiting
- CSRF protection
- Account lockout policies
- Email verification
- Two-factor authentication
- Security headers (helmet.js)
- Input validation and sanitization
