const mysql = require("mysql");
const dbConfig = require("../dbConfig");

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
