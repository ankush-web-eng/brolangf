import cluster from 'cluster';
import os from 'os';
import { initKafkaConsumer } from './kafkaClient';
import { startWorker } from './worker';

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(`Master process ${process.pid} is running`);
  console.log(`Forking ${numCPUs} workers`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork(); // Restart a worker if one dies
  });
} else {
  console.log(`Worker ${process.pid} started`);
  
  // Initialize Kafka consumer for each worker
  initKafkaConsumer().then(startWorker).catch(console.error);
}
