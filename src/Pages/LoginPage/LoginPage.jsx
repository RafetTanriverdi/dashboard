/* eslint-disable no-unused-vars */
import React from "react";
import PublicLayout from "../../Layout/PublicLayout/PublicLayout";
import RTHeader from "../../Components/RTHeader/RTHeader";
import { Form } from "antd";
import { RTInput } from "../../Components/RTInput";
import './LoginPage.scss'
import { Card } from "antd";


const LoginPageContainer = () => {
  return (
    <Form className="login-container"> 
    <Card style={{background:'#828282'}} >

      <RTInput.text className='input'/>
      <RTInput.password className='input'/>
    </Card>
    </Form>
  );
};
const LoginPage = () => {
  return (
    <PublicLayout header={<RTHeader />} content={<LoginPageContainer />} />
  );
};

export default LoginPage;
