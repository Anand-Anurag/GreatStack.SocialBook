import './register.css';
import { useHistory } from 'react-router';
import { useContext, useRef } from 'react';
import { loginCall } from '../../apiCalls';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const Register = () => {
    const firstName = useRef();
    const lastName = useRef();
    const email = useRef();
    const password = useRef();
    const history = useHistory();
    const { dispatch } = useContext(AuthContext);

    const HandleClick = async (e) => {
        e.preventDefault();
        const username = firstName.current.value + ' ' + lastName.current.value;
        try {
            const res = await axios.post('/auth/register', {
                username, email: email.current.value,
                password: password.current.value
            });
            //Login Now Automatically
            loginCall(
                {
                    email: email.current.value,
                    password: password.current.value
                },
                dispatch
            );
            history.push(`/profile/${res.data._id}`);
        } catch (err) { console.log(err) }
    }

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className='register'>
            <div className="regIntro">
                <img src={PF + "/content/logo-blue.png"} alt="Logo" className="regLogo" />
                <p className="regText">Connect with friends and the world<br />Around you on Socialbook.</p>
            </div>
            <form className="regInputs" onSubmit={HandleClick}>
                <div className="UserName">
                    <input type="text" placeholder='First name' className="firstName" required ref={firstName}/>
                    <input type="text" placeholder='Last name' className="lastName" required ref={lastName}/>
                </div>
                <input type="email" placeholder='Email Address or phone number' required ref={email}/>
                <input type="password" placeholder='Password' minLength='6' required ref={password}/>
                <p className="description">By clicking Sign Up, you agree to our <a href="/">Terms</a>, <a href="/">Policy</a><br />and <a href="/">Cookies Policy</a></p>
                <button type="submit" className='regButton'>Sign Up</button>
            </form>
        </div>
    );
}

export default Register