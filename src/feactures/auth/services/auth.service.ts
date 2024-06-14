/* eslint-disable @typescript-eslint/no-unused-vars */
import { bcryptAdapter, JwtAdapter, envs } from '@root/shared/config';
import { LoginUserDto } from '../dtos/login-user.dto';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { UserEntity } from '../entities/user.entity';
import { AuthModel } from '../models/auth.model';
import { CustomError } from '@globals/helpers/custom.error';
import { UserModel } from '@root/feactures/user/models/user.model';

export class AuthService {
  constructor() {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await AuthModel.findOne({ email: registerUserDto.email });
    if (existUser) throw CustomError.badRequest('Email already exist');

    try {
      const user = new AuthModel(registerUserDto);
      console.log('user sservices',user);

      // Encriptar la contraseña
      user.password = await bcryptAdapter.hash(registerUserDto.password);

      await user.save();

      // Crear el usuario en UserModel
      const userModel = new UserModel({
        authId: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        work: '',
        school: '',
        location: '',
        birthday: '',
        gender: '',
        termins: '',
        quote: '',
        aboutme: '',
        lastname: '',
        bgImageVersion: '',
        bgImageId: '',
        privacy: 'public',
        lastActive: new Date(),
      });

      await userModel.save();
      console.log('user userModel',userModel);


      const { password, ...userEntity } = UserEntity.fromObject(user);

      const token = await JwtAdapter.generateToken({ id: user.id });
      if (!token) throw CustomError.internalServer('Error while creating JWT');

      return {
        user: userEntity,
        token: token,
      };
    } catch (error) {
      console.log('error services',error);
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async loginUser(loginUserDto: LoginUserDto) {
    const user = await AuthModel.findOne({ username: loginUserDto.username });
    if (!user) throw CustomError.badRequest('Username not exist');

    const isMatching = await bcryptAdapter.compare(loginUserDto.password, user.password);
    if (!isMatching) throw CustomError.badRequest('Password is not valid');

    const { password, ...userEntity } = UserEntity.fromObject(user);

    const token = await JwtAdapter.generateToken({ id: user.id });
    if (!token) throw CustomError.internalServer('Error while creating JWT');

    return {
      user: userEntity,
      token: token,
    };
  }

  public async getAuthUserById(id: string) {
    const user = await AuthModel.findById(id);
    if (!user) throw CustomError.notFound('User not found');
    return user;
  }

  public async getUserByUsernameOrEmail(usernameOrEmail: string) {
    const user = await AuthModel.findOne({
      $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    });
    if (!user) throw CustomError.notFound('User not found');
    return user;
  }

  public async getUserByUsername(username: string) {
    console.log('Service: Looking for user by username:', username);

    const user = await AuthModel.findOne({ username });
    console.log('services username', user);
    if (!user) throw CustomError.notFound('User not found');
    return user;
  }

  public async getUserByEmail(email: string) {
    const user = await AuthModel.findOne({ email });
    if (!user) throw CustomError.notFound('User not found');
    return user;
  }

  public async getAuthUserByVerificationToken(token: string) {
    const payload = await JwtAdapter.validateToken(token);
    if (!payload) throw CustomError.unauthorized('Invalid token');

    const { email } = payload as { email: string };
    const user = await AuthModel.findOne({ email });
    if (!user) throw CustomError.notFound('User not found');

    return user;
  }

  public async signToken(data: object) {
    const token = await JwtAdapter.generateToken(data);
    if (!token) throw CustomError.internalServer('Error while creating JWT');
    return token;
  }
}
