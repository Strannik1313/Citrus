import { Request, Response } from 'express';
import { AuthService } from '@services/auth.service';
import { Session } from '@interfaces/Session';
import { User } from '@interfaces/User';
import { Tokens } from '@interfaces/Tokens';
import { UserDto } from '@dto/UserDto';

namespace AuthController {
	export async function login(req: Request, res: Response) {
		let user: User;
		let tokens: Tokens | undefined;
		try {
			user = await AuthService.getUserByEmail(req.body.email);
		} catch (error) {
			res.status(404).json(error);
			return;
		}
		try {
			if (AuthService.validatePassword(req.body.password, user.password)) {
				tokens = await AuthService.createTokens(user.id);
			} else {
				res.status(404).json({ message: 'Пароли не совпадают. Повторите попытку' });
				return;
			}
		} catch (error) {
			res.status(404).json({ message: 'Пароли не совпадают. Повторите попытку' });
			return;
		}
		if (!!tokens) {
			const { accessToken, refreshToken, id } = tokens;
			const ua = req.header('user-agent');
			if (!ua) {
				res.status(404).json({ message: 'Не удалось определить систему' });
				return;
			}
			const session: Session = {
				id,
				userId: user.id,
				refreshToken,
				ua,
			};
			try {
				await AuthService.createSession(session);
				res.cookie('session', refreshToken, { httpOnly: true, sameSite: 'strict', path: '/api/auth/refresh-tokens' });
				res.status(200).json({
					user: { ...user, password: undefined },
					accept: accessToken,
				});
			} catch (error) {
				res.status(500).json({ message: 'Внутренняя ошибка сервера' });
			}
		} else {
			res.status(500).json({ message: 'Внутренняя ошибка сервера' });
			return;
		}
	}

	export async function logout(req: Request, res: Response) {
		try {
			let ua = req.header('user-agent');
			if (!ua) {
				res.status(404).json({ message: 'Не удалось определить систему' });
				return;
			}
			await AuthService.removeSession(req.body.id, ua);
			res.clearCookie('session');
			res.status(200).end();
		} catch (error) {
			res.status(500).json(error);
		}
	}

	export async function register(req: Request, res: Response) {
		let user: User | undefined;
		let candidate: UserDto | undefined;
		try {
			user = await AuthService.getUserByEmail(req.body.email);
		} catch (error) {
			res.status(500).json(error);
		}
		if (!!user) {
			res.status(409).json({
				message: 'Такой email уже используется',
			});
		} else {
			try {
				candidate = await AuthService.register({ email: req.body.email, password: req.body.password });
			} catch (error) {
				res.status(500).json(error);
			}
			if (!!candidate) {
				res.status(200).json({ candidate });
			}
		}
	}

	export async function refreshTokens(req: Request, res: Response) {
		let token: string | undefined = req.header('authorization');
		let user: UserDto = req.user as UserDto;
		let ua: string | undefined = req.header('user-agent');
		if (!token || !ua) {
			res.status(400).json({ message: 'Bad request' });
			return;
		}
		try {
			await AuthService.removeSession(user.id, ua);
			const { accessToken, refreshToken, id } = await AuthService.createTokens(user.id);
			const session: Session = {
				id,
				userId: user.id,
				refreshToken,
				ua,
			};
			await AuthService.createSession(session);
			res.clearCookie('session');
			res.cookie('session', refreshToken, { httpOnly: true, sameSite: 'strict', path: '/api/auth/refresh-tokens' });
			res.status(200).json({
				user,
				accept: accessToken,
			});
		} catch (error) {
			res.status(400).json({ message: 'Bad request' });
			return;
		}
	}
}

export default AuthController;
