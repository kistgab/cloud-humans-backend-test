import {
  ProInternetTest,
  ProPastExperiences,
} from '@/domain/pro/entity/pro-attributes';
import { EducationLevel } from '@/domain/pro/enums/education-levels.enum';

export class ProEntity {
  private readonly MINIMUM_AGE = 18;
  private readonly HIGH_SCHOOL_POINTS = 1;
  private readonly BACHELORS_OR_HIGHER_POINTS = 2;
  private readonly NO_EDUCATION_POINTS = 0;
  private readonly PAST_EXPERIENCE_SUPPORT_POINTS = 3;
  private readonly NO_PAST_EXPERIENCE_POINTS = 0;
  private readonly PAST_EXPERIENCE_SALES_POINTS = 5;
  private readonly GOOD_INTERNET_SPEED_POINTS = 1;
  private readonly NORMAL_ITERNET_SPEED_POINTS = 0;
  private readonly GOOD_INTERNET_SPEED = 50;
  private readonly BAD_INTERNET_SPEED = 5;
  private readonly BAD_INTERNET_SPEED_POINTS = -1;
  private readonly BAD_WRITING_SCORE_POINTS = -1;
  private readonly MINIMUM_OK_WRITING_SCORE = 0.3;
  private readonly MAXIMUM_OK_WRITING_SCORE = 0.7;
  private readonly OK_WRITING_SCORE_POINTS = 1;
  private readonly GOOD_WRITING_SCORE_POINTS = 2;

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
    totalScore += this.calculatePastExperiencesScore();
    totalScore += this.calculateInternetScore();
    totalScore += this.calculateWritingScore();
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

  private calculatePastExperiencesScore(): number {
    let totalPastExperiencePoints = this.NO_PAST_EXPERIENCE_POINTS;
    if (this._pastExperiences.support) {
      totalPastExperiencePoints += this.PAST_EXPERIENCE_SUPPORT_POINTS;
    }
    if (this._pastExperiences.sales) {
      totalPastExperiencePoints += this.PAST_EXPERIENCE_SALES_POINTS;
    }
    return totalPastExperiencePoints;
  }

  private calculateInternetScore(): number {
    const totalInternetPoints =
      this.calculateUploadSpeedScore() + this.calculateDownloadSpeedScore();
    return totalInternetPoints;
  }

  private calculateDownloadSpeedScore(): number {
    if (this._internetTest.downloadSpeed > this.GOOD_INTERNET_SPEED) {
      return this.GOOD_INTERNET_SPEED_POINTS;
    }
    if (this._internetTest.downloadSpeed < this.BAD_INTERNET_SPEED) {
      return this.BAD_INTERNET_SPEED_POINTS;
    }
    return this.NORMAL_ITERNET_SPEED_POINTS;
  }

  private calculateUploadSpeedScore(): number {
    if (this._internetTest.uploadSpeed > this.GOOD_INTERNET_SPEED) {
      return this.GOOD_INTERNET_SPEED_POINTS;
    }
    if (this._internetTest.uploadSpeed < this.BAD_INTERNET_SPEED) {
      return this.BAD_INTERNET_SPEED_POINTS;
    }
    return this.NORMAL_ITERNET_SPEED_POINTS;
  }

  private calculateWritingScore(): number {
    if (this._writingScore > this.MAXIMUM_OK_WRITING_SCORE) {
      return this.GOOD_WRITING_SCORE_POINTS;
    }
    if (
      this._writingScore >= this.MINIMUM_OK_WRITING_SCORE &&
      this._writingScore <= this.MAXIMUM_OK_WRITING_SCORE
    ) {
      return this.OK_WRITING_SCORE_POINTS;
    }
    return this.BAD_WRITING_SCORE_POINTS;
  }
}
