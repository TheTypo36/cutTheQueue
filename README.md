# CutTheQueue

_A Web-app that bridges the gap between patients and doctors._

---

## 🛠 Tech Stack

We will be using the following technologies:

- **Frontend:** React.js & ShadCN (UI)
- **API Calls:** Axios
- **Chat Integration:** WebSocket
- **Backend:** Node.js & Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **File Uploads:** Cloudinary (Third-party service)

---

## 📌 Pages We’ll Implement

1. **Landing Page & Registration Page** – Patients can register and log in.
2. **Main Page** – Patients select a hospital and department to generate a token.
3. **Token Page** – Displays visitation info and queue position.
4. **Admin Dashboard** – Hospitals can manage information and patient queues.
5. **Profile Page** – Patients can view visitation history and medical records.

---

## 🔐 Registration/Sign-In Page

Patients will submit their phone number, and our backend will use a service like **Twilio** to send a verification code. Upon verification, a **JWT token** will be generated for authentication.

![Login Form: Mobile number input (+91) & WhatsApp updates option](Picture7.jpg)

---

## 🏥 Patient Medical Records

Patients can fill in personal details and upload medical documents.

Technologies used:

- **Multer & Node.js Filesystem** – File handling
- **Cloudinary** – Storing medical documents
- **MongoDB** – Creating models for patients, doctors, and hospitals

### Interface Preview:

![Medical record selection, dropdown to add family member, fetch records button](ContentPlaceholder4.jpg)  
![Form: Personal info (Name, Contact, Gender, Blood Type), Save & Cancel buttons](Picture6.jpg)

---

## 🎟 Token No. Page & Hospital Info

- Tokens will be generated **on a first-come, first-served basis**.
- Token services will **open at a fixed time**, with a **limited number of slots** based on hospital capacity.

Example:  
![Token Display: Token No. 50, Doctor Ambhuj Roy, Cardiology Dept., Room No. 10-B, 14:00](ContentPlaceholder4.jpg)

---

## 🏥 Hospital Admin Dashboard

The admin page allows hospital staff to manage appointments, doctors, and patients.

### Backend:

- **Express.js & Mongoose** – Writing backend logic & managing routes
- **Axios** – Frontend API communication

Admin Dashboard Preview:  
![Statistics for doctors, patients, appointments & recent activity logs](ContentPlaceholder4.jpg)

---

## 💡 Conclusion

> _"Codes are meant to bring life to ideas that solve real-world problems."_

I'm **Ashish Raghuvanshi**, and this project is deeply personal to me.

Recently, I faced a **medical emergency** in my family. When we visited **AIIMS**, I saw how patients struggled, standing in lines all night for appointments. This inspired me to develop **CutTheQueue**, aiming to ease patient experiences.

This is just the beginning—there's a long way to go. But if I can showcase this idea effectively, it will be a great step forward.

### 📬 Contact Info

📞 **Phone:** 8433300433  
📧 **Email:** thetypo36@gmail.com  
🔗 **LinkedIn:** [Ashish Raghuvanshi](#)  
🐙 **GitHub:** [Ashish Raghuvanshi](#)

---
