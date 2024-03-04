const mysql = require("mysql");
const dbConfig = require("../dbConfig");

class EventoController {
  // Método para agregar un nuevo evento
  static async agregar(req, res) {
    const { Nombre, Fecha, ID_Materia } = req.body;
    const sql = "INSERT INTO eventos (Nombre, Fecha, ID_Materia) VALUES (?, ?, ?)";
    try {
      await dbQuery(sql, [Nombre, Fecha, ID_Materia]);
      res.json({ mensaje: "Evento agregado con éxito" });
    } catch (error) {
      console.error("Error al agregar evento:", error);
      res.status(500).json({ error: "Error al agregar evento" });
    }
  }

  // Método para obtener todos los eventos
  static async listar(req, res) {
    const sql = "SELECT * FROM eventos";
    try {
      const eventos = await dbQuery(sql);
      res.json(eventos);
    } catch (error) {
      console.error("Error al obtener eventos:", error);
      res.status(500).json({ error: "Error al obtener eventos" });
    }
  }

  // Método para editar un evento existente
  static async editar(req, res) {
    const { id } = req.params;
    const { Nombre, Fecha, ID_Materia } = req.body;
    const sql = "UPDATE eventos SET Nombre = ?, Fecha = ?, ID_Materia = ? WHERE ID = ?";
    try {
      await dbQuery(sql, [Nombre, Fecha, ID_Materia, id]);
      res.json({ mensaje: "Evento editado con éxito" });
    } catch (error) {
      console.error("Error al editar evento:", error);
      res.status(500).json({ error: "Error al editar evento" });
    }
  }

  // Método para eliminar un evento existente
  static async eliminar(req, res) {
    const { id } = req.params;
    const sql = "DELETE FROM eventos WHERE ID = ?";
    try {
      await dbQuery(sql, [id]);
      res.json({ mensaje: "Evento eliminado con éxito" });
    } catch (error) {
      console.error("Error al eliminar evento:", error);
      res.status(500).json({ error: "Error al eliminar evento" });
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

module.exports = EventoController;