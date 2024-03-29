const db = require('../../db/db_connection.js')

export default async function handler(req, res) {
    const { method } = req;
    let {body} = req;

    if (method === "POST") {
        db.execute('Update Race SET raceName = ?, raceDate = ?, raceLocation = ?, raceLength = ?, Signup = ? WHERE raceID = ?',[body.name, body.time, body.location, body.distance, body.contact,body.ID]);
        return res.status(200);
    }
}