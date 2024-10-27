/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const awsmobile = {
    "aws_project_region": "us-east-1",
    "aws_cognito_identity_pool_id": "us-east-1:dc1fb806-6b3e-4c6e-80ad-08ef86316c71",
    "aws_cognito_region": "us-east-1",
    "aws_user_pools_id": "us-east-1_aGkZLpxYC",
    "aws_user_pools_web_client_id": "13ifndkmoo2onltce9bqtq6j38",
    "oauth": {
        "domain": "reactdashboardappaabfbded-aabfbded-dev.auth.us-east-1.amazoncognito.com",
        "scope": [
            "phone",
            "email",
            "openid",
            "profile",
            "aws.cognito.signin.user.admin"
        ],
        "redirectSignIn": "http://localhost:5173/,https://d3o0qmvpbmut8f.cloudfront.net/dashboard,",
        "redirectSignOut": "http://localhost:5173/,https://d3o0qmvpbmut8f.cloudfront.net/login",
        "responseType": "code"
    },
    "federationTarget": "COGNITO_USER_POOLS",
    "aws_cognito_username_attributes": [
        "EMAIL"
    ],
    "aws_cognito_social_providers": [
        "GOOGLE"
    ],
    "aws_cognito_signup_attributes": [
        "EMAIL",
        "NAME"
    ],
    "aws_cognito_mfa_configuration": "OFF",
    "aws_cognito_mfa_types": [
        "SMS"
    ],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": 8,
        "passwordPolicyCharacters": []
    },
    "aws_cognito_verification_mechanisms": [
        "EMAIL"
    ]
};


export default awsmobile;
