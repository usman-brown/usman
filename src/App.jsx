import { BrowserRouter } from "react-router-dom";

import {
  About,
  Achievements,
  Contact,
  Experience,
  Footer,
  Hero,
  Navbar,
  CanvasGate,
  StarsCanvas,
  Tech,
  Works,
} from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Hero />
        </div>
        <main>
          <About />
          <Experience />
          <Tech />
          <Works />
          <Achievements />
          <div className='relative z-0'>
            <Contact />
            <CanvasGate
              className='absolute inset-0 z-[-1]'
              rootMargin='400px'
            >
              <StarsCanvas />
            </CanvasGate>
          </div>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
