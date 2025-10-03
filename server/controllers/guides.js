import { pool } from '../config/database.js'


const getGuides = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM guides ORDER BY id ASC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
} 

const getGuidesFromDB = async () => {
    const results = await pool.query('SELECT * FROM guides ORDER BY id ASC');
    return results;
};

const getGuideBySlug = async (slug) => {
    const result = await pool.query('SELECT * FROM guides WHERE slug = $1', [slug]);
    return result;
};

export default {
    getGuides,
    getGuidesFromDB,
    getGuideBySlug
}