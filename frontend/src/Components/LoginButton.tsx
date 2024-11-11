import '../styles/login_button.css';

const LoginButton = ({ button_type }: { button_type: React.ButtonHTMLAttributes<HTMLButtonElement>['type'] }) => {
  return (
    <button type={button_type} className="login-button">Log In</button>
  );
};

export default LoginButton;