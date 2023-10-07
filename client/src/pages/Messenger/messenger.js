import './messenger.css';
import NavBar from '../../components/NavBar/navbar';
import { Search, Send } from '@mui/icons-material';
import Conversations from '../../components/Conversations/conversations';
import Message from '../../components/Message/message';
import OnlineChats from '../../components/OnlineChats/OnlineChats';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { io } from 'socket.io-client';
import { Link } from 'react-router-dom';

const Messenger = () => {
    const [ conversations, setConversations ] = useState([]);
    const [ messages, setMessages ] = useState([]);
    const [ currentChat, setCurrentChat  ] = useState(null);
    const [ friend, setFriend ] = useState(null);
    const [ newMessage, setNewMessage ] = useState("");
    const [ arrivalMessage, setArrivalMessage ] = useState(null);
    const [ onlineFriends, setOnlineFriends ] = useState([]);
    const { user } = useContext(AuthContext);
    const scrollRef = useRef();

    //Socket.io
    const socket = useRef();

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", (data) => setArrivalMessage({
            senderId: data.senderId,
            text: data.text,
            createdAt: Date.now()
        }));
    }, []);

    useEffect(() => {
        try {
            socket.current?.emit('addUser', user?._id);
            socket.current?.on('getUsers', users => {
                setOnlineFriends(user.followings.filter(f => users?.some(u => u.userId === f)));
            });
            const getConversations = async () => {
                const res = await axios.get(`/conversations/${user?._id}`);
                setConversations(res.data.sort((c1, c2)=>(new Date(c2.updatedAt) - new Date(c1.updatedAt))));
            }
            getConversations();
        } catch (err) { console.log(err); }
    }, [user]);

    const updateTime = async () => {
        await axios.put(`/conversations/updateConversation/${currentChat?._id}`);
    }
    
    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.senderId) && setMessages((prev) => [...prev, arrivalMessage]);
        updateTime(currentChat?._id);
    }, [arrivalMessage, currentChat]);

    //Others

    useEffect(() => {
            try {
                const getMessages = async () => {
                    const res = await axios.get(`/messages/${currentChat?._id}`);
                    setMessages(res.data);
                }
            getMessages();
        } catch (err) {
            console.log(err);
        }
    }, [currentChat]);

    const handleInput = async (e) => {
        e.preventDefault();
        //Send to Socket Server
        onlineFriends?.includes(friend?._id) &&
        socket.current?.emit('sendMessage', {
            senderId: user._id,
            receiverId: friend?._id,
            text: newMessage
        });

        try {
            const res = await axios.post('/messages', {
                conversationId: currentChat._id,
                senderId: user._id,
                text: newMessage
            });
            updateTime(currentChat?._id);
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <>
            < NavBar />
            <div className="messenger">
                <div className="recentChats">
                    <div className="recentChatSearch">
                        <input type="text" className="recentChatSearchInput" placeholder='Find Chats' />
                        < Search className='recentChatSearchIcon' />
                    </div>
                    <div className="convos">
                        <span className="messengerTitle">Recent Chats</span>
                        <div className="recentChatList">
                            {conversations.map(conversation =>
                                <div key={conversation._id} onClick={async() => {
                                    setCurrentChat(conversation);
                                    const res = await axios.get(`/users?userId=${conversation?.members.filter(f => f !== user._id)}`);
                                    setFriend({
                                        _id: res.data._id,
                                        name: res.data.username,
                                        dp: res.data.profilePicture || 'content/noAvatar.png'
                                    });
                                }} >
                                    < Conversations key={conversation._id+'1'} conversation={conversation} currentUser={user} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="chatBox">
                    { currentChat ?
                        <>
                            <Link to={`/profile/${friend?._id}`} >
                                <div className="chatBoxTop">
                                    <img src={friend?.dp? PF+friend.dp : `${PF}content/noAvatar.png`} alt="Friend" className="chatBoxTopImg" />
                                    <span className="chatBoxTopName">{friend?.name}</span>
                                </div>
                            </Link>
                            <ul className="chatBoxChats">
                                {messages.map(m =>
                                    <div key={m._id+'0'} ref={scrollRef}>
                                        < Message key={m._id} message={m} own={ m.senderId === user._id } />
                                    </div>
                                )}
                            </ul>
                            <form className="chatBoxInput" onSubmit={handleInput}>
                                <input type="text" className='chatInput' placeholder='Type Something...' onChange={(e) => setNewMessage(e.target.value)} value={ newMessage } />
                                <button type="submit">< Send className='sendButtonIcon' /></button>
                            </form>
                        </> : <span className='noChats'>Start&nbsp;&nbsp;a&nbsp;&nbsp;conversation...</span>}
                </div>
                <div className="onlineChats">
                    <span className="messengerTitle">Online Friends</span>
                    <div className="onlineFriends">
                        < OnlineChats
                            onlineUsers={onlineFriends}
                            currentUser={user._id}
                            setFriend={setFriend}
                            setCurrentChat={setCurrentChat}
                            setMessages={setMessages}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Messenger;