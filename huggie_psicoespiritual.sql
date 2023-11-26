-- Crear tabla de usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    fecha_nacimiento DATE,
    ciudad VARCHAR(255),
    genero ENUM('M', 'F', 'O')
);

-- Crear tabla de roles
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) UNIQUE NOT NULL
);

-- Crear tabla de usuarios_roles
CREATE TABLE usuarios_roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    rol_id INT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (rol_id) REFERENCES roles(id)
);

-- Crear tabla de temas en el foro
CREATE TABLE temas_foro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    contenido TEXT NOT NULL,
    usuario_id INT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Crear tabla de mensajes en los temas del foro
CREATE TABLE mensajes_foro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contenido TEXT NOT NULL,
    usuario_id INT,
    tema_foro_id INT,
    fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (tema_foro_id) REFERENCES temas_foro(id)
);

-- Crear tabla de usuarios profesionales (opcional)
CREATE TABLE usuarios_profesionales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    profesion VARCHAR(255) NOT NULL,
    descripcion TEXT,
    especialidad VARCHAR(255),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);


-- Insertar roles
INSERT INTO roles (nombre) VALUES ('Administrador'), ('Usuario'), ('Profesional');

-- Insertar usuario
INSERT INTO usuarios (nombre, apellido, email, password, telefono, fecha_nacimiento, ciudad, genero) 
VALUES ('Juan', 'Pérez', 'juan.perez@gmail.com', 'contraseña', '1234567890', '2000-01-01', 'Madrid', 'M');

-- Insertar usuario con rol
INSERT INTO usuarios_roles (usuario_id, rol_id) VALUES (1, 2);

-- Insertar tema en el foro
INSERT INTO temas_foro (titulo, contenido, usuario_id) VALUES ('Primer tema', 'Este es el contenido del primer tema.', 1);

-- Insertar mensaje en un tema del foro
INSERT INTO mensajes_foro (contenido, usuario_id, tema_foro_id) VALUES ('Este es el mensaje del usuario Juan.', 1, 1);

-- Insertar usuario profesional
INSERT INTO usuarios_profesionales (usuario_id, profesion, descripcion, especialidad) 
VALUES (1, 'Desarrollador Web', 'Desarrollo de aplicaciones web', 'Desarrollo frontend');