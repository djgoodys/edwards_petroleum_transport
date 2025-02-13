const JWT_SECRET_KEY = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy';

const SERVER_PORT = 5000;

const DATABASE_URI = "mongodb+srv://edwards:PHax9g5nhQOoqMBg@cluster0.mz4nm.mongodb.net/edwards?retryWrites=true&w=majority&appName=Cluster0";

const TOKEN_EXPIRATION_DURATION = '7d';

module.exports = {
    JWT_SECRET_KEY,
    SERVER_PORT,
    DATABASE_URI,
    TOKEN_EXPIRATION_DURATION
}