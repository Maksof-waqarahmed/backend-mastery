## 📦 MongoDB with Prisma – Starter Guide

This guide will help you set up **MongoDB** with **Prisma ORM**, including schema setup, database connection, and basic CRUD operations.

---

### ✅ Requirements

* Node.js (v16 or above)
* MongoDB (local or cloud e.g. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
* Prisma (ORM for TypeScript & JS)
* A `.env` file with your MongoDB URI

---

### 🛠️ Installation

```bash
npm init -y
npm install prisma @prisma/client
npx prisma init
```

---

### 📁 Project Structure

```bash
project-root/
├── prisma/
│   └── schema.prisma
├── node_modules/
├── .env
├── index.js or index.ts
└── package.json
```

---

### 📝 .env File

```env
DATABASE_URL="mongodb+srv://<username>:<password>@cluster.mongodb.net/myDB?retryWrites=true&w=majority"
```

---

### 🔧 schema.prisma

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(auto()) @map("_id")
  name      String
  email     String   @unique
  age       Int?
  createdAt DateTime @default(now())
  tags      String[]
  isActive  Boolean
}
```

---

### 🧬 Generate Prisma Client

```bash
npx prisma generate
```

> This will create the client you can use in your application to interact with MongoDB.

---

### 📂 Usage (index.js or server.ts)

```js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create a new user
  const user = await prisma.user.create({
    data: {
      name: "Waqar",
      email: "waqar@example.com",
      age: 25,
      isActive: true,
      tags: ['developer', 'mentor'],
    },
  });

  console.log("New User:", user);

  // Find all users
  const users = await prisma.user.findMany();
  console.log("All Users:", users);
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

---

### 🧪 CRUD Examples

* **Create:** `prisma.user.create({ data: {...} })`
* **Read:** `prisma.user.findMany()` or `findUnique()`
* **Update:** `prisma.user.update({ where: { id }, data: {...} })`
* **Delete:** `prisma.user.delete({ where: { id } })`

---

### 🛑 Known Limitations

* MongoDB support in Prisma is **not as mature** as with relational databases.
* Some Prisma features like `relations`, `migrations`, and transactions are **limited or different** in MongoDB.

---

### 📚 Resources

* [Prisma MongoDB Docs](https://www.prisma.io/docs/concepts/database-connectors/mongodb)
* [MongoDB Atlas Setup](https://www.mongodb.com/docs/atlas/)
* [Prisma Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)

---

### 💡 Tip

Always use `.env` for sensitive MongoDB credentials and avoid hardcoding them in files.


