import '../styles/create_account_button.css';

interface CreateAccountButtonProps {
  id: string;
  button_type: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  onClick: (event:React.MouseEvent<HTMLElement>) => void;
}

const CreateAccountButton = ({ id, button_type, onClick }: CreateAccountButtonProps) => {
  return (
    <button type={button_type} className="create-account-button" id={id} onClick={button_type === 'submit' ? undefined : onClick}>Create Account</button>
  );
};

export default CreateAccountButton;
