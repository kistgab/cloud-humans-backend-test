import {
  ProInternetTest,
  ProPastExperiences,
} from '@/domain/entities/pro/pro-attributes';
import { EducationLevel } from '@/domain/enums/education-levels.enum';

export class ProEntity {
  private readonly MINIMUM_AGE = 18;
  private readonly HIGH_SCHOOL_POINTS = 1;

  constructor(
    private readonly age: number,
    private readonly educationLevel: EducationLevel,
    private readonly pastExperiences: ProPastExperiences,
    private readonly internetTest: ProInternetTest,
    private readonly writingScore: number,
    private readonly referralCode?: string,
  ) {}

  calculateScore(): number {
    let totalScore = 0;
    if (this.isUnderAge()) {
      return totalScore;
    }
    totalScore += this.calculateEducationScore();
    return totalScore;
  }

  private isUnderAge(): boolean {
    return this.age < this.MINIMUM_AGE;
  }

  private calculateEducationScore() {
    if (this.educationLevel === EducationLevel.HighSchool) {
      return this.HIGH_SCHOOL_POINTS;
    }
    return 2;
  }
}
