import { useState } from "react"
import { userService } from "../services/user.service.js"
import { signUp, login } from "../store/actions/user.action.js"

export function LoginSignUp() {
    const [isSignUp, setIsSignUp] = useState(false)
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())


    function onLogin(ev) {
        ev.preventDefault()
        ev.preventDefault()
        isSignUp ? _signUp(credentials) : _login(credentials)
    }

    function _login(credentials) {
        console.log('credentials', credentials)
        login(credentials)
            .then(() => {
                console.log('Logged in successfully')
            })
            .catch(err => {
                console.log('Oops try again')
            })
    }

    function _signUp(credentials) {
        signUp(credentials)
            .then(() => {
                console.log('Signed up successfully')
            })
            .catch(err => {
                console.log('Oops try again')
            })
    }

    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
    }


    return <section className="login grid">
        <form className="login-form" onSubmit={onLogin}>
            <input
                type="text"
                name="username"
                value={credentials.username}
                placeholder="Username"
                onChange={handleChange}
                required
                autoFocus
            />
            <input
                type="password"
                name="password"
                value={credentials.password}
                placeholder="Password"
                onChange={handleChange}
                required
                autoComplete="off"
            />
            {isSignUp && <input
                type="text"
                name="fullName"
                value={credentials.fullName}
                placeholder="Full name"
                onChange={handleChange}
                required
            />}
            <button>{isSignUp ? 'SignUp' : 'Login'}</button>
        </form>
        <a href="#" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Already a member? Login' : 'New user? SignUp here'}
        </a>
    </section>
}