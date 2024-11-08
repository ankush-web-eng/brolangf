import { consumer } from './kafkaClient';
import axios from 'axios';

const GO_SERVER_URL = 'http://localhost:8080/compile';

const processMessage = async (message: string) => {
  try {
    // Parse message if it’s a JSON string
    let requestBody;
    try {
      requestBody = JSON.parse(message);
    } catch (parseError) {
      console.error('Error parsing message:', parseError);
      // Default to wrapping message in a code object if parsing fails
      requestBody = { code: message };
    }

    // Send the code and requestId, if present, to the Go server
    const response = await axios.post(GO_SERVER_URL, requestBody);
    console.log(`Message sent to Go server, response status: ${response.status}`);
  } catch (error) {
    console.error('Error sending message to Go server:', error);
  }
};

export const startWorker = async () => {
  await consumer.run({
    eachMessage: async ({ message }) => {
      if (message.value) {
        await processMessage(message.value.toString());
      }
    },
  });
};
