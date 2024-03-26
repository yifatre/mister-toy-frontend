import { NavLink } from 'react-router-dom'

export function AppHeader() {

    return <header className="app-header">
        <h1>Toys</h1>
        <nav>
            <NavLink to="/toy">Toys</NavLink>
        </nav>
    </header>
}