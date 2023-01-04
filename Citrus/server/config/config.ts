import dotenv from 'dotenv';
import assert from 'assert';

dotenv.config();

const {
	PORT,
	HOST,
	HOST_URL,
	API_KEY,
	AUTH_DOMAIN,
	PROJECT_ID,
	STORAGE_BUCKET,
	MESSAGING_SENDER_ID,
	APP_ID,
	JWT,
} = process.env;

assert(PORT, 'PORT is required');
assert(HOST, 'HOST is required');
const config = {
	port: PORT,
	host: HOST,
	url: HOST_URL,
	jwt: JWT,
};
export { config };
