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

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setErrorMessage("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if(!res.ok) {
        const data = await res.json().catch(() => ({message: "Something went wrong"}));
        setErrorMessage(data.message);
      } else {
        await signIn("credentials", { ...formData, redirect: true, callbackUrl: "/" })
      }
    } catch {
      setErrorMessage("Network error, please try again");
    }
  };

  return (
    <div>
      <p>{errorMessage}</p>
      <form onSubmit={handleSubmit} method="post">

        <div>
          <label>Name</label>
          <input 
            type="text"
            id="name"
            name="name"
            required
            placeholder="Enter name"
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
            placeholder="Enter your email"
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
            placeholder="Enter your password"
            onChange={handleChange}
          />
        </div>
        
        <button type="submit">Submit</button>
        <button type="button" onClick={() => signIn("google")}>Sign up with Google</button>
      </form>
    </div>
  )
}