import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from './jwt.service';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer', '');

    if (!token) {
      throw new UnauthorizedException('토큰이 없습니다.');
    }

    try {
      const decoded = this.jwtService.verifyAccessToken(token);
      req['user'] = decoded;
      next();
    } catch (error) {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }
  }
}
