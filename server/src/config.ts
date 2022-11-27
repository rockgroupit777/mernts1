import dotenv from 'dotenv';

dotenv.config();
export default {
    port: process.env.HTTP_PORT,
    db: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}${process.env.DB_HOST}${process.env.DB_NAME}${process.env.DB_RULES}`,
    jwtSecret: process.env.MY_SECRET,
  };

  