import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { LoginDTO, RegisterDTO } from 'src/auth/auth.dto';
import * as mongoose from 'mongoose';
const app = 'http://localhost:3000';

// 'mongodb://localhost/ecomm'


beforeAll(async () => {
  await mongoose.connect('mongodb://localhost/ecomm');
  await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('AppController (e2e)', () => {
  // let app: INestApplication;

  // beforeEach(async () => {
  //   const moduleFixture: TestingModule = await Test.createTestingModule({
  //     imports: [AppModule],
  //   }).compile();

  //   app = moduleFixture.createNestApplication();
  //   await app.init();
  // });

  it('/ (GET)', () => {
    return request(app)
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});

describe('AUTH', () => {
  it('should return auth user', () => {
    const user: RegisterDTO = {
      username: 'username',
      password: 'password',
    };
    return request(app)
      .post('/auth/register')
      .set('Aceept', 'application/json')
      .send(user)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
        expect(body.user.username).toBe('username');
        expect(body.user.password).toBeUndefined();


      })
      .expect(HttpStatus.CREATED);
  });

  it('should login user', () => {
    const user: LoginDTO = {
      username: 'username',
      password: 'password',
    };
    return request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(user)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
        expect(body.user.username).toEqual('username');
        expect(body.user.password).toBeUndefined();
      })
      .expect(HttpStatus.CREATED);
  });
})
