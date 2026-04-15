import Contact from './components/Contact'
import Footer from './components/Footer'
import Work from './components/Work'
import Skills from './components/Skills'
import About from './components/About'
import Header from './components/Header'
import Navbar from './components/Navbar'
import LenisScroll from './components/LenisScroll'

export default function App() {
    return (
        <>
            <LenisScroll />
            <Navbar />
            <Header />
            <About />
            <Skills />
            <Work />
            <Contact />
            <Footer />
        </>
    )
}