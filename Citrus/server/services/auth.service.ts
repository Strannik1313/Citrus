import { db } from '@config/db';
import { User } from '@interfaces/User';
import { UserDto } from '@dto/UserDto';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { UserRoles } from '@enums/UserRoles';
import { Tokens } from '@interfaces/Tokens';
import jwt from 'jsonwebtoken';
import { config } from '@config/config';
import { Session } from '@interfaces/Session';
import { FieldValue } from '@google-cloud/firestore';

export namespace AuthService {
	export async function getUserById(id: string): Promise<UserDto> {
		let result: UserDto | undefined;
		const userCollection = await db.collection('users').where('id', '==', id).get();
		userCollection.forEach(user => {
			result = {
				name: user.data().name,
				surname: user.data().surname,
				phoneNumber: user.data().phoneNumber,
				id: user.data().id,
				email: user.data().email,
				role: user.data().role,
			};
		});
		if (!result) throw new Error('Не удалось найти пользователя');
		return result;
	}

	export async function getUserByEmail(email: string): Promise<User | undefined> {
		let result: User | undefined;
		const userCollection = await db.collection('users').where('email', '==', email).get();
		userCollection.forEach(user => (result = user.data() as User));
		return result;
	}

	export async function register(params: { email: string; password: string }): Promise<UserDto | undefined> {
		let result: UserDto | undefined;
		const id = crypto.randomUUID();
		const salt = bcrypt.genSaltSync(10);
		const userRef = db.collection('users').doc(id);
		await userRef.set({
			email: params.email,
			password: bcrypt.hashSync(params.password, salt),
			role: UserRoles.USER,
			id,
		});
		const userCollection = await db.collection('users').where('id', '==', id).get();
		userCollection.forEach(user => {
			result = {
				name: user.data().name,
				surname: user.data().surname,
				phoneNumber: user.data().phoneNumber,
				email: user.data().email,
				id: user.data().id,
				role: user.data().role,
			};
		});
		return result;
	}

	export async function createTokens(userId: string): Promise<Tokens> {
		let result: Tokens;
		const id = crypto.randomUUID();
		const accessToken = jwt.sign({ userId }, config.jwt, {
			expiresIn: 3600,
		});
		const refreshToken = jwt.sign({ sessionId: id, userId }, config.jwt, {
			expiresIn: '7d',
		});
		result = { accessToken, refreshToken, id };
		return result;
	}

	export function validatePassword(password: string, hash: string) {
		return bcrypt.compareSync(password, hash);
	}

	export async function createSession(session: Session): Promise<void> {
		const sessionsRef = db.collection('sessions').doc(session.userId);
		const sessionsCollection = await sessionsRef.get();
		const document = sessionsCollection.data();
		if (!!(document?.session as Session[])?.find(dbSession => dbSession.ua === session.ua)) {
			throw new Error('С данного устройства уже выполнен логин');
		}
		const salt = bcrypt.genSaltSync(10);
		const secureSession: Session = { ...session, refreshToken: bcrypt.hashSync(session.refreshToken, salt) };
		if (!document || document.session.length >= 5) {
			await sessionsRef.set({
				session: [secureSession],
			});
			return;
		}
		await sessionsRef.update({
			session: FieldValue.arrayUnion(secureSession),
		});
		return;
	}

	export async function removeSession(userId: string, ua: string): Promise<void> {
		const sessionsRef = db.collection('sessions').doc(userId);
		const sessionsCollection = await sessionsRef.get();
		const document = sessionsCollection.data();
		if (!document) throw new Error('Не удалось получить коллекцию');
		const session = (document.session as Array<Session>).find(session => ua === session.ua);
		if (!session) throw new Error('Не удалось получить коллекцию');
		await sessionsRef.update({
			session: FieldValue.arrayRemove(session),
		});
	}

	export async function removeAllSessions(userId: string): Promise<void> {
		await db.collection('sessions').doc(userId).delete();
	}
}
