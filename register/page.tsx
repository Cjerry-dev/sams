'use client';
import { useState } from 'react';

export default function RegisterPage() {
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // This sends data to the API Route Handler we talked about
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    setStatus(result.success ? 'Registration successful!' : 'Registration failed.');
  };

  return (
    <div className="auth-card">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <select name="role" required>
            <option value="student">Student</option>
          </select>
        </div>
        <div className="form-group">
          <input type="text" name="full_name" placeholder="Full Name" required />
        </div>
        <div className="form-group">
          <input type="email" name="email" placeholder="Email Address" required />
        </div>
        <div className="form-group">
          <input type="password" name="password" placeholder="Password" required />
        </div>
        <div className="form-group">
          <input type="text" name="reg_number" placeholder="Registration Number" required />
        </div>
        <button type="submit">Complete Registration</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}
