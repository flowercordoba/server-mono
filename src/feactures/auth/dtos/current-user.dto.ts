/* eslint-disable @typescript-eslint/no-explicit-any */
import { regularExps } from '@root/shared/config';



export class CurrentUserDto {
  private constructor(
    public email: string,
    public password: string,
  ) {}

  static create(object: { [key: string]: any }): [string?, CurrentUserDto?] {
    const { email, password } = object;

    if (!email) return ['Missing email'];
    if (!regularExps.email.test(email)) return ['Email is not valid'];
    if (!password) return ['Missing password'];
    if (password.length < 6) return ['Password too short'];

    return [undefined, new CurrentUserDto(email, password)];
  }
}
