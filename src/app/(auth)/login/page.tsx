'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function signInPage() {
  const [formData, setFormData] = useState({ email:"", password:"" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    setError("")

    const res = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    })

    if(res?.error) {
      setError("Invalid Email or Password")
      return
    }
    router.push("/")
  }

  return (
    <div>
      <form>
        <div>
          <label>Email</label>
          <input 
            type="email"
            required
            placeholder="Email"
            onChange={
              (e) => setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div>
          <label>Password</label>
          <input 
            type="password"
            required
            placeholder="Password"
            onChange={
              (e) => setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Submit</button>
        <button type="button" onClick={() => signIn("google", { redirectTo: "/" })}>
          Continue with Google
        </button>
      </form>
    </div>
  )
}