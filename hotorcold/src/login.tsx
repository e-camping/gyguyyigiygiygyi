import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
  const handleSuccess = (credentialResponse: any) => {
    console.log('Login Success:', credentialResponse);
    // On success, redirect back to the game
    window.location.href = '/';
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  return (
    <div>
        <h1 style={{ textAlign: 'center', color: '#FFF' }}>Hey!</h1>
        <p style = {{marginBottom: '0.5rem'}}>Click the "Sign In with Google" button to continue</p>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
            <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            />
        </div>
        <div style={{ textAlign: 'center' }}>
            <a href="/" style={{ color: '#FFF', textDecoration: 'underline', fontSize: '0.9rem' }}>Changed your mind? Click here to go back to the game.</a>
        </div>
    </div>
  );
}