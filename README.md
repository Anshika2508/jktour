# **Jammu and Kashmir Tourism Guide - User and Wishlist Management**

Welcome to **JKTour**, a web application for managing user data and saving wishlists of travel destinations. This project is hosted on [Vercel](https://jktour.vercel.app/), providing an easy-to-use platform for users to register, update their information, change their password, and save their favorite places to visit.

## **Features**

- **User Registration**: Users can create an account by providing basic information such as name, email, password, favorite book, and profile picture.
- **User Profile Update**: Users can update their personal information, such as name, favorite book, and profile picture.
- **Password Update**: Users can change their password securely.
- **Wishlist Management**: Users can save and update their wishlist of places they wish to visit.
- **View User Data**: Admin or other users can view the data of all users or search for specific users by email.
- **Freshchat Integration**: An AI-powered chat agent integrated with Freshchat for real-time assistance, providing an intelligent response to user queries about the platform, travel tips, or general assistance.
- **Search Bar**: Easily search for places or users by name, email, or location within the platform.
- **Restricted Sign-in**: The sign-in functionality has restricted access to ensure only authenticated users can log in to the platform, providing additional security.
- **Image Hosting with ImgHippo API**: All user-uploaded images, such as profile pictures, are hosted using the ImgHippo API, a free but reliable and efficient image hosting solution.


## **Tech Stack**

- **Frontend**: HTML, CSS, and JavaScript
- **Backend**: Node.js with Express.js
- **Database**: MongoDB (used locally for development)
- **Authentication**: Bcrypt.js for password hashing
- **Others**: CORS for cross-origin resource sharing
- **Chatbot Integration**: Freshchat API (for AI-powered chat support)
- **Image Hosting**: ImgHippo API (for efficient image hosting)

## **API Endpoints**

### **POST /createUser**
Creates a new user with the provided data.

**Request Body:**
```json
{
  "userData": {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "yourpassword",
    "favoriteBook": "Book Title",
    "profilePicUrl": "http://example.com/pic.jpg"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "johndoe@example.com"
  }
}
```

### **POST /updateUserData**
Updates an existing user's data (name, favorite book, profile picture).

**Request Body:**
```json
{
  "userData": {
    "email": "johndoe@example.com",
    "name": "John Doe Updated",
    "favoriteBook": "Updated Book Title",
    "profilePicUrl": "http://example.com/updated-pic.jpg"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "User data updated successfully"
}
```

### **POST /updatePassword**
Updates a user's password by providing the email and the new password.

**Request Body:**
```json
{
  "email": "johndoe@example.com",
  "password": "newpassword"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password updated successfully"
}
```

### **GET /getUserData**
Fetches the data of all users.

**Response:**
```json
{
  "success": true,
  "users": [
    {
      "_id": "user_id_1",
      "name": "John Doe",
      "email": "johndoe@example.com",
      "favoriteBook": "Book Title",
      "profilePicUrl": "http://example.com/pic.jpg"
    },
    {
      "_id": "user_id_2",
      "name": "Jane Doe",
      "email": "janedoe@example.com",
      "favoriteBook": "Another Book",
      "profilePicUrl": "http://example.com/pic2.jpg"
    }
  ]
}
```

### **GET /getUserDataByEmail**
Fetches a specific user's data based on their email.

**Request Query:**
```json
{
  "email": "johndoe@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "user_id_1",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "favoriteBook": "Book Title",
    "profilePicUrl": "http://example.com/pic.jpg"
  }
}
```

### **POST /save-wishlist**
Saves or updates a user's wishlist of places.

**Request Body:**
```json
{
  "userId": "user_id_1",
  "wishlistData": [
    "Place 1",
    "Place 2",
    "Place 3"
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Wishlist saved successfully",
  "wishlist": {
    "userId": "user_id_1",
    "places": ["Place 1", "Place 2", "Place 3"]
  }
}
```
### **Freshchat Integration**
Our platform includes an integrated AI-powered chat agent using Freshchat. This chatbot provides users with instant support for a wide variety of queries related to Jammu and Kashmir tourism, platform functionality, and more. Freshchat’s smart integration allows users to interact with an intelligent assistant for:

- Answering questions about the platform.
- Providing travel tips for Jammu and Kashmir.
- Assisting with user registration or login issues.

You can interact with the chat agent directly through the chat interface on the site.

## **Installation**

### **Backend Setup (Locally)**

1. Clone the repository.
   ```bash
   git clone https://github.com/your-repo/jktour.git
   cd jktour
   ```

2. Install dependencies.
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory to store environment variables, like MongoDB URI (for production deployment, you can configure MongoDB Atlas):
   ```bash
   MONGODB_URI=mongodb://localhost:27017/userData
   ```

4. Start the server.
   ```bash
   npm start
   ```

5. The backend will be available at `http://localhost:4000`.

### **Frontend Setup**

1. Clone the repository and navigate to the frontend directory:
   ```bash
   git clone https://github.com/your-repo/jktour-frontend.git
   cd jktour-frontend
   ```

2. Open the `index.html` file in your browser to view the application. You can edit it with any text editor, and it will automatically reflect the changes in the browser.

3. Alternatively, you can run the static files via a simple web server for development:
   - If you have **Python** installed, you can serve the files:
     ```bash
     python -m http.server
     ```
   - The site will be available at `http://localhost:8000`.

4. The frontend files are static and do not require a build process since they are made using pure HTML, CSS, and JavaScript.

---

## **Deployment**

### **Backend Deployment**

To deploy the backend of this project, follow the steps below:

#### **Step 1: Prepare your environment**
- Ensure you have **Node.js** and **MongoDB** installed on your server or choose a cloud platform like **MongoDB Atlas** to host your database.
- Set up environment variables (e.g., MongoDB URI) and add them in a `.env` file.

#### **Step 2: Clone the repository**
Clone the repository and navigate to the backend directory:
```bash
git clone https://github.com/your-repo/jktour-backend.git
cd jktour-backend
```

#### **Step 3: Install dependencies**
Run the following command to install necessary dependencies:
```bash
npm install
```

#### **Step 4: Set up MongoDB**
- **Local MongoDB**: Ensure MongoDB is running locally.
- **MongoDB Atlas**: If using Atlas, create a cluster and replace the `MONGODB_URI` in the `.env` file with your Atlas URI.

#### **Step 5: Start the backend**
To start the backend server, run:
```bash
npm start
```

By default, the server will run on port `4000`. You can access the backend API at `http://localhost:4000`.

#### **Step 6: Deploy to a Cloud Platform (Optional)**
To deploy the backend on platforms like **Heroku**, **AWS EC2**, or **Google Cloud**, follow the respective platform's deployment guide and configure your environment variables accordingly.

---

### **Frontend Deployment (Vercel)**

The frontend is deployed using **Vercel**. To deploy it:

1. Go to the [Vercel Dashboard](https://vercel.com/dashboard).
2. Click on **New Project** and select the repository containing your frontend code.
3. Follow the deployment steps, and Vercel will automatically deploy your project with a unique URL.

You can access the deployed version at the provided URL, for example:
```text
https://<your-project-name>.vercel.app/
```
Once deployed, Vercel will assign a unique URL, which you can find on your [Vercel Dashboard](https://vercel.com/dashboard).

---

### **Deployed Version URL**

You can access the live version of the deployed website at this URL:

```text
https://jktour.vercel.app/
```

## **Contributing**

We welcome contributions! If you'd like to help improve this project, feel free to open an issue or create a pull request.

1. Fork the repo.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new pull request.


