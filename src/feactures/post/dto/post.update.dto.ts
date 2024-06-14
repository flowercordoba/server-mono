
import { IsString, IsOptional, IsArray, IsBoolean, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
export class UpdatePostDto {
    @IsString()
    @IsOptional()
    post?: string;
  
    @IsString()
    @IsOptional()
    bgColor?: string;
  
    @IsString()
    @IsOptional()
    imgVersion?: string;
  
    @IsString()
    @IsOptional()
    imgId?: string;
  
    @IsString()
    @IsOptional()
    videoVersion?: string;
  
    @IsString()
    @IsOptional()
    videoId?: string;
  
    @IsString()
    @IsOptional()
    feelings?: string;
  
    @IsString()
    @IsOptional()
    gifUrl?: string;
  
    @IsString()
    @IsOptional()
    privacy?: string;
  
    @IsArray()
    @IsOptional()
    @Type(() => String)
    tags?: string[];
  
    @IsString()
    @IsOptional()
    location?: string;
  
    @IsArray()
    @IsOptional()
    @Type(() => String)
    mentions?: string[];
  
    @IsDateString()
    @IsOptional()
    editedAt?: Date;
  
    @IsBoolean()
    @IsOptional()
    isPinned?: boolean;
  }
  