
# BankApp (MERN)

## Features Includes:

- **Google Login**
- **Add Transactions**
- **Add Accounts**
- **View Transaction History**
- **View Accounts**
- **Lazy Loading**
- **File Upload**
- **Optimization**

## Server Setup

### Step 1: Install Dependencies

Install the necessary dependencies by running the following command:

```bash
npm install
```

### Step 2: Configure Environment Variables

Create a `.env` file in the root of your project and include the following keys:

```env
PORT=3000
MONGODB_URI="mongodb://localhost:27017/your-database-name"
JWT_SECRET=<your_jwt_secret_key>
SESSION_SECRET=<your_session_secret_key>
GOOGLE_CLIENT_ID=<your_google_client_id>
GOOGLE_CLIENT_SECRET=<your_google_client_secret>
```

### Step 3: Google OAuth Setup

To enable Google Login, you'll need to generate `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` from the Google Cloud Console. Follow these steps:

1. **Enable APIs and Services**: Go to the [Google Cloud Console](https://console.cloud.google.com/) and enable the required APIs and services for your project.

2. **Create OAuth 2.0 Credentials**:
   - Navigate to **Credentials**.
   - Under **Authorized JavaScript origins**, add the following URIs:
     - `http://localhost:<port>`  (Replace `<port>` with the port on which your frontend is running)
     - `http://localhost`
   - For **Authorized redirect URIs**, add:
     - `http://localhost:3000/api/auth/google/callback`

3. **Obtain Client ID and Secret**: After creating the web app, you can get the `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` key values.

### Step 4: Running the Server

To run the server, use the following command:

```bash
npm start
```

## Optimizations

The following optimizations have been implemented in the server:

- **Helmet Security Enhancements**: Applied to enhance security by setting various HTTP headers.
- **File Size Limiting with Multer**: Limited the file size uploads to improve security and performance.

