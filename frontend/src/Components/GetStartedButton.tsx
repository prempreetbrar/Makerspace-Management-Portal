import '../styles/get_started_button.css';
interface GetStartedButtonProps
{
    onClick: ()=>void
}
const GetStartedButton = ({onClick}:GetStartedButtonProps) => {
  return (
    <button className="get-started-button" onClick={onClick}>Get Started</button>
  );
};

export default GetStartedButton;