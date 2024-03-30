import { NavLink, Link } from 'react-router-dom'
import logo from "../assets/img/logo.png"
import { LoginSignUp } from './LoginSignup'
import { logout } from '../store/actions/user.action'
import { useSelector } from 'react-redux'


export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.loggedInUser)


    function onLogout() {
        try {
            logout()

        }
        catch {
            console.log('err', err)
        }
    }


    return <header className="app-header">
        <div className='flex'>
            <Link to="/"><img className='logo' src={logo} alt="" /></Link>
            <nav>
                <NavLink to="/toy">Toys</NavLink>
            </nav>
            {!user && <LoginSignUp />}
            {user && <button onClick={onLogout}>Logout</button>}
        </div>
    </header>
}