import Header from "@/ui/header";
import Link from "next/link";
import { use, useState } from "react";

export default function urlPage() {
  const [redirectURL, setRedirectURL] = useState("");
  const [customId, setCustomId] = useState("");

  return (
    <div>
      <Header />

      <form>
        <input 
          placeholder="Enter URL"
          required
          onChange={(e) => setRedirectURL(e.target.value)}
        />
        <input 
          placeholder="custom shortId"
          maxLength={30}
          onChange={(e) => setCustomId(e.target.value)}
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