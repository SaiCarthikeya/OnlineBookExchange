import './index.css'
import { useNavigate } from 'react-router-dom';
const Header = (props) => {
    const {currentTab, changeTab} = props 
    const classNameHome = currentTab === 'home'? 'current': ''
    const classNameAbout = currentTab === 'about'? 'current': ''
    const classNameHistory = currentTab === 'history'? 'current': ''
    const navigate = useNavigate();
    const setTab = (value) => {
        changeTab(value)
    }
    const handleLogout= () => {
        navigate('/login')
        localStorage.setItem('isAuthenticated', false);
    }
    return (
        <div className="header-section">
            <h1 className="website-heading">Online Book Exchange</h1>
            <div className="tabs-container">
                <p className={`tab-text ${classNameHome}`} onClick={() => setTab('home')}>Home</p>
                <p className={`tab-text ${classNameHistory}`} onClick={() => setTab('history')}>History</p>
                <p className={`tab-text ${classNameAbout}`} onClick={() => setTab('about')}>About</p>
                <p className={`tab-text`} onClick={() => handleLogout()}>Logout</p>
            </div>
        </div>
    )
}

export default Header