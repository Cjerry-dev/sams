'use client';
import { useState } from 'react';

export default function RegisterPage() {
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    setStatus(result.success ? 'Registration successful!' : 'Registration failed.');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your existing form fields here */}
      <button type="submit">Complete Registration</button>
      {status && <p>{status}</p>}
    </form>
  );
}
