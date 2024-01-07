import PublicLayout from "../../Layout/PublicLayout/PublicLayout";
import RTHeader from "../../Components/RTHeader/RTHeader";

const RegisterPageContainer = () => {
  return <div>RegisterPage</div>;
};
const RegisterPage = () => {
  return (
    <PublicLayout header={<RTHeader />} content={<RegisterPageContainer />} />
  );
};

export default RegisterPage;
