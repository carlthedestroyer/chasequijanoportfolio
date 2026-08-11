import Footer from "@/components/footer/Footer";
import Header from "@/components/header-bar/Header";
import "./globals.css";

export default function MainLayout({children}: {children: React.ReactNode}) {
    return (
      <section>
        <nav></nav>
        <Header/>
        {children}
        <Footer/>
      </section>
    )
  }