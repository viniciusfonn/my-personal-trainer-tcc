import {UserToken} from "@prisma/client";

export default interface IUserTokensRepository {
	generate(user_id: string): Promise<UserToken>;
	findByToken(token: string): Promise<UserToken | null>;
}

