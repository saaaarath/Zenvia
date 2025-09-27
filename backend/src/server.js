// external imports
import '../instrument.mjs'; // Sentry must be the first import
import express from 'express';
import {clerkMiddleware} from '@clerk/express';

// custom imports
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';
import { functions, inngest } from './config/inngest.js';
import { serve } from 'inngest/express';
import chatRoutes from './routes/chat.route.js';

import * as Sentry from "@sentry/node";

//app setup
const app = express();

// Middleware setup
app.use(express.json()); //req.body will be available in the request objects
app.use(clerkMiddleware()); // req.auth will be available in the request objects

app.get('/debug-sentry', (req, res) =>{
  throw new Error('My first Sentry error!');
});

app.get('/', (req, res) => {
  res.send('Hello world! 123');
});

app.use('/api/inngest', serve({ client: inngest, functions }))
app.use('/api/chat', chatRoutes);

Sentry.setupExpressErrorHandler(app);



const startServer = async () => { 
  try {
    await connectDB();
    if (ENV.NODE_ENV !== 'production') {
      app.listen(ENV.PORT, () => { 
        console.log(`Server running on http://localhost:${ENV.PORT}`);
        
      })
    }
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);  // Exit the process with an error code
  }
}

startServer();

export default app;