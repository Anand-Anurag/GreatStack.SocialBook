import './navbar.css';
import { NotificationsNone, MailOutline, Search, OndemandVideo, Feedback, Settings, Help, DarkMode, Logout } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useHistory } from 'react-router';

const Navbar = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    const history = useHistory();

    const [ searchInput, setSearchInput ] = useState("");
    const [dropDown, setDropDown] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`/users?email=${searchInput}`);
            history.push(`/profile/${res.data._id}`);
        } catch (err) { alert('No Such User Found') }
        setSearchInput("");
    }

    const handleLogout = () => {
        localStorage.setItem("user", null);
        history.push('/');
        window.location.reload();
    }
    
    return (
        <nav className='navbar'>
            <div className="navbarLeft">
                <Link to='/'><img src={PF + 'content/logo.png'} alt="SocialBook" className="logo" /></Link>
                <div className="navbarIcons">
                    <div className="navbarIcon">
                        < NotificationsNone className='navbarIconSymbol' />
                    </div>
                    <Link to='/messenger'>
                        <div className="navbarIcon">
                            < MailOutline className='navbarIconSymbol' />
                        </div>
                    </Link>
                    <div className="navbarIcon">
                        < OndemandVideo className='navbarIconSymbol' />
                    </div>
                </div>
            </div>
            <div className="navbarRight">
                <form className="searchBar" onSubmit={handleSearch}>
                    < Search fontSize='small' />
                    <input placeholder='Search' className='searchInput' value={searchInput} onChange={ (e) => setSearchInput(e.target.value) } />
                </form>
                <div className="navbarIcon" onClick={ () => setDropDown(!dropDown) }>
                    <img src={ user? PF+user.profilePicture : `${PF}content/noAvatar.png` } alt="Profile" className="navbarImg" />
                    <span className="navbarImgBadge"></span>
                </div>
                <div className='dropDown' style={{ display: dropDown? "flex": "none" }}>
                    <Link to={`/profile/${user._id}`}>
                        <div className="dropDownProfile">
                            <img className='dropDownProfilePic' src={user? PF+user.profilePicture : `${PF}content/noAvatar.png`} alt="Profile" />
                            <div className="dropDownProfileName">{ user?.username }<p>See your profile</p></div>
                        </div>
                    </Link>
                    <hr className="dropDownHr" />
                    <div className="dropDownProfile">
                        < Feedback className='dropDownFeedback' />
                        <span className="dropDownFeedbackName">Give FeedBack <p>Help us improve the new SocialBook</p></span>
                    </div>
                    <hr className="dropDownHr" />
                    <div className="dropDownProfile">
                        <Settings className='dropDownFeedback' />
                        <span className="dropDownFeedbackName">Settings & Privacy</span>
                    </div>
                    <div className="dropDownProfile">
                        < Help className='dropDownFeedback' />
                        <span className="dropDownFeedbackName">Help & Support</span>
                    </div>
                    <div className="dropDownProfile">
                        < DarkMode className='dropDownFeedback' />
                        <span className="dropDownFeedbackName">Display & Accessibility</span>
                    </div>
                    <div className="dropDownProfile" onClick={handleLogout}>
                        < Logout className='dropDownFeedback' />
                        <span className="dropDownFeedbackName">Logout</span>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;