import dotenv from 'dotenv';
import assert from 'assert';
import { env } from 'process';

dotenv.config();

const { PORT, HOST, HOST_URL, JWT } = env;

assert(PORT, 'PORT is required');
assert(HOST, 'HOST is required');
assert(HOST_URL, 'HOST URL is required');
assert(JWT, 'JWT is required');
const config = {
	port: PORT,
	host: HOST,
	url: HOST_URL,
	jwt: JWT,
};
export { config };
