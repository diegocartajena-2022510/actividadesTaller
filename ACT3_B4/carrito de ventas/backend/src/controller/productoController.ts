import {Response, Request} from "express";
import pool from '../config/db';

export const obtenerProductos = async (req: Request, res: Response) => {
  try {
    const [rows]: any = await pool.query('CALL sp_listar_productos()');
    res.json(rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerProductoPorId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [rows]: any = await pool.query('CALL sp_buscar_producto(?)', [id]);
    res.json(rows[0][0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const crearProducto = async (req: Request, res: Response) => {
  const { nombre, fecha_ingreso, stock } = req.body;
  try {
    await pool.query('CALL sp_agregar_producto(?, ?, ?)', [nombre, fecha_ingreso, stock]);
    res.status(201).json({ mensaje: 'Producto creado exitosamente' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const actualizarProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, fecha_ingreso, stock } = req.body;
  try {
    await pool.query('CALL sp_actualizar_producto(?, ?, ?, ?)', [id, nombre, fecha_ingreso, stock]);
    res.json({ mensaje: 'Producto actualizado exitosamente' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const eliminarProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await pool.query('CALL sp_eliminar_producto(?)', [id]);
    res.json({ mensaje: 'Producto eliminado exitosamente' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};