import mongoose from 'mongoose';
import { loadEnvConfig } from '@next/env';

export default function connectDatabase() {

    const  {combinedEnv} = loadEnvConfig(process.cwd());
    const connectionString = combinedEnv.MONGO_URI;
    
    if(!connectionString) {
        throw new Error('MONGO_URI is not defined in the environment.');
    }

    return ((): void => {
        if(mongoose.STATES[mongoose.connection.readyState]) return;

        mongoose.connect(connectionString)
            .then(() => {
                console.info("Database connected.");
            })
            .catch((err) => {
                if (err instanceof Error) console.error(err.message);
                process.exit(1);
            });
    
        const db = mongoose.connection;
        
        db.on("error", (err) => console.error("MongoDB error:\n" + err));
    })()
}
