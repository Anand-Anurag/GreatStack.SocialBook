import Login from './pages/Login/login';
import Register from './pages/Register/register';
import Home from './pages/Home/home';
import Profile from './pages/Profile/profile';
import Messenger from './pages/Messenger/messenger';
import EditProfile from './pages/EditProfile/editProfile';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
    const { user } = useContext(AuthContext);
    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    {user? <Home /> : <Login />}
                </Route>
                <Route path='/login'>
                    {user ? <Redirect to='/' /> : <Login />}
                </Route>
                <Route path='/register'>
                    {user ? <Redirect to='/' /> : <Register />}
                </Route>
                <Route path='/messenger'>
                    {user ? <Messenger /> : <Redirect to='/' />}
                </Route>
                <Route path='/profile/edit/:userId'>
                    {user ? <EditProfile /> : <Profile /> }
                </Route>
                <Route path='/profile/:userId'>
                    <Profile />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;