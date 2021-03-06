import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

import { UserService } from '../shared/user.service';
// import { Payload } from '../types/payload';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }

    async signPayload(payload: any) {
        return sign(payload, "secretKey", { expiresIn: '12h' });
    }

    async validateUser(payload: any) {
        return await this.userService.findByPayload(payload);
    }
}