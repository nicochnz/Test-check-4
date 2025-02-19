// Creer une class CategoryRepo
//Methode Create & Read
import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
class CategoryRepository {
  async create(name: string) {
    const connection = await databaseClient.getConnection();
    try {
      await connection.beginTransaction();
      const [categoryResult] = await connection.query<Result>(
        `INSERT INTO category (name)
        VALUES(?)`,
        [name],
      );
      const categoryId = categoryResult.insertId;
      await connection.commit();
      return categoryId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM category WHERE id = ?",
      [id],
    );
    return rows[0];
  }
}

export default new CategoryRepository();
