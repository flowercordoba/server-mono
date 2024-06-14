import { IsString, IsNotEmpty } from 'class-validator';

export class UploadImageDto {
  @IsString()
  @IsNotEmpty()
  public image!: string;
}

export class GetImageDto {
  @IsString()
  @IsNotEmpty()
  public userId!: string;
}

export class DeleteImageDto {
  @IsString()
  @IsNotEmpty()
  public imageId!: string;
}
