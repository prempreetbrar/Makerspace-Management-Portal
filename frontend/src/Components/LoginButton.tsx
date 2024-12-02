// This component should probably be split into two but it works so we can leave it

import '../styles/login_button.css';

interface LoginButtonProps {
  id: string;
  text?: string;
  button_type: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const LoginButton = ({ id, text, button_type, onClick }: LoginButtonProps) => {
  return (
    <button type={button_type} className="login-button" id={id} onClick={button_type === 'submit' ? undefined : onClick}>
      {text || 'Login'}
    </button>
  );
};

export default LoginButton;