import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./src/config/database.sqlite",
    entities: [], // Mapeia as entidades no banco de dados.
    synchronize: true
});