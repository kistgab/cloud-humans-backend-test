import {
  ProInternetTest,
  ProPastExperiences,
} from '@/domain/entities/pro/pro-attributes';
import { EducationLevel } from '@/domain/enums/education-levels.enum';

export class ProEntity {
  private readonly MINIMUM_AGE = 18;
  private readonly HIGH_SCHOOL_POINTS = 1;
  private readonly BACHELORS_OR_HIGHER_POINTS = 2;
  private readonly NO_EDUCATION_POINTS = 0;

  constructor(
    private readonly _age: number,
    private readonly _educationLevel: EducationLevel,
    private readonly _pastExperiences: ProPastExperiences,
    private readonly _internetTest: ProInternetTest,
    private readonly _writingScore: number,
    private readonly _referralCode?: string,
  ) {}

  get age(): number {
    return this._age;
  }

  get educationLevel(): EducationLevel {
    return this._educationLevel;
  }

  get pastExperiences(): ProPastExperiences {
    return this.pastExperiences;
  }

  get internetTest(): ProInternetTest {
    return this._internetTest;
  }

  get writingScore(): number {
    return this._writingScore;
  }

  get referralCode(): string | undefined {
    return this._referralCode;
  }

  calculateScore(): number {
    let totalScore = 0;
    if (this.isUnderAge()) {
      return totalScore;
    }
    totalScore += this.calculateEducationScore();
    return totalScore;
  }

  private isUnderAge(): boolean {
    return this._age < this.MINIMUM_AGE;
  }

  private calculateEducationScore() {
    if (this._educationLevel === EducationLevel.HighSchool) {
      return this.HIGH_SCHOOL_POINTS;
    }
    if (this._educationLevel === EducationLevel.BachelorsDegreeOrHigher) {
      return this.BACHELORS_OR_HIGHER_POINTS;
    }
    return this.NO_EDUCATION_POINTS;
  }
}
