import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { UserService } from 'src/shared/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.startegy';

@Module({
  controllers: [AuthController],
  imports: [SharedModule],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule { }
