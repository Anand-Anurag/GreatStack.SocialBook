import './onlineChats.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const OnlineChats = ({ onlineUsers, currentUser, setCurrentChat, setFriend, setMessages }) => {
    const [ friends, setFriends ] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const [currentChat, setCurrentNew] = useState([]);

    useEffect(() => {
        try {
            const getMessages = async () => {
                const res = await axios.get(`/messages/${currentChat?._id}`);
                setMessages(res.data);
            }
            getMessages();
        } catch (err) { console.log(err) }
    }, [currentChat, setMessages]);

    useEffect(() => {
        const getFriends = async () => {
            try {
                const res = await axios.get(`/users/friends/${currentUser}`);
                setFriends(res.data);
            } catch (err) { console.log(err); }
        }
        getFriends();
    }, [currentUser]);

    useEffect(() => {
        setOnlineFriends(friends?.filter(f => onlineUsers?.includes(f._id)));
    }, [friends, onlineUsers]);

    const handleClick = async (user) => {
        try {
            const conversation = await axios.get(`/conversations/${currentUser}/${user._id}`);
            setCurrentChat(conversation?.data[0]);
            setCurrentNew(conversation?.data[0]);
            const res = await axios.get(`/users?userId=${currentChat.members.filter(f => f === user._id)}`);
            setFriend({
                _id: res.data._id,
                name: res.data.username,
                dp: res.data.profilePicture || `${PF}content/noAvatar.png`
            });
        } catch (err) { console.log(err); }
    }

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="chatOnline">
            {onlineFriends.map(f =>
                <div key={f?._id} className='clickDiv' onClick={() => handleClick(f)}>
                    <div className="onlineFriend" >
                        <img src={ f?.profilePicture? PF+f.profilePicture : `${PF}content/noAvatar.png` } alt="Online Friend" className="onlineFriendImg" />
                        <span className="onlineFriendBadge"></span>
                        <span className="onlineFriendName">{ f?.username }</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OnlineChats;