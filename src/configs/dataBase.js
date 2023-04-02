import 'dotenv/config';

import pg from 'pg';

const { Pool } = pg;

const dataBase = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
    ssl: {
        rejectUnauthorized: process.env.NODE_ENV === 'dev' ? false : true
    }
});

export default dataBase;