'use client';

import { useState } from 'react';
import { User } from '@/types/index';
import { signIn } from 'next-auth/react';

export default function signUpPage() {
  const [formData, setFormData] = useState<User>({name:"", email:"", password:""});
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent)=>{
    e.preventDefault();
    setErrorMessage("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if(!res.ok) {
      const response = await res.json();
      setErrorMessage(response.message);
    } else {
      await signIn("credentials", { ...formData, redirect: true, callbackUrl: "/" })
    }
  };

  return (
    <div>
      <p>{errorMessage}</p>
      <form onSubmit={handleSubmit} method="post">

        <div>
          <label>Name</label>
          <input 
            type="string"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Email</label>
          <input 
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Password</label>
          <input 
            type="password"
            id="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit">Submit</button>
        <button type="button" onClick={() => signIn("google")}>Sign up with Google</button>
      </form>
    </div>
  )
}