'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { User } from '@/types/index';

export default function signUpPage() {
  const router = useRouter();
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

    const res = await fetch("/api/Users", {
      method: "POST",
      body: JSON.stringify({ formData }),
    });

    if(!res.ok) {
      const response = await res.json();
      setErrorMessage(response.message);
    } else {
      router.push("/");
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
      </form>
    </div>
  )
}