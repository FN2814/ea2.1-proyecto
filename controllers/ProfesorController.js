const mysql = require("mysql");
const dbConfig = require("../dbConfig");

class ProfesorController {
  // Método para agregar un nuevo profesor
  static async agregar(req, res) {
    const nombre = req.body.Nombre;
    console.log(req.body); // Depurar entrada
    const sql = "INSERT INTO profesores (Nombre) VALUES (?)";
    try {
      await dbQuery(sql, [nombre]);
      res.json({ mensaje: "Profesor agregado con éxito" });
    } catch (error) {
      console.error("Error al agregar profesor:", error);
      res.status(500).json({ error: "Error al agregar profesor" });
    }
  }

  // Método para obtener todos los profesores
  static async listar(req, res) {
    const sql = "SELECT * FROM profesores";
    try {
      const profesores = await dbQuery(sql);
      res.json(profesores);
    } catch (error) {
      console.error("Error al obtener profesores:", error);
      res.status(500).json({ error: "Error al obtener profesores" });
    }
  }

  // Método para editar un profesor existente
  static async editar(req, res) {
    const { id } = req.params;
    const nombre = req.body.Nombre;
    console.log(req.body); // Depurar entrada
    const sql = "UPDATE profesores SET Nombre = ? WHERE ID = ?";
    try {
      await dbQuery(sql, [nombre, id]);
      res.json({ mensaje: "Profesor editado con éxito" });
    } catch (error) {
      console.error("Error al editar profesor:", error);
      res.status(500).json({ error: "Error al editar profesor" });
    }
  }

  // Método para eliminar un profesor existente
  static async eliminar(req, res) {
    const { id } = req.params;
    const sql = "DELETE FROM profesores WHERE ID = ?";
    try {
      await dbQuery(sql, [id]);
      res.json({ mensaje: "Profesor eliminado con éxito" });
    } catch (error) {
      console.error("Error al eliminar profesor:", error);
      res.status(500).json({ error: "Error al eliminar profesor" });
    }
  }
}

// Función de utilidad para ejecutar consultas SQL
function dbQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(dbConfig);
    connection.query(sql, params, (error, results) => {
      connection.end();
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

module.exports = ProfesorController;
