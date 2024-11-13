import '../styles/create_account_button.css';

interface CreateAccountButtonProps {
  button_type: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  onClick?: () => void;
}

const CreateAccountButton = ({ button_type, onClick }: CreateAccountButtonProps) => {
  return (
    <button type={button_type} className="create-account-button" onClick={button_type === 'submit' ? undefined : onClick}>Create Account</button>
  );
};

export default CreateAccountButton;
