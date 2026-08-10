import Link from "next/link";

export default function Header() {
  return (
    <div>
      <div>
        LinkVault
        <Link href="/">Home</Link>
        <Link href="/urls">URLs</Link>
        <Link href="/features">Features</Link>
      </div>
    </div>
  )
}