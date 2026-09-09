create database ejercicio_IN5CM;
use ejercicio_IN5CM;

create table producto(
	id_producto int primary key auto_increment not null,
    nombre varchar(25),
    fecha_ingreso varchar(25),
    stock varchar(25)
);

CREATE DATABASE IF NOT EXISTS ejercicio_IN5CM;
USE ejercicio_IN5CM;

CREATE TABLE IF NOT EXISTS producto(
    id_producto INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombre VARCHAR(25),
    fecha_ingreso DATE,
    stock VARCHAR(25)
);


DELIMITER $$

CREATE PROCEDURE sp_listar_productos()
BEGIN
    SELECT 
        id_producto,
        nombre,
        fecha_ingreso,
        stock
    FROM producto;
END $$

CREATE PROCEDURE sp_buscar_producto(
    IN p_id_producto INT
)
BEGIN
    SELECT 
        id_producto,
        nombre,
        fecha_ingreso,
        stock
    FROM producto
    WHERE id_producto = p_id_producto;
END $$

CREATE PROCEDURE sp_agregar_producto(
    IN p_nombre VARCHAR(25),
    IN p_fecha_ingreso DATE,
    IN p_stock VARCHAR(25)
)
BEGIN
    INSERT INTO producto(nombre, fecha_ingreso, stock)
    VALUES (p_nombre, p_fecha_ingreso, p_stock);
END $$

CREATE PROCEDURE sp_actualizar_producto(
    IN p_id_producto INT,
    IN p_nombre VARCHAR(25),
    IN p_fecha_ingreso DATE,
    IN p_stock VARCHAR(25)
)
BEGIN
    UPDATE producto
    SET 
        nombre = p_nombre,
        fecha_ingreso = p_fecha_ingreso,
        stock = p_stock
    WHERE id_producto = p_id_producto;
END $$

CREATE PROCEDURE sp_eliminar_producto(
    IN p_id_producto INT
)
BEGIN
    DELETE FROM producto 
    WHERE id_producto = p_id_producto;
END $$

DELIMITER ;