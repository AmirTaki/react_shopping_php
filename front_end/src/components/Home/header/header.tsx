import { Link,  } from "react-router-dom"

const Header = () => {
    return(
        <div className="border-b-2 h-30 flex justify-center items-center">
             
             <Link to = 'validation'>
                <button>auth - validation</button>
            </Link>
        </div>
    )
}
export default Header