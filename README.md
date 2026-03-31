<div align="center">
  <h1>🏋️ FitCoachPro</h1>
  <p><b>A full-stack web application designed to help users manage and track their fitness activities in a simple and organized way.</b></p>

  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
</div>

<br>

FitCoachPro allows users to log workouts, monitor progress, calculate BMI, and maintain a structured fitness routine — all in one place.

---

## 🚀 Features

- 🔐 **User Authentication:** JWT-based login & registration.
- 🧑 **Profile Management:** Update personal details easily.
- 🏋️ **Workout Tracking:** Add, update, and delete daily fitness routines.
- 📊 **BMI Calculation:** Built-in calculator with health categories.
- 🖼️ **Profile Picture Upload:** Secure file handling using Multer.
- 🎯 **Fitness Customization:** Select fitness levels, styles, and training goals.
- 📁 **Structured Dashboard:** Clean UI for tracking progress over time.

---

## 🛠️ Tech Stack

**Frontend:** HTML5, CSS3, Vanilla JavaScript, Fetch API  
**Backend:** Node.js, Express.js  
**Database:** MongoDB, Mongoose  
**Tools & Libraries:** JWT (Authentication), Bcrypt.js (Password Hashing), Multer (File Uploads)

---

## 📁 Project Structure

    FitCoachPro/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── utils/
    ├── public/
    ├── server.js
    └── package.json

---

## ⚙️ Prerequisites

- **Node.js** installed on your machine
- **MongoDB** (Atlas connection string or local setup)

---

## ⚙️ Installation & Setup

**1. Clone the repository**

    git clone https://github.com/aniketh027/FitCoachPro.git
    cd FitCoachPro

**2. Install dependencies**

    npm install

**3. Create environment variables**
Create a `.env` file in the root directory and add the following:

    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key

**4. Run the server**

    npm start

---

## 🔐 API Endpoints

| Method | Endpoint                  | Description        |
| ------ | ------------------------- | ------------------ |
| POST   | `/api/auth/register`      | Register user      |
| POST   | `/api/auth/login`         | Login user         |
| GET    | `/api/users/me`           | Get current user   |
| POST   | `/api/users/update-profile`| Update profile    |
| GET    | `/api/users/bmi`          | Calculate BMI      |
| POST   | `/api/workouts`           | Add workout        |
| PUT    | `/api/workouts/:id`       | Update workout     |
| DELETE | `/api/workouts/:id`       | Delete workout     |

---

## 📚 Learnings

- Built a full-stack web application using Node.js and MongoDB.
- Implemented secure user authentication using JSON Web Tokens (JWT).
- Designed and routed RESTful APIs.
- Managed image and file uploads on the server using Multer.
- Applied a modular backend architecture for better scalability.

---

## 📌 Future Improvements

- [ ] 📱 Mobile application version
- [ ] 📈 Advanced analytics dashboard
- [ ] 🤖 AI-based workout recommendations
- [ ] ⌚ Integration with wearable devices

---

## 👨‍💻 Author

**Aniketh Patwal** B.Tech CSE (VIT)  
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/aniketh027)

---

## 📄 License

This project is licensed under the MIT License.

---

## ⭐ Show your support

If you like this project, consider giving it a ⭐ on GitHub!
