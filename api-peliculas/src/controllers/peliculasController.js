// src/controllers/peliculasController.js
const peliculaService = require('../services/PeliculaService')

// GET /api/peliculas
const listarPeliculas = async (req, res, next) => {
  try {
    const { genero, buscar } = req.query
    const peliculas = await peliculaService.obtenerTodas({ genero, buscar })
    res.json(peliculas)
  } catch (err) {
    next(err)
  }
}

// GET /api/peliculas/:id
const obtenerPelicula = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const pelicula = await peliculaService.obtenerPorId(id)
    res.json(pelicula)
  } catch (err) {
    next(err)
  }
}

// POST /api/peliculas
const crearPelicula = async (req, res, next) => {
  try {
    const { titulo, director_id, anio, genero_id, nota } = req.body

    if (!titulo || !anio) {
      const err = new Error('Los campos titulo y anio son obligatorios')
      err.statusCode = 400
      throw err
    }

    const nueva = await peliculaService.crear({
      titulo,
      director_id,
      anio,
      genero_id,
      nota
    })

    res.status(201).json(nueva)
  } catch (err) {
    next(err)
  }
}

// PUT /api/peliculas/:id
const actualizarPelicula = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const { titulo, director_id, anio, genero_id, nota } = req.body

    const actualizada = await peliculaService.actualizar(id, {
      titulo,
      director_id,
      anio,
      genero_id,
      nota
    })

    res.json(actualizada)
  } catch (err) {
    next(err)
  }
}

// DELETE /api/peliculas/:id
const eliminarPelicula = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const eliminada = await peliculaService.eliminar(id)
    res.json({ mensaje: 'Película eliminada', pelicula: eliminada })
  } catch (err) {
    next(err)
  }
}

// GET /api/estadisticas
const obtenerEstadisticas = async (req, res, next) => {
  try {
    const stats = await peliculaService.obtenerEstadisticas()
    res.json(stats)
  } catch (err) {
    next(err)
  }
}

const listarResenas = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const resenas = await peliculaService.obtenerResenas(id)
    res.json(resenas)
  } catch (err) {
    next(err)
  }
}

const crearResena = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const nueva = await peliculaService.crearResena(id, req.body)
    res.status(201).json(nueva)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  listarPeliculas,
  obtenerPelicula,
  crearPelicula,
  actualizarPelicula,
  eliminarPelicula,
  obtenerEstadisticas,
  listarResenas,
  crearResena
}