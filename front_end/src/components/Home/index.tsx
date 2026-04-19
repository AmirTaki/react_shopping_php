import Footer from "./footer/footer"
import Header from "./header/header"
import Session from "./session/session"

const Home = () => {
    return(
        <div className="min-h-screen">
            <Header />
            <Session/>
            <Footer />
        </div>
    )
}
export default Home