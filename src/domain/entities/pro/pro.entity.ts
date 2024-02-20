import {
  ProInternetTest,
  ProPastExperiences,
} from '@/domain/entities/pro/pro-attributes';
import { EducationLevel } from '@/domain/enums/education-levels.enum';

export class ProEntity {
  constructor(
    private readonly age: number,
    private readonly educationLevel: EducationLevel,
    private readonly pastExperiences: ProPastExperiences,
    private readonly internetTest: ProInternetTest,
    private readonly writingScore: number,
    private readonly referralCode?: string,
  ) {}

  calculateScore(): number {
    return 0;
  }
}
