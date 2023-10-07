import axios from 'axios';
import { useEffect, useState } from 'react';
import './conversations.css';

const Conversations = ({ conversation, currentUser }) => {
    const [friend, setFriend] = useState([]);

    useEffect(() => {
        try {
            const friendId = conversation.members.find(m => m !== currentUser._id);
            const getUser = async () => {
                const res = await axios.get(`/users?userId=${friendId}`);
                setFriend(res.data);
            }
            getUser();
        } catch (err) {
            console.log(err);
        }
    }, [conversation, currentUser]);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="conversation">
            <img src={ friend.profilePicture? PF+friend.profilePicture : `${PF}content/noAvatar.png` } alt="Person" className="conversationImg" />
            <div className="conversationName">{ friend?.username }</div>
        </div>
    );
}

export default Conversations;