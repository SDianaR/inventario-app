# Sistema de Inventario Inteligente
**Tercer Desafío Práctico — Diseño y Programación de Software Multiplataforma**
Universidad Don Bosco

---

 ## LINK DEL VIDEO
[![Ver video](https://img.youtube.com/vi/iNQwn5BnC-k/0.jpg)](https://youtu.be/iNQwn5BnC-k)

## Integrantes
-Daniela Guadalupe Hernandez Mejia HM250077
-Diana Guadalupe Rivera Navas RN250387


## Descripción
Sistema de inventario con cliente móvil en React Native y API REST en Node.js.
Permite gestionar productos mediante escaneo de códigos QR, con autenticación segura usando JWT.

---

## Backend — `inventario-backend`

### Tecnologías
- Node.js + Express
- JSON Web Tokens (JWT)
- Almacenamiento en memoria (array)

### Instalación y ejecución
```bash
cd inventario-backend
npm install
npm start
```
El servidor corre en el puerto `3000`.

### Endpoints

| Método | Endpoint | Descripción | Protegido |
|--------|----------|-------------|-----------|
| POST | `/login` | Autentica al usuario y devuelve JWT | No |
| GET | `/productos` | Lista todos los productos | Sí |
| GET | `/productos/:id` | Obtiene un producto por ID | Sí |
| PUT | `/productos/:id` | Registra salida de stock | Sí |

### Credenciales de prueba
- **Usuario:** `admin`
- **Contraseña:** `12345`

---

## Frontend — `inventario-app`

### Tecnologías
- React Native con Expo
- expo-camera (lector QR)
- AsyncStorage (almacenamiento seguro del token)
- Axios (consumo de API)

### Configuración previa
Edita `services/api.js` y cambia la IP por la de tu computadora:
```js
const BASE_URL = "http://TU_IP_LOCAL:3000";
```

### Instalación y ejecución
```bash
cd inventario-app
npm install
npm start
```
Escanea el QR con la app Expo Go en tu celular.

### Pantallas
- **Login** — Autenticación con usuario y contraseña
- **Home** — Panel principal con accesos rápidos
- **Productos** — Listado completo de productos con stock
- **Scanner** — Escaneo de QR para consultar y registrar salidas

---

## Seguridad
- Todas las rutas protegidas validan el token JWT en cada petición
- Token con expiración de 1 hora
- Respuestas con códigos HTTP adecuados (401, 403, 400, 404)
---
