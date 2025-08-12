# Minty List - Note Taking App

A modern, responsive note-taking application built with Next.js, MongoDB, and NextAuth.js.

## Features

✅ **Core Features**
- User registration and authentication
- Create, edit, delete, and list notes
- Persistent storage with MongoDB
- Responsive design (desktop & mobile)
- Search/filter functionality
- Clean, modern UI with Tailwind CSS

✅ **Extra Credit Features**
- Search notes by title or content
- Fully responsive design
- Clean and modern interface
- Real-time note management

## Tech Stack

- **Frontend**: Next.js 15, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS, Heroicons
- **Language**: JavaScript (ES6+)

## Prerequisites

- Node.js 18+ installed
- MongoDB instance (local or cloud)
- npm or yarn package manager

## Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=your_app_url
```

For local development:
```env
MONGODB_URI=mongodb://localhost:27017/minty-list
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

For production (Vercel):
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/minty-list
NEXTAUTH_SECRET=your-production-secret-key
NEXTAUTH_URL=https://your-app.vercel.app
```

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd minty-list
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env.local`
   - Update the MongoDB URI and other secrets

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Setup

### Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/minty-list`

### MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Create database user
4. Get connection string
5. Replace in `.env.local`

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy

3. **Add Environment Variables in Vercel**
   - `MONGODB_URI`: Your MongoDB connection string
   - `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
   - `NEXTAUTH_URL`: Your Vercel app URL

### Other Platforms

The app can be deployed to any platform that supports Node.js:
- Netlify
- Railway
- Heroku
- DigitalOcean App Platform

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/
│   │   │   └── signup/
│   │   └── notes/
│   ├── auth/
│   │   ├── signin/
│   │   └── signup/
│   ├── dashboard/
│   ├── globals.css
│   ├── layout.js
│   ├── page.js
│   └── providers.js
└── lib/
    └── mongodb.js
```

## API Endpoints

- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `GET /api/notes` - Get user's notes
- `POST /api/notes` - Create new note
- `PUT /api/notes/[id]` - Update note
- `DELETE /api/notes/[id]` - Delete note

## Usage

1. **Sign up** for a new account or **sign in** with existing credentials
2. **Create notes** using the "Add Note" button
3. **Search notes** using the search bar
4. **Edit notes** by clicking the pencil icon
5. **Delete notes** by clicking the trash icon

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions, please create an issue in the GitHub repository.
