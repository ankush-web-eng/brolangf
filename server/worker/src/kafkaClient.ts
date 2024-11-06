import { Kafka, Consumer } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'node-cluster',
  brokers: ['localhost:9092'],
});

export const consumer: Consumer = kafka.consumer({ groupId: 'worker-group' });

export const initKafkaConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'brolang', fromBeginning: true });
};
