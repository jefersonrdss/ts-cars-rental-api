import { createConnection } from "typeorm";

if (createConnection()) { console.log("Conexão com banco de dados realizada." ); }