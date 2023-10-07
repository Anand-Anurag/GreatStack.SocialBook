import './share.css'
import { Mood, CameraAlt, LocationOn, Label, ArrowDropDown, Cancel } from '@mui/icons-material';
import { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios';

const Share = () => {
    const { user } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const desc = useRef();

    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
                userId: user._id,
                desc: desc.current.value
            }
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            try {
                const res = await axios.post('/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                newPost.img = res.data.fileName;
            } catch (err) {}
        }
        try {
            await axios.post('/posts/', newPost);
            window.location.reload();
        }catch(err){}
    }

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className='share'>
            <div className="shareTop">
                <div className='shareProfileContainer'>
                    <Link to={`/profile/${user._id}`}>
                        <img src={user? PF+user.profilePicture : `${PF}content/noAvatar.png`} alt="Profile" className="shareProfile" />
                    </Link>
                    <div className='shareDetails'>
                        <span className='shareProfileText'>{ user?.username }</span>
                        < ArrowDropDown className='shareProfileOption' />
                        <span className='shareProfileOptionText'>Public</span>
                    </div>
                </div>
                <input placeholder={"What's on your mind, " + user?.username + '?'} className='shareInput' ref={desc}/>
            </div>
            <hr className='shareHr' />
            {file && <div className="shareImgContainer">
                <img src={URL.createObjectURL(file)} alt="Share" className="shareImg" />
                < Cancel className='cancelShareImg' onClick={ () => setFile(null) } />
            </div>}
            <div className="shareBottom">
                <form className="shareOptions" onSubmit={submitHandler} name="file">
                    <label htmlFor='photosNvideos' className="shareOption">
                        < CameraAlt color='success' />
                        <input id='photosNvideos' type="file" accept='.png, .jpg, .jpeg, .heif, .mp4, .hevc' onChange={(e) => (setFile(e.target.files[0]))} />
                        <span className='shareOptionText'>Photo/Video</span>
                    </label>
                    <div className="shareOption">
                        < LocationOn color='error' />
                        <span className='shareOptionText'>Location</span>
                    </div>
                    <div className="shareOption">
                        < Label color='primary' />
                        <span className='shareOptionText'>Tag</span>
                    </div>
                    <div className="shareOption">
                        < Mood color='warning' />
                        <span className='shareOptionText'>Feeling</span>
                    </div>
                    <button type="submit" className="shareButton">Post</button>
                </form>
            </div>
        </div>
    );
}

export default Share;