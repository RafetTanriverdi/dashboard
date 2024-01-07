import PublicLayout from "../../Layout/PublicLayout/PublicLayout";
import RTHeader from "../../Components/RTHeader/RTHeader";

const ContactPageContainer = () => {
  return <div>ContactPage</div>;
};

const ContactPage = () => {
  return (
    <PublicLayout content={<ContactPageContainer />} header={<RTHeader />} />
  );
};

export default ContactPage;
