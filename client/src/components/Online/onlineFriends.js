import './onlineFriends.css'

const onlineFriends = ({ user }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li key={user._id} className="rightbarFriend">
            <img src={ user.profilePicture? PF+user.profilePicture : `${PF}content/noAvatar.png`} alt="Profile" className="rightbarFriendPic" />
            <span className="rightbarFriendName">{user.username}</span>
        </li>
    );
}

export default onlineFriends;