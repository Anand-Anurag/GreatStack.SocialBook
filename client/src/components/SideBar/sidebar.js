import './sidebar.css';
import { ShoppingCart, LiveTv } from '@mui/icons-material';

const Sidebar = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className='sidebar'>
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <img src={PF + "content/news.png"} alt="News" className="sidebarListItemImg" />
                        <span className="sidebarListItemText">&nbsp;Latest News</span>
                    </li>
                    <li className="sidebarListItem">
                        <img src={PF + "content/friends.png"} alt="Friends" className="sidebarListItemImg" />
                        <span className="sidebarListItemText">Friends</span>
                    </li>
                    <li className="sidebarListItem">
                        <img src={PF + "content/group.png"} alt="Groups" className="sidebarListItemImg" />
                        <span className="sidebarListItemText">&nbsp;Groups</span>
                    </li>
                    <li className="sidebarListItem">
                        < ShoppingCart color='primary' />
                        <span className="sidebarListItemText">MarketPlace</span>
                    </li>
                    <li className="sidebarListItem">
                        < LiveTv color='primary' />
                        <span className="sidebarListItemText">Watch</span>
                    </li>
                </ul>
                <button className="sidebarButton">Show More</button>
                <hr className='sidebarHr' />
                <span className='sidebarShortcutsTitle'>Your Shortcuts</span>
                <ul className="sidebarShortcuts">
                    <li className="sidebarShortcut">
                        <img className='sidebarShortcutImg' src={PF + "shortcuts/shortcut-1.png"} alt="Web Developers" />
                        <span className='sidebarShortcutText'>Web Developers</span>
                    </li>
                    <li className="sidebarShortcut">
                        <img className='sidebarShortcutImg' src={PF + "shortcuts/shortcut-2.png"} alt="Web Design Course" />
                        <span className='sidebarShortcutText'>Web Design Course</span>
                    </li>
                    <li className="sidebarShortcut">
                        <img className='sidebarShortcutImg' src={PF + "shortcuts/shortcut-3.png"} alt="Full Stack Development" />
                        <span className='sidebarShortcutText'>Full Stack Development</span>
                    </li>
                    <li className="sidebarShortcut">
                        <img className='sidebarShortcutImg' src={PF + "shortcuts/shortcut-4.png"} alt="Website Expert" />
                        <span className='sidebarShortcutText'>Website Expert</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;