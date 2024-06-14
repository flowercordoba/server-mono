import { IsNotEmpty, IsString, IsOptional, IsIn } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsIn(['public', 'private', 'friends'])
  privacy!: 'public' | 'private' | 'friends';
}

export class UpdateAlbumDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsIn(['public', 'private', 'friends'])
  privacy?: string;
}

export class UploadMediaDto {
  @IsNotEmpty()
  @IsString()
  albumId!: string;

  @IsNotEmpty()
  @IsString()
  media!: string;  // Base64 encoded string

  @IsNotEmpty()
  @IsIn(['image', 'video'])
  type!: 'image' | 'video';
}
