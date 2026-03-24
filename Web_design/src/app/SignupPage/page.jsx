"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Sparkle } from 'lucide-react';
import Header from '../../components/Header/Header';


function Signup() {
  const router = useRouter();

  return (
    <div className="noder-app signup-page">
      <Header />

      <main className="signup-container">
        <div className="signup-box reveal active">
          <div className="signup-header">
            <div className="logo-icon-large">
              <Sparkle size={28} />
            </div>
            <h2>Create your account</h2>
            <p>Join thousands of teams scaling with Noder.</p>
          </div>

          <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
            <div className="input-group">
              <label>Full Name</label>
              <div className="input-wrapper">
                <User size={18} className="input-icon" />
                <input type="text" placeholder="John Doe" required />
              </div>
            </div>

            <div className="input-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input type="email" placeholder="john@example.com" required />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input type="password" placeholder="••••••••" required />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full signup-btn">
              Get Started Free
            </button>
          </form>

          <div className="signup-footer">
            <p>Already have an account? <a href="#">Log in</a></p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Signup;
