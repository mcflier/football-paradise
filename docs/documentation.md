# Digital Football Paradise - Documentation

## Overview
Digital Football Paradise is a SaaS platform for managing Madden NFL leagues. It provides a comprehensive set of tools for league commissioners and players to track stats, manage teams, analyze player performance, and more.

## Features
- Discord OAuth2 authentication
- Premium UI with responsive design
- League management dashboard
- Madden Companion App integration for data export
- Real-time notifications via WebSockets
- Player analysis tools

## Technology Stack
- **Frontend**: Next.js, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: FastAPI, Python, Redis
- **Authentication**: NextAuth.js with Discord provider
- **Deployment**: Vercel (frontend), AWS Lambda via Zappa (backend)

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.10+
- Discord Developer Account (for OAuth credentials)

### Installation

#### Frontend Setup
1. Clone the repository:
   ```
   git clone https://github.com/mcflier/football-paradise.git
   cd football-paradise/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file with the following variables:
   ```
   DISCORD_CLIENT_ID=your_discord_client_id
   DISCORD_CLIENT_SECRET=your_discord_client_secret
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret_key
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. Start the development server:
   ```
   npm run dev
   ```

#### Backend Setup
1. Navigate to the backend directory:
   ```
   cd ../backend
   ```

2. Create and activate a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Create a `.env` file with the following variables:
   ```
   DISCORD_CLIENT_ID=your_discord_client_id
   DISCORD_CLIENT_SECRET=your_discord_client_secret
   DISCORD_REDIRECT_URI=http://localhost:3000/api/auth/callback/discord
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_PASSWORD=
   REDIS_SSL=False
   DATABASE_URL=postgresql://username:password@localhost:5432/digital_football_paradise
   ```

5. Start the development server:
   ```
   cd app
   uvicorn main:app --reload
   ```

## Usage

### Authentication
1. Access the application at `http://localhost:3000`
2. Click "Sign in with Discord" on the login page
3. Authorize the application in the Discord OAuth flow
4. You will be redirected to the dashboard upon successful authentication

### Creating a League
1. Navigate to the dashboard
2. Click "Create New League" button
3. Fill in the league details form
4. Submit the form to create your league

### Exporting Data from Madden Companion App
1. Navigate to the "Madden Export" page in the dashboard
2. Enter your league ID
3. Click "Generate Export URL"
4. Copy the generated URL
5. Open the Madden Companion App on your device
6. Select your league
7. Tap on "Export League"
8. Paste the URL and tap "Export"
9. Select the data you want to export

## API Documentation

### Authentication Endpoints
- `GET /api/auth/[...nextauth]` - NextAuth.js authentication endpoints

### League Management Endpoints
- `POST /leagues/` - Create a new league
- `GET /leagues/` - Get all leagues for the authenticated user
- `GET /leagues/{league_id}` - Get a specific league by ID

### Madden Export Endpoints
- `POST /madden-export/league-info` - Receive league info data from Madden Companion App
- `POST /madden-export/team-info` - Receive team info data from Madden Companion App
- `POST /madden-export/roster` - Receive roster data from Madden Companion App
- `POST /madden-export/weekly-stats` - Receive weekly stats data from Madden Companion App
- `POST /madden-export/standings` - Receive standings data from Madden Companion App
- `POST /madden-export/schedule` - Receive schedule data from Madden Companion App

## Deployment

### Frontend Deployment (Vercel)
1. Create a Vercel account and connect your GitHub repository
2. Configure the environment variables in the Vercel dashboard
3. Deploy the frontend with the following command:
   ```
   vercel
   ```

### Backend Deployment (AWS Lambda via Zappa)
1. Configure AWS credentials
2. Update the `zappa_settings.json` file with your settings
3. Deploy the backend with the following command:
   ```
   zappa deploy production
   ```

## Future Development
The platform is designed to be extended with additional features as outlined in the project plan:
- Phase 3: Madden Companion App Integration (Completed)
- Phase 4: Player Analysis + Team Management
- Phase 5: League Settings + Commissioner Tools
- Phase 6: DFS Contests
- Phase 7: Discord Bot Integration
- Phase 8: Stripe Billing
- Phase 9: Mobile Responsive Design
- Phase 10: Advanced Analytics
- Phase 11: League History + Archives
- Phase 12: SaaS Billing

## Troubleshooting
- **Authentication Issues**: Ensure your Discord OAuth credentials are correct and the redirect URI matches your application URL
- **API Connection Issues**: Check that the backend server is running and the `NEXT_PUBLIC_API_URL` is correctly set
- **Madden Companion App Export Issues**: Verify that the export URL is correctly formatted and accessible from your device

## Support
For support, please open an issue on the GitHub repository or contact the development team.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
