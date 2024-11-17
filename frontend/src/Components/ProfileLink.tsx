import '../styles/profile_link.css';

interface ProfileLinkProps {
  onClick?: () => void;
}

// Change href when profile page is created
const LoginButton = ({ onClick }: ProfileLinkProps) => {
  return (
    <a href="home"><img className='link-image' alt="React Logo"></img></a>
  );
};

export default LoginButton;