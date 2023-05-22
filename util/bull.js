import Queue from "bull";
import dotennv from 'dotenv';

dotennv.config();

const REDIS_CONFIG = { redis: { port: process.env.REDIS_PORT, host: process.env.REDIS_HOST, password: process.env.REDIS_PASSWORD }};

const sayHelloQueue = new Queue('sayHelloQueue', REDIS_CONFIG);

const syncWait = ms => {
    const end = Date.now() + ms
    while (Date.now() < end) continue
}

sayHelloQueue.process(function (job, done) {

    // console.log('Processing job ', job.id);
    const email = job.data.email;
    console.log(`Sending email to ${email}`)
    syncWait(5000);
    console.log(`Email sent....`);

    console.log(`Sending SMS to ${job.data.mobile}`)
    syncWait(5000);
    console.log(`SMS sent....`);
   

    job.progress(100);

    console.log('Done processing job ', job.id);
    done();
  
});

export default sayHelloQueue;