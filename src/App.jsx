import CursorCircle from "./components/CursorCircle";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Vision from "./components/Vision";
import Services from "./components/Services";
import Product from "./components/Product";
import Contact from "./components/Contact";
import ScrollToTop from "./components/ScrolltoTop";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <ScrollProgress/>
      <CursorCircle />
      <Navbar />
      <main>
        <Hero />
        <About/>
        <Vision/>
        <Services />
        <Product/>
        <Contact />
      </main>
      <ScrollToTop/>
      <Footer />
    </>
  );
}

export default App;
