import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app';

declare const process : {
    env: {
      MONGO_URL: string,
      PORT?: number
    }
}
const CONNECTION_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

