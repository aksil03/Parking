import { Database } from "bun:sqlite";

// sert juste a la création
async function createDatabase() {
    const db = new Database("database.sqlite");

    await db.run(`
        CREATE TABLE "cities" (
        "id" INTEGER NOT NULL,
        "name" TEXT NOT NULL UNIQUE,
        "slug" TEXT NOT NULL UNIQUE,
        "location" TEXT,
        "country" TEXT NOT NULL,
        PRIMARY KEY("id" AUTOINCREMENT)
    )
    `);

    await db.run(`
        CREATE TABLE "parkings" (
        "id" INTEGER NOT NULL,
        "name" TEXT NOT NULL UNIQUE,
        "location" TEXT,
        "numberOfSpots" INTEGER NOT NULL,
        "opened" INTEGER NOT NULL DEFAULT 1,
        "hourlyRate" REAL NOT NULL,
        "city_id" INTEGER NOT NULL,
        PRIMARY KEY("id" AUTOINCREMENT),
        FOREIGN KEY("city_id") REFERENCES "cities"("id")
    )
    `);

    await db.run(`
       CREATE TABLE "spots" (
       "id" INTEGER NOT NULL,
       "parking_id" INTEGER NOT NULL,
       PRIMARY KEY("id" AUTOINCREMENT),
       FOREIGN KEY("parking_id") REFERENCES "parkings"("id")
    )
    `);

    await db.run(`
        CREATE TABLE "parks" (
        "id" TEXT NOT NULL UNIQUE,
        "startedAt" TEXT NOT NULL,
        "endedAt" TEXT,
        "vehicleNumberPlate" TEXT,
        "spot_id" INTEGER NOT NULL,
        "price" REAL NOT NULL DEFAULT 0,
        PRIMARY KEY("id"),
        FOREIGN KEY("spot_id") REFERENCES "spots"("id")
    )
    `);

}

createDatabase();