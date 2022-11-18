import Navbar from "../navbar/navbar";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-zinc-1000">
      <header>
        <Navbar />
      </header>
      {children}
    </main>
  );
}

export default MainLayout;
