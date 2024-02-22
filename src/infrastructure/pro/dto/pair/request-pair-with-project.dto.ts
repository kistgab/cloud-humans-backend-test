import { EducationLevel } from '@/domain/pro/enums/education-levels.enum';
import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ description: "The pro's age in full years" })
  age: number;

  @IsEnum(EducationLevel)
  @ApiProperty({
    description: 'The highest education level completed by the Pro',
  })
  education_level: EducationLevel;

  @IsNotEmptyObject()
  @ValidateNested()
  @ApiProperty({
    description: "Information about the Pro's past experiences",
  })
  past_experiences: PastExperiencesDto;

  @IsNotEmptyObject()
  @ValidateNested()
  @ApiProperty({
    description: "Information about the Pro's internet speed test",
  })
  internet_test: InternetTestDto;

  @IsNumber()
  @Min(0)
  @Max(1)
  @ApiProperty({
    description: "Pro's score in the writing test",
  })
  writing_score: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Should be defined if the Pro was referred by another Pro',
  })
  referral_code?: string;
}
