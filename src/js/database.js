const { Pool } = require('pg');
const pool = new Pool({
    user: "postgres",
    password: "supausa",
    database: "WAD_Team_Retired",
    host: "localhost",
    port: "5432"
});

//CREATION
const createTables = async () => {
    const createPostsTable = `
        CREATE TABLE IF NOT EXISTS public."Posts"
        (
            "ID" bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
            "Title" text COLLATE pg_catalog."default",
            "Text" text COLLATE pg_catalog."default",
            "Date" date NOT NULL,
            "Likes" integer NOT NULL,
            "Author_ID" bigint NOT NULL,
            CONSTRAINT "PK_AUTHOR_ID" FOREIGN KEY ("Author_ID")
                REFERENCES public."Users" ("ID") MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE NO ACTION
                NOT VALID
        );
    `;

    const createUsersTable = `
        CREATE TABLE IF NOT EXISTS public."Users"
        (
            "ID" bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
            "Username" character varying(50) COLLATE pg_catalog."default" NOT NULL,
            "Password" character varying(255) COLLATE pg_catalog."default" NOT NULL,
            "Email" character varying(255) COLLATE pg_catalog."default",
            CONSTRAINT "PK" PRIMARY KEY ("ID")
        );
    `;

    try {
        await pool.query(createPostsTable);
        await pool.query(createUsersTable);
    } catch (error) 
    {
        console.error("Error:", error);
    }
};

module.exports = { pool, createTables };