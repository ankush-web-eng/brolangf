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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startWorker = void 0;
const kafkaClient_1 = require("./kafkaClient");
const axios_1 = __importDefault(require("axios"));
const GO_SERVER_URL = 'http://localhost:8080/compile';
const processMessage = (message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Parse message if it’s a JSON string
        let requestBody;
        try {
            requestBody = JSON.parse(message);
        }
        catch (parseError) {
            // Default to wrapping message in a code object if parsing fails
            requestBody = { code: message };
        }
        // Send the code and requestId, if present, to the Go server
        const response = yield axios_1.default.post(GO_SERVER_URL, requestBody);
        console.log(`Message sent to Go server, response status: ${response.status}`);
    }
    catch (error) {
        console.error('Error sending message to Go server:', error);
    }
});
const startWorker = () => __awaiter(void 0, void 0, void 0, function* () {
    yield kafkaClient_1.consumer.run({
        eachMessage: (_a) => __awaiter(void 0, [_a], void 0, function* ({ message }) {
            if (message.value) {
                yield processMessage(message.value.toString());
            }
        }),
    });
});
exports.startWorker = startWorker;
