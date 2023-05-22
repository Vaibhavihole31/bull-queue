import Queue from "bull";
import dotennv from 'dotenv';

dotennv.config();

const REDIS_CONFIG = { redis: { port: process.env.REDIS_PORT, host: process.env.REDIS_HOST, password: process.env.REDIS_PASSWORD } };

const activeStudentsCount = new Queue('activeStudentsCount', REDIS_CONFIG);

const syncWait = ms => {
    const end = Date.now() + ms
    while (Date.now() < end) continue
}

activeStudentsCount.process(function (job, done) {

    console.log('Processing job ', job.id);
    // count total active students
    const toatlStudents = Math.floor(Math.random() * 100);
    syncWait(5000);
    console.log(`Total Active Students are ${toatlStudents}`);


    job.progress(100);
    done();

});

export default activeStudentsCount;