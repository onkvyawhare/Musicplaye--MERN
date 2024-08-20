import React, { useState } from 'react';
import './Auth.scss';
import { assets } from '../assets/frontend-assets/assets';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from './Button';
import Input from './Input';
import { useAuth } from '../Context/AuthContext';

const Login = () => {
  const { loginUser, loading, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      return toast.warn('Email is not valid');
    }

    await loginUser(email, password);
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleLogin}>
        <img className="auth__form-logo" src={assets.spotify_logo} alt="App logo" />
        <Link to="/signup" className="auth__form-link">Sign Up here</Link>
        <Input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to="/forgotPassword" className="auth__form-link">Forgot password?</Link>
        <Button type="submit" isLoading={loading}>Login</Button>
      </form>
      <p className="note">
        ☝🏻 Please note that authentication may take a few minutes. As the
        server spins down a free web service that goes 15 minutes without
        receiving inbound traffic, it takes some time to start.
      </p>
    </div>
  );
};

export default Login;