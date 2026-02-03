# GoStays - Hotel Booking Platform

A modern, full-stack hotel booking platform built with React, Express, and MongoDB. GoStays allows users to discover, book, and review hotels while providing hotel owners with a comprehensive dashboard to manage their properties.

![GoStays Preview](./preview/screenshot2.png) <!-- Replace with actual screenshot -->

## 🌐 Live Links

- **Client**: [https://go-stays25-fe.vercel.app/]
- **Server**: [Deployed on server host]

## 📋 Project Overview

GoStays is a MERN stack application that connects travelers with hotel owners. The platform features:

- **User Features**: Browse hotels, view room details, make bookings, manage bookings, leave reviews, and ratings
- **Hotel Owner Features**: Register hotels, manage properties, add/edit rooms, view bookings, and track analytics
- **Payment Integration**: Secure payment processing with Stripe
- **Authentication**: Secure authentication using Clerk
- **Email Notifications**: Automated email confirmations using Nodemailer
- **Image Storage**: Cloud-based image storage with Cloudinary

## 🛠️ Technology Stack

### Frontend

- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **Clerk** - Authentication service
- **React Toastify** - Toast notifications
- **Quill** - Rich text editor
- **React Simple Star Rating** - Rating component

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Clerk Express** - Authentication middleware
- **Stripe** - Payment processing
- **Cloudinary** - Image hosting
- **Nodemailer** - Email service
- **Multer** - File upload handling
- **Svix** - Webhook management
- **Cors** - Cross-origin resource sharing

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **MongoDB** - [Install locally](https://www.mongodb.com/docs/manual/installation/) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - Version control - [Download](https://git-scm.com/)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd GoStays
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
# Add the following environment variables:
# MONGODB_URI=your_mongodb_connection_string
# CLERK_SECRET_KEY=your_clerk_secret_key
# CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
# CLOUDINARY_API_KEY=your_cloudinary_api_key
# CLOUDINARY_API_SECRET=your_cloudinary_api_secret
# STRIPE_SECRET_KEY=your_stripe_secret_key
# SVIX_WEBHOOK_SECRET=your_svix_webhook_secret
# NODEMAILER_EMAIL=your_email_address
# NODEMAILER_PASSWORD=your_email_app_password
# PORT=5000

# Start development server
npm run dev

# For production
npm start
```

### 3. Frontend Setup

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Create .env file (if needed)
# Add the following environment variable:
# VITE_API_BASE_URL=http://localhost:5000

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm preview
```

## 📂 Project Structure

```
GoStays/
├── client/                          # React frontend
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── assets/                 # Images and asset URLs
│   │   ├── components/             # Reusable React components
│   │   │   ├── Banner.jsx
│   │   │   ├── HotelCard.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── StarRating.jsx
│   │   │   └── HotelOwner/        # Hotel owner components
│   │   ├── context/               # React context for state management
│   │   ├── pages/                 # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── AllRooms.jsx
│   │   │   ├── RoomDetails.jsx
│   │   │   ├── MyBookings.jsx
│   │   │   ├── AuthPage.jsx
│   │   │   └── HotelOwner/       # Hotel owner pages
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── package.json
│
├── server/                          # Express backend
│   ├── config/                     # Configuration files
│   │   ├── db.js                   # MongoDB connection
│   │   ├── cloudinary.js           # Cloudinary setup
│   │   └── nodeMailer.js           # Email service
│   ├── models/                     # MongoDB schemas
│   │   ├── userModel.js
│   │   ├── hotelModel.js
│   │   ├── roomModel.js
│   │   └── bookingModel.js
│   ├── controllers/                # Business logic
│   │   ├── userController.js
│   │   ├── hotelController.js
│   │   ├── roomController.js
│   │   ├── bookingController.js
│   │   ├── clerkWebhooks.js
│   │   └── stripeWebhooks.js
│   ├── routes/                     # API endpoints
│   │   ├── userRoutes.js
│   │   ├── hotelRoutes.js
│   │   ├── roomRoutes.js
│   │   └── bookingRoutes.js
│   ├── middleware/                 # Express middleware
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── server.js                   # Main server file
│   ├── vercel.json                 # Vercel deployment config
│   └── package.json
│
└── README.md
```

## 🔑 Environment Variables

### Server (.env)

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gostays

# Clerk Authentication
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Svix Webhooks
SVIX_WEBHOOK_SECRET=your_webhook_secret

# Email Service
NODEMAILER_EMAIL=your_email@gmail.com
NODEMAILER_PASSWORD=your_app_password

# Server
PORT=5000
NODE_ENV=development
```

### Client (.env)

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

## 📚 Available Scripts

### Frontend Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

### Backend Commands

```bash
npm run dev       # Start with nodemon (auto-reload on changes)
npm start         # Start production server
npm test          # Run tests (if configured)
```

## 🔗 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Main Endpoints

#### Users

- `POST /api/users` - Register/create user
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

#### Hotels

- `GET /api/hotels` - Get all hotels
- `GET /api/hotels/:id` - Get hotel details
- `POST /api/hotels` - Create hotel (owner only)
- `PUT /api/hotels/:id` - Update hotel
- `DELETE /api/hotels/:id` - Delete hotel

#### Rooms

- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/:id` - Get room details
- `POST /api/rooms` - Create room (owner only)
- `PUT /api/rooms/:id` - Update room
- `DELETE /api/rooms/:id` - Delete room

#### Bookings

- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

## 🔐 Key Features

### For Users

- ✅ Browse and search hotels
- ✅ View detailed room information
- ✅ Secure booking system with Stripe payment
- ✅ Manage bookings (view, cancel, modify)
- ✅ Leave reviews and ratings
- ✅ Wishlist functionality (if implemented)
- ✅ Real-time notifications

### For Hotel Owners

- ✅ Register and manage hotel properties
- ✅ Add and manage rooms with details
- ✅ View booking requests and confirmations
- ✅ Dashboard with analytics
- ✅ Upload images to Cloudinary
- ✅ Manage pricing and availability

## 🔗 Third-Party Integrations

### Authentication

- **Clerk** - Secure authentication and user management
  - [Clerk Documentation](https://clerk.com/docs)
  - [Clerk Dashboard](https://dashboard.clerk.com)

### Payment Processing

- **Stripe** - Online payment processing
  - [Stripe Documentation](https://stripe.com/docs)
  - [Stripe Dashboard](https://dashboard.stripe.com)

### Image Hosting

- **Cloudinary** - Cloud-based image storage and manipulation
  - [Cloudinary Documentation](https://cloudinary.com/documentation)
  - [Cloudinary Dashboard](https://cloudinary.com/console)

### Email Service

- **Nodemailer** - Email delivery service
  - [Nodemailer Documentation](https://nodemailer.com/)
  - Gmail App Password Guide: [https://support.google.com/accounts/answer/185833](https://support.google.com/accounts/answer/185833)

### Webhooks

- **Svix** - Webhook infrastructure
  - [Svix Documentation](https://docs.svix.com)

### Database

- **MongoDB** - NoSQL database
  - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
  - [MongoDB Documentation](https://docs.mongodb.com/)

## 🚀 Deployment

### Deploy Frontend (Vercel)

1. Push code to GitHub
2. Visit [Vercel](https://vercel.com)
3. Import project and connect to GitHub
4. Set environment variables in Vercel dashboard
5. Deploy automatically on push

### Deploy Backend

Options:

- **Vercel** - Serverless functions
- **Heroku** - Container hosting
- **Railway** - Modern deployment platform
- **AWS** - Scalable cloud infrastructure

## 📞 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Verify MONGODB_URI is correct
   - Check network access in MongoDB Atlas
   - Ensure IP whitelist includes your device

2. **Clerk Authentication Failed**
   - Verify CLERK_SECRET_KEY is correct
   - Check Clerk dashboard for app configuration
   - Clear browser cookies and cache

3. **Cloudinary Upload Error**
   - Verify API credentials
   - Check file size limits
   - Ensure proper CORS configuration

4. **Port Already in Use**

   ```bash
   # Change port in server.js or use:
   lsof -i :5000  # Find process
   kill -9 <PID>  # Kill process
   ```

5. **CORS Errors**
   - Verify backend CORS configuration
   - Check frontend API base URL
   - Ensure credentials are being sent

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the package.json file for details.

## 👨‍💻 Author

Created for hotel booking enthusiasts

## 📧 Support

For issues, feature requests, or questions:

- Create an issue on GitHub
- Email: support@gostays.com

## 🔄 Deployment Links

- **Frontend Deployment**: [Vercel](https://vercel.com)
- **Backend Deployment**: Choose from [Vercel](https://vercel.com), [Railway](https://railway.app), or [Heroku](https://www.heroku.com)

---

**Happy Booking! 🏨✈️**
