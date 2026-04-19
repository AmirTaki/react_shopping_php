import Footer from "./footer/footer"
import Header from "./header/header"
import Session from "./session/session"

const Home = () => {
    return(
        <div className="h-[3000px]">
            <Header />
            <Session/>
            <Footer />
        </div>
    )
}
export default Home