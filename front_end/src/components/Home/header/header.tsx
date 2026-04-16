import { Link,  } from "react-router-dom"
import DarkMode from "../../DarkMode"


const Header = () => {
    return(
        <div className="border-b-2 h-30 flex justify-center items-center gap-10 ">

            <DarkMode />
            <Link to = 'validation'>
                <button>auth - validation</button>
            </Link>
            <Link to = 'panelAdmin'>
                <button>panelAdmin</button>
            </Link>
            
        </div>
    )
}
export default Header