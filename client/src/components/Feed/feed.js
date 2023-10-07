import './feed.css';
import Share from '../Share/share';
import Post from '../Post/post';
import Status from '../Status/status';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

export default function Feed({userId, home}) {
    const [posts, setPosts] = useState([]);
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = userId? await axios.get(`/posts/profile/${userId}`) : await axios.get('/posts/timeline/'+currentUser?._id);
            setPosts(res.data.sort((p1, p2)=>(new Date(p2.updatedAt) - new Date(p1.updatedAt))));
        }
        fetchPosts();
    }, [userId, currentUser]);

    return (
        <div className='feed'>
            { home && < Status />}
            {userId ? currentUser?._id === userId && < Share /> : < Share />}
            {posts.map(p => (< Post key={p._id} post={p}/>))}
        </div>
    );
}