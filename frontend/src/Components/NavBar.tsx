import '../styles/navbar.css';
import LoginButton from './LoginButton';
import CreateAccountButton from './CreateAccountButton';
import { Link, useNavigate } from 'react-router-dom';
import NavLogo from '../assets/logo_grayscale.svg';
import { useState, useContext } from 'react';
import LoginPopover from './Loginpopover.tsx';
import CreateAccountPopover from './CreateAccountPopover.tsx';
import ProfileLink from './ProfileLink.tsx';
import { AuthContext, UserRoles } from '../contexts/AuthContext.tsx';

const NavBar = ({ id }: { id: string }) => {
    const { user } = useContext(AuthContext)!;
    const isLoggedIn = !!user;
    const isAdmin = user?.userRole === UserRoles.ADMIN;

    const [anchorElLogin, setAnchorElLogin] = useState<HTMLElement | null>(
        null
    );
    const handleOpenLogin = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElLogin(event.currentTarget);
        setAnchorElCreate(null);
    };
    const handleCloseLogin = () => setAnchorElLogin(null);
    const handleOpenProfile = (_event: React.MouseEvent<HTMLElement>) => {
        console.log('Opening profile page...');
    };
    const openLogin = Boolean(anchorElLogin);

    const [anchorElCreate, setAnchorElCreate] = useState<HTMLElement | null>(
        null
    );
    const handleOpenCreateAccount = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElCreate(event.currentTarget);
        setAnchorElLogin(null);
    };
    const handleCloseCreateAccount = () => setAnchorElCreate(null);
    const openCreateAccount = Boolean(anchorElCreate);

    return (
        <header className="nav-bar-container">
            <nav className="navbar" id={id}>
                <div className="left">
                    <div className="logo-container">
                        <a className="logo-wrapper" href="/home">
                            <img
                                className="logo"
                                src={NavLogo}
                                alt="React Logo"
                            />
                        </a>
                        <p className="logo-text">&nbsp;Makerspace</p>
                    </div>
                    <ul className="nav-links">
                        <li className="home">
                            <Link to="/home">Home</Link>
                        </li>
                        <li>
                            <Link to="/reserve">
                                {isAdmin
                                    ? 'Manage Equipment'
                                    : 'Reserve Equipment'}
                            </Link>
                        </li>
                        <li>
                            <Link to="/requests">
                                {isAdmin
                                    ? 'Manage Bookings'
                                    : 'My Reservations'}
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="auth-buttons">
                    {isLoggedIn ? (
                        <ProfileLink />
                    ) : (
                        <>
                            <LoginButton
                                id="nav-login"
                                button_type="button"
                                onClick={handleOpenLogin}
                            />
                            <CreateAccountButton
                                id="nav-create-account"
                                button_type="button"
                                onClick={handleOpenCreateAccount}
                            />
                        </>
                    )}
                </div>
                <LoginPopover
                    anchorEl={anchorElLogin}
                    openLogin={openLogin}
                    handleCloseLogin={handleCloseLogin}
                />
                <CreateAccountPopover
                    anchorEl={anchorElCreate}
                    openCreateAccount={openCreateAccount}
                    handleCloseCreateAccount={handleCloseCreateAccount}
                    handleOpenLogin={()=>handleOpenLogin}
                />
            </nav>
        </header>
    );
};

export default NavBar;
