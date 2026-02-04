import React from 'react'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.tsx'
import Login from './login.tsx'
import './index.css'

const path = window.location.pathname;

// Replace this with your actual Client ID from Google Cloud Console
const GOOGLE_CLIENT_ID = "887104009432-poh4cgvkfk72qetrh2g84ghaamrd8p5q.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {path === '/login' ? <Login /> : <App />}
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
//WE MUST SET UP A NEW CLIENT ID WHEN WE GET A REAL DOMAIN!!!!!!