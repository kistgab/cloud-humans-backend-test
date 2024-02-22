import { EducationLevel } from '@/domain/pro/enums/education-levels.enum';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

class InternetTestDto {
  @IsNumber()
  download_speed: number;
  @IsNumber()
  upload_speed: number;
}

class PastExperiencesDto {
  @IsBoolean()
  sales: boolean;
  @IsBoolean()
  support: boolean;
}

export class RequestPairWithProject {
  @IsNumber()
  @IsPositive()
  age: number;

  @IsEnum(EducationLevel)
  education_level: EducationLevel;

  @IsNotEmptyObject()
  @ValidateNested()
  past_experiences: PastExperiencesDto;

  @IsNotEmptyObject()
  @ValidateNested()
  internet_test: InternetTestDto;

  @IsNumber()
  @Min(0)
  @Max(1)
  writing_score: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  referral_code: string;
}
