import sqlite3 from 'sqlite3';
import { promisify } from 'util';
import { join } from 'path';

//const dbFile = path.join(__dirname, 'test.db');
const dbFile = join(__dirname, '../', 'mp3sqlite.db')
const db = new sqlite3.Database(dbFile,  sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
        console.error(err)
        console.log(process.cwd())
    } else {
        console.info('Connected to sqlite the database.');
    }
});

//@ts-ignore
db.run = promisify(db.run);
//@ts-ignore
db.get = promisify(db.get);
//@ts-ignore
db.all = promisify(db.all);


export async function getFolders() {
    return db.all('SELECT * FROM folders');
}

export async function getFiles() {
    return db.all('SELECT f.*, d."data" as "details" FROM files as f inner join description as d  where completed = 1 and f.youtubeId = d.youtubeId  order by f.addTime DESC limit 100');
}

export async function fileExists(youtubeId: string) {
    return db.get('SELECT * FROM files where youtubeId=?', youtubeId)
}

export async function dbGetWaiting() {
    return db.all('SELECT f.*, d."data" as "details" FROM files as f inner join description as d  where completed != 1 and f.youtubeId = d.youtubeId limit 100');
}

export async function saveFile(id: string, name: string, folder: string, tags: string ) {
    return db.run('INSERT INTO files (youtubeId, name, folder, completed, addTime, tags) values (?,?,?,?,?,?)', [id, name, folder, 0, new Date().toISOString(), JSON.stringify(tags)])
}

export async function getIncomplete(status: number) {
    return db.all('SELECT * FROM files WHERE completed=?', status);
}

export async function setStatus(youtubeId: string, status: number) {
    db.run('UPDATE files SET completed=? WHERE youtubeId=?', [status, youtubeId])
}

export async function saveDetails(youtubeId: string, details: string) {
    const exists = await db.get(`select 1 from description where youtubeId="${youtubeId}" limit 1`)

    if (!exists) {
        return db.run('INSERT INTO description (youtubeId, data) values(?, ?)', [youtubeId, JSON.stringify(details)])
    }
}

export async function dbGetFolders() {
    return db.all('SELECT fo.id, fo.name, (SELECT COUNT(*) FROM files fi WHERE fi.folder LIKE "%"||fo.name||"%") cnt FROM folders fo  ORDER BY cnt DESC')
}

export async function dbSetFolders(id: string, folders: string) {
    return db.run('UPDATE files SET folder=? WHERE youtubeId=?', folders, id);
}

export async function getEntryFolder(id: string) {
    return db.get('SELECT folder FROM files WHERE youtubeId=? limit 1', id)
}

export async function dbAddFolder(name: string) {
    return db.run('INSERT INTO folders (name) values(?)', name);
}