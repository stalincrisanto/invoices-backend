import { createPool } from "mysql2/promise";
import type { PoolOptions } from "mysql2/promise";

const configDb: PoolOptions = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectTimeout: 50000 //30 segundos timeout
};

export const testConnection = async () => {
  try {
    const connection = await db.getConnection(); // <-- correcto
    console.log("✅ Conexión a MySQL exitosa");
    connection.release(); // liberar conexión al pool
  } catch (error) {
    console.error("❌ Error al conectar a MySQL ------>", error);
  }
};

export const db = createPool(configDb);
