import { v4 as uuidv4 } from "uuid";
import { hash } from "bcrypt";
import createConnection from "../index";


async function create() {
    const connection = await createConnection();

    const id = uuidv4();
    const password = await hash("admin", 8);

    await connection.query(
        `INSERT INTO users (id, name, email, password, driver_license, "isAdmin")
        values ('${id}', 'admin', 'admin@cars-rental.com', '${password}', 'B', true)`
    );

    await connection.close();
}

create().then(() => console.log("User admin created!"));