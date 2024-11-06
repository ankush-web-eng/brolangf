"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initKafkaConsumer = exports.consumer = void 0;
const kafkajs_1 = require("kafkajs");
const kafka = new kafkajs_1.Kafka({
    clientId: 'node-cluster',
    brokers: ['localhost:9092'],
});
exports.consumer = kafka.consumer({ groupId: 'worker-group' });
const initKafkaConsumer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.consumer.connect();
    yield exports.consumer.subscribe({ topic: 'brolang', fromBeginning: true });
});
exports.initKafkaConsumer = initKafkaConsumer;
