import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          password: 'asdtest',
          email: 'asd@asdf.com',
        } as User);
      },
      find: (email) => {
        return Promise.resolve([
          {
            id: 1234,
            email,
            password: 'asdtest',
          } as User,
        ]);
      },
    };

    fakeAuthService = {
      signin: (email, password) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
      // signup: () => {},
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all users with a given email - findAllUsers', async () => {
    const user = await controller.findAllUsers('asd@asdf.com');

    expect(user.length).toEqual(1);
    expect(user[0].email).toEqual('asd@asdf.com');
  });

  it('should return one user with a given id - findUser', async () => {
    const user = await controller.findUser(1234);
    expect(user).toBeDefined();
  });

  it('should throw error if no user exists - findUser', async () => {
    fakeUsersService.findOne = () => null;
    try {
      await controller.findUser(1234);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should return user with session object holding the userid', async () => {
    const session = { userId: -10 };
    const user = await controller.signIn({ email: '123@fsk.com', password: 'asdsa' }, session);

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
