# **Jammu and Kashmir Tourism Guide - User and Wishlist Management**

Welcome to **JKTour**, a web application for managing user data and saving wishlists of travel destinations. This project is hosted on [Vercel](https://jktour.vercel.app/), providing an easy-to-use platform for users to register, update their information, change their password, and save their favorite places to visit.

## **Features**

- **User Registration**: Users can create an account by providing basic information such as name, email, password, favorite book, and profile picture.
- **User Profile Update**: Users can update their personal information, such as name, favorite book, and profile picture.
- **Password Update**: Users can change their password securely.
- **Wishlist Management**: Users can save and update their wishlist of places they wish to visit.
- **View User Data**: Admin or other users can view the data of all users or search for specific users by email.
- **Freshchat Integration**: An AI-powered chat agent integrated with Freshchat for real-time assistance, providing an intelligent response to user queries about the platform, travel tips, or general assistance.


## **Tech Stack**

- **Frontend**: HTML, CSS, and JavaScript
- **Backend**: Node.js with Express.js
- **Database**: MongoDB (used locally for development)
- **Authentication**: Bcrypt.js for password hashing
- **Others**: CORS for cross-origin resource sharing
- **Chatbot Integration**: Freshchat API (for AI-powered chat support)

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

## **Deployment**

The project is deployed on **Vercel** and can be accessed live at [https://jktour.vercel.app/](https://jktour.vercel.app/).

## **Contributing**

We welcome contributions! If you'd like to help improve this project, feel free to open an issue or create a pull request.

1. Fork the repo.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new pull request.


