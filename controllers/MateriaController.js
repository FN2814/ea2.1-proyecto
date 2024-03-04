const mysql = require("mysql");
const dbConfig = require("../dbConfig");

class MateriaController {
  // Método para agregar una nueva materia
  static async agregar(req, res) {
    const { Nombre, ID_Profesor, ID_Seccion } = req.body;
    console.log(req.body); // Depurar entrada
    const sql = "INSERT INTO materias (Nombre, ID_Profesor, ID_Seccion) VALUES (?, ?, ?)";
    try {
      await dbQuery(sql, [Nombre, ID_Profesor, ID_Seccion]);
      res.json({ mensaje: "Materia agregada con éxito" });
    } catch (error) {
      console.error("Error al agregar materia:", error);
      res.status(500).json({ error: "Error al agregar materia" });
    }
  }


 // Método para obtener todas las materias
 static async listar(req, res) {
  const sql = "SELECT * FROM materias";
  try {
    const materias = await dbQuery(sql);
    res.json(materias);
  } catch (error) {
    console.error("Error al obtener materias:", error);
    res.status(500).json({ error: "Error al obtener materias" });
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

module.exports = MateriaController;
