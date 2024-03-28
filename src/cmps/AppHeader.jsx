import { NavLink, Link } from 'react-router-dom'
import logo from "../assets/img/logo.png"


export function AppHeader() {

    return <header className="app-header">
        <div className='flex'>
            <Link to="/"><img className='logo' src={logo} alt="" /></Link>
            <nav>
                <NavLink to="/toy">Toys</NavLink>
            </nav>
        </div>
    </header>
}