import React from 'react'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.tsx'
import Login from './login.tsx'
import './index.css'

const path = window.location.pathname;

const GOOGLE_CLIENT_ID = "887104009432-poh4cgvkfk72qetrh2g84ghaamrd8p5q.apps.googleusercontent.com"; // Please replace the client id with something else. This is only temporary!

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {path === '/login' ? <Login /> : <App />}
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
