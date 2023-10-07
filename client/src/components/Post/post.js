import './post.css'
import { MoreVert, ThumbUp, Forum, Reply, ArrowDropDown } from '@mui/icons-material';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { format } from 'timeago.js'; 
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Post = ({ post }) => {
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);

    const { user: currentUser } = useContext(AuthContext);
    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
    }, [post.likes, currentUser]);
    
    const [user, setUser] = useState([]);
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post?.userId}`);
            setUser(res.data);
        }
        fetchUser();
    }, [post]);

    const likeHandler = async() => {
        try {
            await axios.put('/posts/'+post._id+'/like', {userId: currentUser._id});
        } catch (e) {}
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    }

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className='post'>
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user._id}`}>
                            <img src={PF+user.profilePicture || PF + 'content/noAvatar.png'} alt="Profile" className="postTopImg" />
                        </Link>
                        <div className="postTopContainer">
                            <span className="postUsername">{user.username}</span>
                            <span className="postDate">{format(post.createdAt)}</span>
                        </div>
                    </div>
                    <div className="postTopRight">
                        < MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{ post?.desc }</span>
                    {post.img && <img src={PF + post.img} alt="Post" className="postImg" />}
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <div className="likeContainer">
                            < ThumbUp color={isLiked?'primary': 'action'} className='likeLogo' onClick={ likeHandler } />
                            <span className="likeCounter">{like}</span>
                        </div>
                        <div className="commentContainer">
                            < Forum className='commentLogo' color='action' />
                        </div>
                        <div className="shareContainer">
                            < Reply className='shareLogo' color='action'/>
                        </div>
                    </div>
                    <div className="postBotomRight">
                        <img src={PF+user.profilePicture} alt="" className="postBottomImg" />
                        < ArrowDropDown />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;