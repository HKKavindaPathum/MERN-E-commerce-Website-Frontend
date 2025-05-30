import { Link } from "react-router-dom";

export default function Header(){
    console.log("Header component loading...")
    return(
        <div className="bg-[#FFFF00] ">
            <Link href="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
        </div>
    )
}