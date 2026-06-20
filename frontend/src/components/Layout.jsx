import { useState } from "react";
import TopBar from "./TopBar";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="site-layout">
      <TopBar />
      <Header onMenuOpen={() => setMenuOpen(true)} />
      <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
