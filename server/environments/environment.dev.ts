export const environment = {
    BACKEND_PORT: process.env.BACKEND_PORT,
    FRONTEND_PORT: process.env.FRONTEND_PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    CORS_ORIGIN: `${process.env.FRONTEND_PROTOCOL}://${process.env.FRONTEND_HOST}:${process.env.FRONTEND_PORT}`,
    SECRET_KEY: process.env.SECRET_KEY,
    APP_URL: `${process.env.BACKEND_PROTOCOL}://${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}`,
    ACCESS_TOKEN_MAX_AGE: 15 * 60 * 1000,
    REFRESH_TOKEN_MAX_AGE: 7 * 24 * 60 * 60 * 1000,
};