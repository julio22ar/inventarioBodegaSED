const http = require('http');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const url = require('url');

// Cargar variables de entorno
dotenv.config();

// Crear conexión con MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'CrazyJuan21',
    database: process.env.DB_NAME || 'inventariodb'
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
        process.exit(1);
    }
    console.log('Conexión exitosa a la base de datos MySQL.');
});

// Crear servidor HTTP
const server = http.createServer((req, res) => {
    // Configuración de los encabezados para permitir CORS y JSON
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // Análisis de la URL para manejar rutas
    const parsedUrl = url.parse(req.url, true);
    const method = req.method;
    const path = parsedUrl.pathname;

    // Rutas de la API para productos
    if (path === '/api/products' && method === 'GET') {
        // Obtener todos los productos
        db.query('SELECT * FROM productos', (err, results) => {
            if (err) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Error obteniendo los productos' }));
                return;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(results));
        });
    } else if (path === '/api/products' && method === 'POST') {
        // Agregar un nuevo producto
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const { nombre, cantidad, precio, categoria } = JSON.parse(body);
            const query = 'INSERT INTO productos (nombre, cantidad, precio, categoria) VALUES (?, ?, ?, ?)';
            db.query(query, [nombre, cantidad, precio, categoria], (err, result) => {
                if (err) {
                    res.statusCode = 500;
                    res.end(JSON.stringify({ error: 'Error al agregar el producto' }));
                    return;
                }
                res.statusCode = 201;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Producto agregado exitosamente', id: result.insertId }));
            });
        });
    } else if (path.startsWith('/api/products/') && method === 'PUT') {
        // Editar un producto existente
        const id = path.split('/')[3];
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const { nombre, cantidad, precio, categoria } = JSON.parse(body);
            const query = 'UPDATE productos SET nombre = ?, cantidad = ?, precio = ?, categoria = ? WHERE id = ?';
            db.query(query, [nombre, cantidad, precio, categoria, id], (err, result) => {
                if (err) {
                    res.statusCode = 500;
                    res.end(JSON.stringify({ error: 'Error al actualizar el producto' }));
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Producto actualizado exitosamente' }));
            });
        });
    } else if (path.startsWith('/api/products/') && method === 'DELETE') {
        // Eliminar un producto existente
        const id = path.split('/')[3];
        const query = 'DELETE FROM productos WHERE id = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Error al eliminar el producto' }));
                return;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Producto eliminado exitosamente' }));
        });
    } else if (path === '/api/register' && method === 'POST') {
        // Registrar un nuevo usuario
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const { nombre, email, password, rol } = JSON.parse(body);
            const query = 'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)';
            db.query(query, [nombre, email, password, rol], (err, result) => {
                if (err) {
                    res.statusCode = 500;
                    res.end(JSON.stringify({ error: 'Error al registrar el usuario' }));
                    return;
                }
                res.statusCode = 201;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Usuario registrado exitosamente', id: result.insertId }));
            });
        });
    } else if (path === '/api/login' && method === 'POST') {
        // Iniciar sesión de un usuario
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const { email, password } = JSON.parse(body);
            const query = 'SELECT * FROM usuarios WHERE email = ? AND password = ?';
            db.query(query, [email, password], (err, results) => {
                if (err) {
                    res.statusCode = 500;
                    res.end(JSON.stringify({ error: 'Error al iniciar sesión' }));
                    return;
                }
                if (results.length > 0) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'Inicio de sesión exitoso', usuario: results[0] }));
                } else {
                    res.statusCode = 401;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: 'Credenciales incorrectas' }));
                }
            });
        });
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
    }
});

// Definir el puerto y poner el servidor en marcha
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
