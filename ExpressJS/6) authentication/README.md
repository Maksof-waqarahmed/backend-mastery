🔐 Advanced JWT Authentication & Role-Based Authorization System + 📷 Admin Image Upload

This project is a secure and scalable JWT-based authentication & authorization system with role-based access control (RBAC) using Node.js, Express, MongoDB, Zod, bcrypt, and Cloudinary (via Multer). It now includes a protected admin-only image upload route.

---

## 🔧 Tech Stack

- **Node.js**
- **Express**
- **MongoDB** with **Mongoose**
- **Zod** (schema validation)
- **bcryptjs** (password hashing)
- **jsonwebtoken** (JWT-based access)
- **dotenv** (env config)
- **Cloudinary** (image hosting)
- **Multer** (file upload middleware)

---

## 📜 .env Configuration

```env
PORT=3000
DB_URL=mongodb://localhost:27017/authSystem
JWT_SECRET=your_super_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```


🚀 API Endpoints
✅ Register
```arduino
POST /api/auth/register
```

Body:
```json
{
  "userName": "Waqar",
  "email": "waqar@example.com",
  "userPassword": "Secure@123"
}
```

Password Must:

Be at least 8 characters
Contain 1 uppercase letter
Contain 1 number
Contain 1 special character

🔓 Login
```bash
POST /api/auth/login
```

Body:
```json
{
  "email": "waqar@example.com",
  "userPassword": "Secure@123"
}
```

Response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "<JWT-TOKEN>"
  }
}
```

🏠 Protected Route (Home Page)
```arduino
GET /api/home/welcome
```

Header:
```http
Authorization: Bearer <JWT-TOKEN>
```

Response:
```json
"Welcome Home Page"
```

If token is missing or invalid, returns:
```json
{
  "success": false,
  "message": "Authorization token not provided",
  "data": ""
}
```

🧠 Flow Explanation
1. Registration
Validates input fields.
Checks for existing email.
Hashes password with bcrypt.
Saves user to MongoDB.

2. Login
Validates with Zod.
Verifies user exists.
Compares hashed password using bcrypt.compare.
Generates JWT token with payload excluding password.

3. Authorization Middleware
Extracts token from Authorization header.
Verifies token using jwt.verify.
Attaches decoded user to req.user.

4. Role-Based Access
Each user has a role (USER or ADMIN).

5. Image Upload
Handled via Multer + uploaded to Cloudinary
Only accessible by admins


🛡️ JWT Details
Token is created using:
```js
jwt.sign(payload, secret, { expiresIn: "15m" })
```

Token is validated in authMiddleware.

🧪 Zod Schema Validation
```js
const userLoginSchema = z.object({
  email: z.string().email(),
  userPassword: z.string()
    .min(8)
    .refine((val) => /[A-Z]/.test(val), { message: "Must contain uppercase" })
    .refine((val) => /[0-9]/.test(val), { message: "Must contain number" })
    .refine((val) => /[!@#$%^&*]/.test(val), { message: "Must contain special char" })
});
```

🧱 Mongoose User Schema
```js
{
  userName: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER"
  }
}
```

🧩 Reusable Helper Functions
hashPassword(password, round)
comparePassword(hashed, original)
createToken(payload)
verifyToken(token)
sendResponse(success, message, data, status, res)


🧠 Why JWT + Bcrypt?
| Feature        | Reason                                    |
| -------------- | ----------------------------------------- |
| **JWT**        | Stateless, secure auth via tokens         |
| **Bcrypt**     | Password hashing with salt for security   |
| **Zod**        | Strict schema validation                  |
| **Role-based** | Enables permission control for each route |


✨ Credits
Made with ❤️ by Waqar Rana

A complete JWT-based auth system — ready to scale with role-based access.