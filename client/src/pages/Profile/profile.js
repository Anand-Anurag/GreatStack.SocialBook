import './profile.css';
import NavBar from '../../components/NavBar/navbar';
import { CardTravelSharp, Done, Home, LocationOn, MoreHoriz, PersonAdd, QuestionAnswer, School } from '@mui/icons-material';
import Feed from '../../components/Feed/feed';
import { Users } from '../../dummyData';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useParams, useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const Profile = () => {
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const history = useHistory();

    const userId = useParams().userId;
    const [user, setUser] = useState([]);
    useEffect(() => {
        const fetchUser = async() => {
            const res = await axios.get(`/users?userId=${userId}`);
            setUser(res.data);
        }
        fetchUser();
    }, [userId]);

    const [isFriend, setIsFriend] = useState(false);
    useEffect(() => {
        return setIsFriend(currentUser?.followings.includes(user?._id));
    }, [currentUser, user]);

    const handleFriend = async () => {
        try {
            if (isFriend) {
                await axios.put(`/users/${user._id}/unfollow`, { userId: currentUser._id });
                dispatch({ type: "UNFOLLOW", payload: user._id });
            } else {
                await axios.put(`/users/${user._id}/follow`, { userId: currentUser._id });
                dispatch({ type: "FOLLOW", payload: user._id });
            }
            setIsFriend(!isFriend);
        } catch (err) {
            console.log(err)
        }
    };

    const handleMessage = async () => {
        try {
            let res;
            res = await axios.get(`/conversations/${currentUser._id}/${user._id}`);
            if (!res.data.length) {
                res = await axios.post('/conversations', {
                    senderId: currentUser._id,
                    receiverId: user._id
                });
            }
            history.push('/messenger');
        } catch (err) { console.log(err) }
    }

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className='profile'>
            < NavBar />
            <div className="profileBody">
                <img src={user? PF+user.coverPicture : `${PF}content/logo-blue.png`} alt="Cover" className="coverPic" />
                <div className="profileDetails">
                    <img src={user? PF+user.profilePicture : `${PF}content/noAvatar.png`} alt="Profile" className="profilePic" />
                    <div className='profileDetail'>
                        <h2 className="profileName">{user?.username}</h2>
                        <span className="profileSubs">{`${user?.followings?.length} - Friends`}</span>
                        <ul className="profileFriends">
                            <img src={PF + "member-1.png"} alt="Friend 1" className="profileFriend" />
                            <img src={PF + "member-2.png"} alt="Friend 2" className="profileFriend" />
                            <img src={PF + "member-3.png"} alt="Friend 3" className="profileFriend" />
                            <img src={PF + "member-5.png"} alt="Friend 4" className="profileFriend" />
                            <img src={PF + "moreMember.png"} alt="More Friends" className="profileFriend" />
                        </ul>
                    </div>
                    <div className="profileButtons">
                        {user?._id !== currentUser?._id && <button className='addFriend' style={{backgroundColor: isFriend? "blue": "rgb(233, 233, 237)", color: isFriend? "white":'black'}} onClick={handleFriend} >{ isFriend ? < Done className='profileButtonIcon' />: < PersonAdd className='profileButtonIcon' /> }<h4 className='profileButtonText'>Friend</h4></button> }
                        {user?._id !== currentUser?._id && <button className='message' onClick={handleMessage}>< QuestionAnswer className='profileButtonIcon' /><h4 className='profileButtonText'>Message</h4></button> }
                        {user?._id === currentUser?._id && <Link to={`/profile/edit/${user?._id}`}>
                            <button className='more'>< MoreHoriz /></button>
                        </Link>}
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="contentSideBar">
                    <div className="contentIntro">
                        {user.desc? <h3 className="contentTitle">Intro</h3> :""}
                        {user.desc? <p>{user.desc}</p> :""}
                        {user.desc? <hr className='contentHr' /> :""}
                        <ul className="info">
                            {user.work? <li className="infoItem">
                                < CardTravelSharp className='infoLogo' />
                                <span className="infoText">Director at {user.work}</span>
                            </li> : ""}
                            {user.college? <li className="infoItem">
                                < School className='infoLogo' />
                                <span className="infoText">Studied {user.college}</span>
                            </li>:""}
                            {user.school? <li className="infoItem">
                                < School className='infoLogo' />
                                <span className="infoText">Went to {user.school}</span>
                            </li>:""}
                            {user.city? <li className="infoItem">
                                < Home className='infoLogo' />
                                <span className="infoText">Lives in {user.city}</span>
                            </li>:""}
                            {user.from? <li className="infoItem">
                                < LocationOn className='infoLogo' />
                                <span className="infoText">From {user.from}</span>
                            </li>:""}
                        </ul>
                    </div>
                    <div className="contentPhotos">
                        <div className="contentPhotosTop">
                            <h3 className="contentTitle">Photos</h3>
                            <button className="allPhotos">All Photos</button>
                        </div>
                        <ul className="contentPhotosBottom">
                            { Users.map(u => (
                                <img key={u.id} className='picListItem' src={u.profilePicture? PF+u.profilePicture : PF+'content/noAvatar.png'} alt="Friend" />
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="contentMain">
                    < Feed userId={userId} />
                </div>
            </div>
        </div>
    );
}

export default Profile;