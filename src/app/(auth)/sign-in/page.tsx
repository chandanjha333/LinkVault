'use client';

import { useState } from "react";

export default function signInPage() {
  const [formData, setFormData] = useState();

  return (
    <div>
      <form>
        <div>
          <label>Email</label>
          <input 
            type="email"
            required
            id="email"
            name="email"
          />
        </div>
        <div>
          <label>Password</label>
          <input 
            type="password"
            required
            id="password"
            name="password"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}