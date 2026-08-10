import Header from "@/ui/header";
import Link from "next/link";
import { useState } from "react";

export default function urlPage() {
  const [redirectURL, setRedirectURL] = useState("");

  return (
    <div>
      <Header />

      <form>
        <input 
          placeholder="Enter URL"
          required
          onChange={(e) => setRedirectURL(e.target.value)}
        />
        <button type="submit">link</button> 
      </form>
      {redirectURL && 
          <div>
            <Link href={redirectURL}></Link>
          </div>
        }
    </div>
  )
}