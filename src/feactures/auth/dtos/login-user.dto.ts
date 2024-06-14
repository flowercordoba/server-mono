/* eslint-disable @typescript-eslint/no-explicit-any */
// import { regularExps } from '@root/shared/config';

export class LoginUserDto {
  private constructor(
    public username: string,
    public password: string,
  ) {}

  static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { username, password } = object;

    if (!username) return ['Missing username'];
    // if (!regularExps.username.test(username)) return ['Username is not valid'];
    if (!password) return ['Missing password'];
    if (password.length < 6) return ['Password too short'];

    return [undefined, new LoginUserDto(username, password)];
  }
}
