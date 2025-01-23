# Dashboard App
![sdfsdf drawio (1)](https://github.com/user-attachments/assets/93960b78-4d6b-46fd-9c03-8cd3c449f433)


# **Project Overview**

I have been developing an application for a while now, and it includes many features and architectures. The main purpose was to create a **dashboard** that supports product management for an **e-commerce site**. Over time, I extended the application to include **authorization systems** within it.

The application supports products being added, updated, or deleted, and these operations are synchronized with both the **database** and **Stripe** for payments. Products are categorized, ensuring dependencies like:

- A product **cannot exist** without a category.
- A category **cannot be deleted** if it has linked products.

### **Application Pages**

The application consists of the following pages:

1. **Products**: Add, delete, and update product information.
2. **Categories**: Manage product categories with dependency constraints.
3. **Users**: Assign roles and permissions to team members for product updates and order management.
4. **Customers**: View detailed data and statistics of registered e-commerce users.
5. **Orders**: Track, update statuses, view delivery details, and process refunds.
6. **My Profile**: Update account information and change passwords.
7. **Calendar**: Display a summary of past events on a **monthly or yearly** basis.
8. **Dashboard**: Visualize analytics such as:
    - Top products from the last 6 months,
    - Top categories,
    - Conversion funnels,
    - Number of site visitors.

---

## **Technologies and Architecture**

### **1. Authentication**

- The application includes **Public** (e.g., Login, Register) and **Private** pages.
- **AWS Cognito** handles user registration and authentication.
- User attributes are stored in **DynamoDB** via **Lambda functions**.
- Unauthorized users are restricted from accessing private pages, and **Bearer tokens** (from Cognito) are required for API operations.

---

### **2. Authorization**

- Users are assigned the **"owner" role** by default upon registration.
- Permissions are managed via **Cognito JWT tokens** and decoded on the server to enforce role-based access.
- **CASL** library ensures efficient front-end rendering control, preventing unnecessary **re-renders** based on permissions.

### **Permissions**

```markdown
Product: Read, Create, Update, Delete
Category: Read, Create, Update, Delete
User: Read, Create, Update, Delete
Order: Read, Refund, Update, Delete
Customer: Read, Details, Update, Delete
```

---

### **3. Hosting**

- **AWS CloudFront** handles hosting and distribution.
- **GitHub Actions** is used for CI/CD. The pipeline:
    1. Builds the project on push.
    2. Stores the build artifacts in an **S3 bucket**.
    3. Hosts the application via **CloudFront**.

---

### **4. Payment Integration**

- Stripe is integrated in **test mode** to process payments:
    - Users can simulate payments with a test card like `4242 4242 4242 4242`.
    - **Refunds** can be initiated from the dashboard, with total balances and refunded amounts displayed.
- Stripe data is synchronized with the **database**.

---

### **5. Database**

The following data structures are managed:

- **Products**: Synced between **Stripe** and **DB** (including Stripe IDs).
- **Categories**: Stored exclusively in the **DB**.
- **Orders**: Stored in both **Stripe** and **DB**.
- **Customers**:
    - User details are managed in **Cognito**.
    - New customers trigger a **Lambda function** to create a **Stripe customer profile**.
    - The Stripe ID is written to the database and displayed on the dashboard.

---

### **6. APIs**

- The application communicates with the database via **REST APIs**.
- An additional domain-specific **REST API** handles incoming e-commerce data.
- Stripe **webhooks** are used to manage post-payment events and automate workflows.
- All REST APIs and **Lambda functions** are built using **Node.js**.

---

## **Running the Project Locally**

To test this project locally, follow the steps below:

### **Prerequisites**

Ensure the following tools are installed on your machine:

- **Node.js** (version 18+ recommended)
- **pnpm** (a fast, efficient package manager)
- **Vite** (included in the project setup)

---

### **Installation Steps**

1. **Clone the Repository**
Use the following command to clone the project to your local machine:
    
    ```bash
     git clone https://github.com/your-repository-name.git
    ```
    
2. **Navigate to the Project Directory**
Move into the project folder:
    
    ```bash
    cd your-repository-name   
    ```
    
3. **Install Dependencies**
Run the following command to install all required packages:
    
    ```bash
    pnpm install
    
    ```
    
4. **Configure Environment Variables**
Create a `.env` file in the root directory and add the necessary environment variables, such as:
    
    ```
    VITE_AWS_IDENTITY_POOL_ID=your-identity-pool-id
    VITE_AWS_USER_POOL_ID=your-user-pool-id
    VITE_AWS_USER_POOL_WEB_CLIENT_ID=your-user-pool-web-client-id
    ```
    
5. **Run the Development Server**
Start the local development server using Vite:
    
    ```bash
    pnpm dev
    ```
    
6. **Access the Application**
Open your browser and navigate to:
    
    ```
    http://localhost:5173
    ```
    

---

### **Building for Production**

If you want to test the production build locally:

1. Build the project:
    
    ```bash
    pnpm build
    ```
    
2. Serve the production files:
    
    ```bash
    pnpm preview
    ```
    

---

## **Key Takeaways**

This application demonstrates:

- **Scalable architecture** using AWS (Cognito, Lambda, S3, CloudFront, DynamoDB).
- **Payment processing** and refund mechanisms via Stripe.
- **Role-based access control** with CASL and AWS Cognito.
- **Seamless CI/CD** integration through GitHub Actions.
- Efficient **data synchronization** between Stripe and the database.
