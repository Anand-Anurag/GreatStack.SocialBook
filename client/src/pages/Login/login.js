import { useContext, useRef } from 'react';
import './login.css';
import { AuthContext } from '../../context/AuthContext';
import { loginCall } from '../../apiCalls';

const Login = () => {
    const email = useRef();
    const password = useRef();

    const { isFetching, dispatch } = useContext(AuthContext);

    const handleClick = (e) => {
        e.preventDefault();
        loginCall(
            {
                email: email.current.value,
                password: password.current.value
            },
            dispatch
        );
    }

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className='login'>
            <div className="loginIntro">
                <img src={PF + "/content/logo-blue.png"} alt="Logo" className="loginLogo" />
                <p className="loginText">Connect with friends and the world<br />Around you on Socialbook.</p>
            </div>
            <form className="loginInputs" onSubmit={handleClick}>
                <input type="email" placeholder='Email Address or phone number' required ref={email}/>
                <input type="password" placeholder='Password' required ref={password} />
                <button type="submit" className='loginButton' disabled={isFetching}>{ isFetching? "Loading..." : 'Log in'}</button>
                <a href="/">Forgotten Password?</a>
                <a href="/register" className='SignUpButton'>Create new account</a>
            </form>
        </div>
    );
}

export default Login;