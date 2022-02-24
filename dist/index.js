"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
// don't forget to change url in .env file
const CONNECTION_URL = process.env.MONGO_URL;
console.log(CONNECTION_URL);
const PORT = process.env.PORT || 5000;
mongoose_1.default.connect(CONNECTION_URL)
    .then(() => app_1.default.listen(PORT, () => console.log(`server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));
