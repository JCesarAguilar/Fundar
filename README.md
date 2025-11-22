# 🌱 Fund.ar – Plataforma de Donaciones Sociales

Fund.ar es una plataforma web diseñada para conectar causas sociales con personas dispuestas a colaborar.  
Permite visualizar campañas, donar de forma segura, gestionar usuarios y administrar proyectos desde un panel especializado.

Este proyecto fue desarrollado como parte del **Final Project – Henry Bootcamp**, en un equipo de 01 frontend y 01 backend.  
Yo participé como **Frontend Developer**.

## 🚀 Demo en vivo

🔗 **Frontend Deploy:** https://demo2-five-phi.vercel.app/

---

## 📸 Screenshots

### 🏠 Home

![Home](./assets/home.png)

## 🧩 Tecnologías principales

### **Frontend**

- Next.js
- React
- Tailwind CSS
- JWT Authentication
- Google OAuth2
- Context
- Vercel (deploy)

### **Backend**

- Node.js / Express
- PostgreSQL
- Sequelize / Prisma
- JWT
- Nodemailer
- Cloudinary
- Cron Jobs (node-cron)
- Render (deploy)

---

## 🎯 Funcionalidades principales

### 👤 **Usuarios**

- Registro con autenticación propia.
- Inicio de sesión con Google OAuth2.
- Actualización de perfil y foto.
- Historial de donaciones.

### 🎁 **Donaciones**

- Donaciones únicas.
- Pasarela de pagos (Stripe).
- Confirmación de donación vía email.
- Métricas de avance en tiempo real.

### 📢 **Proyectos**

- Visualización de proyectos activos.
- Filtro por paises.
- Detalles completos de cada proyecto: monto objetivo, descripción, imagen, etc.

### 🛠 **Administrador**

- CRUD completo de proyectos.
- Gestión de usuarios y donaciones.
- Subida de imágenes (Cloudinary).

### 🤖 **Chatbot**

- Bot básico integrado en el frontend.

### 📨 **Notificaciones automáticas**

- Emails de bienvenida.
- Confirmación de donaciones.
- Report de proyectos (cron jobs).
