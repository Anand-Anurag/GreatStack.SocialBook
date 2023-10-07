import './home.css';
import NavBar from '../../components/NavBar/navbar';
import SideBar from '../../components/SideBar/sidebar';
import RightBar from '../../components/RightBar/rightbar';
import Feed from '../../components/Feed/feed';

const Home = () => {
    return (
        <div className='home'>
            <NavBar />
            <div className="homeContainer">
                < SideBar />
                < Feed home/>
                < RightBar />
            </div>
        </div>
    );
}

export default Home;