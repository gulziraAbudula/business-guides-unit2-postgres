import { pool } from "./database.js"
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })
import guides from "../data/guides.js"

const createTableQuery = `
    DROP TABLE IF EXISTS guides;

    CREATE TABLE IF NOT EXISTS guides (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        text VARCHAR(500) NOT NULL,
        category VARCHAR(100) NOT NULL,
        image TEXT NOT NULL,
        submittedBy VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        createdAt DATE NOT NULL
    )
`

const createGuidesTable = async () => {
    try {
        await pool.query(createTableQuery)
        console.log('🎉 guides table created successfully')
    } catch (err) {
        console.error('⚠️ error creating guides table', err)
    }
}

const seedGuidesTable = async () => {
    await createGuidesTable()
    for (const guide of guides) {
        const insertQuery = `
            INSERT INTO guides (title, text, category, image, submittedBy, slug, createdAt)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `
        const values = [
            guide.title,
            guide.text,
            guide.category,
            guide.image,
            guide.submittedBy,
            guide.slug,
            guide.createdAt
        ]

        try {
            await pool.query(insertQuery, values)
            console.log(`✅ ${guide.name} added successfully`)
        } catch (err) {
            console.error(`⚠️ error inserting guide: ${guide.name}`, err)
        }
    }
}

seedGuidesTable()