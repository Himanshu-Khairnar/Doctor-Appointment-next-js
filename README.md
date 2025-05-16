
# 🩺 Doctor Appointment Website

A modern and responsive doctor appointment booking platform built with **Next.js 14 (App Router)**, **Appwrite** for backend services, and **ShadCN UI** for sleek design.

![Preview](public/preview.jpg) <!-- Add a preview image if available -->

## � Live Demo
[View Live Demo](https://doctor-appointment-demo.com) <!-- Add your live URL here -->

## 🚀 Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/) with App Router
- **Styling:** [Tailwind CSS](https://tailwindcss.com/), [ShadCN UI](https://ui.shadcn.com/)
- **Backend-as-a-Service:** [Appwrite](https://appwrite.io/)
- **Authentication:** Appwrite Email/Password & OAuth (Google)
- **Database:** Appwrite Collections
- **Deployment:** Vercel / Netlify (Frontend), Appwrite (Self-hosted or Cloud)

## ✨ Features

- 📅 Book appointments with available doctors
- 👩‍⚕️ Doctor listing with filters (specialty, availability)
- 🧑‍💼 Patient dashboard for managing bookings
- 👨‍⚕️ Doctor dashboard for managing appointments
- 🔒 Secure authentication with Appwrite
- 📧 Email confirmations (optional)
- 📱 Fully responsive design
- 🎨 Modern UI with ShadCN components
- ⚡ Fast performance with Next.js 14

## 📦 Project Structure

```
doctor-appointment-app/
├── app/                  # Next.js App Router (pages, routes)
│   ├── (auth)/           # Authentication routes
│   ├── (patient)/        # Patient dashboard
│   ├── (doctor)/         # Doctor dashboard
│   ├── api/              # API routes
│   └── ...
├── components/           # Reusable UI components
├── lib/                  # Appwrite client, utilities
├── styles/               # Global styles
├── public/               # Static assets
└── .env.local            # Environment variables
```

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Himanshu-Khairnar/Doctor-Appointment-next-js.git
cd doctor-appointment-app
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Appwrite

#### Option A: Appwrite Cloud
1. Sign up at [cloud.appwrite.io](https://cloud.appwrite.io)
2. Create a project (e.g. "Doctor App")
3. Note your:
   - Project ID
   - API Endpoint
   - Database ID

#### Option B: Self-host Appwrite (Docker)

```bash
docker run -it --rm \
  -v /appwrite:/storage \
  -p 80:80 \
  appwrite/appwrite
```
Then access at `http://localhost`.

### 4. Create Appwrite Collections

#### users Collection:
- `name` (string)
- `email` (email)
- `role` (enum: doctor/patient)
- `specialty` (string, for doctors)
- `bio` (string, for doctors)

#### appointments Collection:
- `user_id` (string)
- `doctor_id` (string)
- `date` (datetime)
- `status` (enum: confirmed, cancelled, completed)
- `notes` (string, optional)

### 5. Create `.env.local`

```env
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
NEXT_PUBLIC_APPWRITE_COLLECTION_USERS_ID=users_collection_id
NEXT_PUBLIC_APPWRITE_COLLECTION_APPOINTMENTS_ID=appointments_collection_id
```

## 🧱 Using ShadCN UI

This project uses ShadCN for consistent UI components.

To add new components:

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
# etc.
```

[See ShadCN docs →](https://ui.shadcn.com/docs)

## 🧪 Run the project locally

```bash
npm run dev
# or
yarn dev
```

App runs at `http://localhost:3000`

## � Deployment

### Frontend
- **Vercel**: Connect your GitHub repo and set environment variables
- **Netlify**: Same as above

### Appwrite
- Use [Appwrite Cloud](https://cloud.appwrite.io) for ease
- Or deploy with Docker on any VPS

## 📸 Screenshots

<!-- Add screenshots if available -->
1. **Homepage**
   ![Homepage](public/screenshots/home.png)

2. **Doctor Listing**
   ![Doctors](public/screenshots/doctors.png)

3. **Appointment Booking**
   ![Booking](public/screenshots/booking.png)

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT © 2025 Himanshu Khairnar



### Additional Features You Might Want to Add:

1. **Admin Panel Features**:
   - Add an admin dashboard
   - User management
   - Appointment analytics
   - System configuration

2. **Calendar Integration**:
   ## 🗓 Calendar Integration
   This project integrates with Google Calendar API to:
   - Sync doctor's availability
   - Send appointment reminders
   - Handle rescheduling
   

3. **Doctor Availability Logic**:
   
   ## ⏱ Availability System
   - Doctors can set working hours
   - Time slots are automatically generated
   - Handles timezone conversion
   - Prevents double-booking
   

