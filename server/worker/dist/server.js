"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
const kafkaClient_1 = require("./kafkaClient");
const worker_1 = require("./worker");
const numCPUs = os_1.default.cpus().length;
if (cluster_1.default.isMaster) {
    console.log(`Master process ${process.pid} is running`);
    console.log(`Forking ${numCPUs} workers`);
    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Restarting...`);
        cluster_1.default.fork(); // Restart a worker if one dies
    });
}
else {
    console.log(`Worker ${process.pid} started`);
    // Initialize Kafka consumer for each worker
    (0, kafkaClient_1.initKafkaConsumer)().then(worker_1.startWorker).catch(console.error);
}
