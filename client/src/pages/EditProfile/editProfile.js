import './editProfile.css';
import NavBar from '../../components/NavBar/navbar';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useParams, useHistory } from 'react-router';
import axios from 'axios';

const EditProfile = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const history = useHistory();

    const userId = useParams().userId;
    const { user } = useContext(AuthContext);
    const [dp, setDp] = useState(null);
    const [coverImg, setCoverImg] = useState(null);

    const desc = useRef();
    const city = useRef();
    const from = useRef();
    const college = useRef();
    const school = useRef();
    const work = useRef();

    if (user._id !== userId) {
        return (
            <div>You Don't Have Permissions to do this...</div>
        );
    }

    const handleProfile = async (e) => {
        e.preventDefault();
        const updatedUser = {
            userId: user._id,
            desc: desc.current.value || user.desc,
            city: city.current.value || user.city,
            from: from.current.value || user.from,
            college: college.current.value || user.college,
            school: school.current.value || user.school,
            work: work.current.value || user.work
        }
        if (dp) {
            const formData = new FormData();
            formData.append('file', dp);
            try {
                const res = await axios.post('/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                updatedUser.profilePicture = res.data.fileName;
            } catch (err) {}
        }
        if (coverImg) {
            const formData = new FormData();
            formData.append('file', coverImg);
            try {
                const res = await axios.post('/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                updatedUser.coverPicture = res.data.fileName;
            } catch (err) {}
        }
        try {
            await axios.put(`/users/${user._id}`, updatedUser);
            history.push(`/profile/${user._id}`);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='editPage'>
            <NavBar/>
            <form className='editProfile' onSubmit={handleProfile} >
                <div className="coverDiv">
                    <label htmlFor="coverPic" className='labels'>
                        <span className="labelTitle">Edit Cover Picture</span>
                        {coverImg ? <img src={URL.createObjectURL(coverImg)} alt="Cover" className="coverImage" />
                            : <img src={user ? PF + user.coverPicture : `${PF}content/logo-blue.png`} alt="Cover" className="coverImage" />}
                    </label>
                    <input type="file" id='coverPic' className='dis' onChange={(e) => setCoverImg(e.target.files[0]) } />
                </div>

                <div className="dpDiv">
                    <label htmlFor="dp" className='labels'>
                        <span className="labelTitle">Edit Profile Picture</span>
                        {dp? <img src={URL.createObjectURL(dp)} alt="Profile" className='dpPic'/>
                        : <img src={user ? PF + user.profilePicture : `${PF}content/noAvatar.png`} alt="Profile" className='dpPic'/>}
                    </label>
                    <input type="file" id='dp' className='dis' onChange={(e) => setDp(e.target.files[0])} />
                </div>

                <div className="otherDetails">
                    <div className="otherDetailsLeft">
                        <label htmlFor="desc">Description :</label>
                        <input type="text" id='desc' className='desc input' placeholder={user.desc || ""} ref={desc} />

                        <label htmlFor="livesIn">Lives In :</label>
                        <input type="text" id='livesIn' className='city input' placeholder={user.city || ""} ref={city} />
                        
                        <label htmlFor="from">From :</label>
                        <input type="text" id='from' className='from input' placeholder={user.from || "" } ref={from} />
                    </div>
                    <div className="otherDetailsRight">
                        <label htmlFor="school">School :</label>
                        <input type="text" id='school' className='desc input' placeholder={user.school || ""} ref={school} />
                        
                        <label htmlFor="clg">College :</label>
                        <input type="text" id='clg' className='desc input' placeholder={user.college || ""} ref={ college } />
                        
                        <label htmlFor="work">Work :</label>
                        <input type="text" id='work' className='desc input' placeholder={user.work || ""} ref={ work } />
                    </div>
                </div>

                <button type="submit" className='submitBtn'>Update Details</button>
            </form>
        </div>
    );
}

export default EditProfile;