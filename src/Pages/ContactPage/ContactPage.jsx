import PublicLayout from "../../layout/PublicLayout/PublicLayout";
import RTHeader from "../../components/RTHeader/RTHeader";

const ContactPageContainer = () => {
  return <div>ContactPage</div>;
};

const ContactPage = () => {
  return (
    <PublicLayout content={<ContactPageContainer />} header={<RTHeader />} />
  );
};

export default ContactPage;
