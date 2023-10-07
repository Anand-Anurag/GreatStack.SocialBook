import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './status.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Status = () => {
    const [friends, setFriends] = useState([]);
    const [myStatus, setMyStatus] = useState([]);
    const [friendsStatus, setFriendsStatus] = useState([]);
    const [allStatus, setAllStatus] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const getMyStatus = async () => {
            const res = await axios.get(`/status/${user?._id}`);
            setMyStatus(res.data);
        }
        getMyStatus();

        const getFriends = async () => {
            const res = await axios.get(`/users/friends/${user?._id}`);
            setFriends(res.data);
        }
        getFriends();
    }, [user]);

    useEffect(() => {
        const getAllStatus = async () => {
            const res = await axios.get('/status');
            setAllStatus(res.data);
        }
        getAllStatus();
    }, []);

    useEffect(() => {
        setFriendsStatus(allStatus?.filter(s => friends?.some(f => f._id === s.userId)));
    }, [allStatus, friends]);

    const handleAddStory = async (e) => {
        //Delete Previos If Any
        if (myStatus) {
            try {
                await axios.delete(`/status/${user?._id}`);
            } catch (err) { console.log(err); }
        }

        const statusFile = e.target.files[0];
        if (statusFile) {
            const newStatus = {
                userId: user?._id,
                username: user?.username,
                profilePicture: user? user.profilePicture : 'content/noAvatar.png'
            }
            const formData = new FormData();
            formData.append('file', statusFile);
            try {
                const res = await axios.post('/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                newStatus.img = res.data.fileName;

                await axios.post('/status', newStatus);
                window.location.reload();
            } catch (err) { console.log(err); }
        } else {
            alert("Please Upload an Image !");
        }
    }
    
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="statusWrapper">
            <form name="file" className="stories">
                <img className='statusImg' src={myStatus? PF+myStatus.img : PF+user?.profilePicture? PF+user.profilePicture : `${PF}content/noAvatar.png`} alt="Status" />
                <label htmlFor="statusInput">
                    < AddCircleIcon fontSize='large' className='newStatus' />
                </label>
                <input type="file" id="statusInput" accept='.png, .jpg, .jpeg, .heif, .mp4, .hevc' onChange={(e) => handleAddStory(e) } />
            </form>
            {friendsStatus.map(s =>
                <div className="stories" key={s._id+'0'}>
                    <img src={s.profilePicture? PF+s.profilePicture : PF+'content/noAvatar.png'} alt="Status Profile" className="statusProfileImg" />
                    <img className='statusImg' src={PF + s.img} alt="Status" />
                    <span className='statusName' >{s.username}</span>
                </div>
            )}
        </div>
    );
}

export default Status;