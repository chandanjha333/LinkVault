import Header from "@/ui/header";

export default function Home() {
  return (
    <div>
      <Header></Header>

      <main>
        <h1>LinkVault</h1>
        <p>Manage your URLs at a single place</p>
        <p>Create, edit, analyse, and delete URLs</p>
        <input placeholder="Enter a Link..."/>
      </main>
    </div>
  );
}
