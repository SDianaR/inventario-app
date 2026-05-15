const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const authMiddleware = require("./middleware/auth");

const {
  usuarios,
  productos,
} = require("./data/data");

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   REGISTER
========================= */

app.post("/register", (req, res) => {

  const {
    username,
    password,
  } = req.body;

  const existe = usuarios.find(
    (u) => u.username === username
  );

  if (existe) {

    return res.status(400).json({
      mensaje: "Usuario ya existe",
    });
  }

  const nuevoUsuario = {
    id: usuarios.length + 1,
    username,
    password,
  };

  usuarios.push(nuevoUsuario);

  res.json({
    mensaje: "Usuario creado",
    usuario: nuevoUsuario,
  });
});

/* =========================
   LOGIN
========================= */

app.post("/login", (req, res) => {

  const {
    username,
    password,
  } = req.body;

  const user = usuarios.find(
    (u) =>
      u.username === username &&
      u.password === password
  );

  if (!user) {

    return res.status(401).json({
      mensaje: "Credenciales incorrectas",
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.json({
    token,
  });
});

/* =========================
   LISTAR PRODUCTOS
========================= */

app.get(
  "/productos",
  authMiddleware,
  (req, res) => {

    res.json(productos);
  }
);

/* =========================
   PRODUCTO POR ID
========================= */

app.get(
  "/productos/:id",
  authMiddleware,
  (req, res) => {

    const producto = productos.find(
      (p) => p.id == req.params.id
    );

    if (!producto) {

      return res.status(404).json({
        mensaje: "Producto no encontrado",
      });
    }

    res.json(producto);
  }
);

/* =========================
   ACTUALIZAR STOCK
========================= */

app.put(
  "/productos/:id",
  authMiddleware,
  (req, res) => {

    const cantidad = Number(
      req.body.cantidad
    );

    if (
      isNaN(cantidad) ||
      cantidad <= 0
    ) {

      return res.status(400).json({
        mensaje: "Cantidad inválida",
      });
    }

    const producto = productos.find(
      (p) => p.id == req.params.id
    );

    if (!producto) {

      return res.status(404).json({
        mensaje: "Producto no encontrado",
      });
    }

    if (
      producto.stock - cantidad < 0
    ) {

      return res.status(400).json({
        mensaje: "Stock insuficiente",
      });
    }

    producto.stock -= cantidad;

    res.json({
      mensaje: "Stock actualizado",
      producto,
    });
  }
);

/* =========================
   SERVER
========================= */

const PORT = 3000;

app.listen(PORT, () => {

  console.log(
    `Servidor corriendo en puerto ${PORT}`
  );
});