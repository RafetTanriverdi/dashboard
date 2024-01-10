import { Button, Result } from "antd";
import CenterLayout from "../../layout/CenterLayout/CenterLayout";
import { useNavigate } from "react-router-dom";
import { getRoutePath } from "../../routing/routes";
import { ROUTES_ID } from "../../routing/routes-id";

const NotFound404Page = () => {
  const navigate = useNavigate();

  return (
    <CenterLayout
      content={
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button
              type="primary"
              onClick={() => navigate(getRoutePath(ROUTES_ID.home))}
            >
              Back Home
            </Button>
          }
        />
      }
    />
  );
};
export default NotFound404Page;
