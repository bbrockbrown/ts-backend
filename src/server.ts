import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Only allow requests from the below origins aka URLs
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      process.env.FRONTEND_URL_DEV,
    ];

    // Continue if origin is allowed
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else { // Reject if not allowed
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400,
};

app.use(cors(corsOptions));

if (process.env.NODE_ENV !== 'production') {
  console.log('CORS Configuration:', {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });
}

app.use(cookieParser());
app.use(express.json());

app.use((req, _res, next) => {
  req.url = req.url.replace(/\/+/g, '/');
  next();
});

app.use('/auth', authRoutes);

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

// eslint-disable-next-line no-unused-vars
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error details:', {
    message: err.message,
    stack: err.stack,
    status: err.status || 500,
  });

  res.status(err.status || 500).json({
    error:
      process.env.NODE_ENV === 'production'
        ? 'Internal Server Error'
        : err.message,
  });
});

if (process.env.NODE_ENV !== 'production') {
  console.log('CORS Configuration:', {
    allowedOrigins: [process.env.FRONTEND_URL, process.env.FRONTEND_URL_DEV],
    credentials: true,
  });
}

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL}`);
});