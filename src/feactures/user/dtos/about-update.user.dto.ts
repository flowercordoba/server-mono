interface IUpdateAboutUserDto {
    aboutme?: string;
  }
  
  export class UpdateAboutUserDto implements IUpdateAboutUserDto {
    aboutme?: string;
  
    constructor(data: IUpdateAboutUserDto) {
      this.aboutme = data.aboutme;
    }
  
    static create(data: IUpdateAboutUserDto): UpdateAboutUserDto {
      return new UpdateAboutUserDto(data);
    }
  }
  