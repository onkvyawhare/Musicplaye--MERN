import React, { useState } from 'react';
import './Auth.scss';
import { assets } from '../assets/frontend-assets/assets';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from './Button';
import Input from './Input';
import { useAuth } from "../Context/Authcontext";

const Signup = () => {
  const { signupUser, loading, user } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return toast.warn('Passwords do not match');
    }

    if (!isValidEmail(email)) {
      return toast.warn('Email is not valid');
    }

    await signupUser(name, email, password);
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSignup}>
        <img className="auth__form-logo" src={assets.spotify_logo} alt="App logo" />
        <Link to="/login" className="auth__form-link">Log In here</Link>
        <Input
          name="name"
          placeholder="Name"
          required
          onChange={(e) => setName(e.target.value)}
        />
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
        <Input
          type="password"
          placeholder="Confirm Password"
          required
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <Button type="submit" isLoading={loading}>Sign Up</Button>
      </form>
      <p className="note">
        ☝🏻 Please note that authentication may take a few minutes. As the
        server spins down a free web service that goes 15 minutes without
        receiving inbound traffic, it takes some time to start.
      </p>
    </div>
  );
};

export default Signup;