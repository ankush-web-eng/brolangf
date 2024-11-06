import { Kafka, Producer } from 'kafkajs';

let producer: Producer | null = null;

const kafka = new Kafka({
  clientId: 'nextjs-producer',
  brokers: ['localhost:9092'],
});

export const getKafkaProducer = async () => {
  if (!producer) {
    producer = kafka.producer();
    await producer.connect();
  }
  return producer;
};
