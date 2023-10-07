import './rightbar.css';
import OnlineFriends from '../Online/onlineFriends';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Rightbar = () => {
    const { user: currentUser } = useContext(AuthContext);
    const [friends, setFriends] = useState([]);
    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get('/users/friends/' + currentUser._id);
                setFriends(friendList.data);
            } catch (err) { }
        }
        getFriends();
    }, [currentUser]);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className='rightbar'>
            <div className="Events"></div>
            <div>
                <span className='RightbarTitles'>Advertisements</span>
                <img className='AdImg' src={`${PF}/advertisement.png`} alt="Ad" />
            </div>
            <div>
                <span className='RightbarTitles'>Friends</span>
                <ul className="Online">
                    {friends.map(u => (
                        < Link key={u._id} to={`profile/${u._id}`}>
                            < OnlineFriends user={u} />
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Rightbar;