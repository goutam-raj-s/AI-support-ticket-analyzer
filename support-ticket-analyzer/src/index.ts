import app from './app';
import { ENV } from './config/env';

const startServer = () => {
    app.listen(ENV.PORT, () => {
        console.log(`Server is running at http://localhost:${ENV.PORT}`);
        console.log(`Send a POST request to http://localhost:${ENV.PORT}/api/analyze to test the API.`);
    });
};

startServer();
