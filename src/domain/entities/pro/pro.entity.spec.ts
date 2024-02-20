import { ProEntity } from '@/domain/entities/pro/pro.entity';
import { EducationLevel } from '@/domain/enums/education-levels.enum';

function createSut(customProps?: Partial<ProEntity>) {
  return new ProEntity(
    customProps?.age || 25,
    customProps?.educationLevel || EducationLevel.NoEducation,
    customProps?.pastExperiences || { sales: false, support: false },
    customProps?.internetTest || { downloadSpeed: 30, uploadSpeed: 30 },
    customProps?.writingScore || 0.6,
    customProps?.referralCode || 'any_referral_code',
  );
}

describe('Pro Entity', () => {
  describe('calculateScore', () => {
    const writingScorePoints = 1;
    it('should return 0 when the Pro is underage', () => {
      const underagePro = createSut({ age: 17 });

      const result = underagePro.calculateScore();

      expect(result).toBe(0);
    });

    it('should add one point if Pro has the high school EducationLevel', () => {
      const highSchoolPro = createSut({
        educationLevel: EducationLevel.HighSchool,
      });

      const result = highSchoolPro.calculateScore();

      expect(result).toBe(1 + writingScorePoints);
    });

    it('should add two points if Pro has the bachelors degree or higher EducationLevel', () => {
      const bachelorsPro = createSut({
        educationLevel: EducationLevel.BachelorsDegreeOrHigher,
      });

      const result = bachelorsPro.calculateScore();

      expect(result).toBe(2 + writingScorePoints);
    });

    it('should add no points if Pro has no education', () => {
      const noEducationPro = createSut({
        educationLevel: EducationLevel.NoEducation,
      });

      const result = noEducationPro.calculateScore();

      expect(result).toBe(0 + writingScorePoints);
    });

    it('should add 3 points if Pro has past experiences with support', () => {
      const experiencedSupportPro = createSut({
        pastExperiences: { sales: false, support: true },
      });

      const result = experiencedSupportPro.calculateScore();

      expect(result).toBe(3 + writingScorePoints);
    });

    it('should add no points if Pro has no past experiences', () => {
      const noExperiencedPro = createSut({
        pastExperiences: { sales: false, support: false },
      });

      const result = noExperiencedPro.calculateScore();

      expect(result).toBe(0 + writingScorePoints);
    });

    it('should add 5 points if Pro has past experiences with Sales', () => {
      const experiencedSalesPro = createSut({
        pastExperiences: { sales: true, support: false },
      });

      const result = experiencedSalesPro.calculateScore();

      expect(result).toBe(5 + writingScorePoints);
    });

    it('should add 8 points if Pro has past experiences with both Sales and Support', () => {
      const bothExperiencedPro = createSut({
        pastExperiences: { sales: true, support: true },
      });

      const result = bothExperiencedPro.calculateScore();

      expect(result).toBe(8 + writingScorePoints);
    });

    it('should add no points if the pro internet is ok', () => {
      const pro = createSut({
        internetTest: { downloadSpeed: 30, uploadSpeed: 30 },
      });

      const result = pro.calculateScore();

      expect(result).toBe(0 + writingScorePoints);
    });

    it('should add 1 point if the downloadSpeed is good', () => {
      const pro = createSut({
        internetTest: { downloadSpeed: 100, uploadSpeed: 30 },
      });

      const result = pro.calculateScore();

      expect(result).toBe(1 + writingScorePoints);
    });

    it('should add 2 points if both downloadSpeed and uploadSpeed are good', () => {
      const pro = createSut({
        internetTest: { downloadSpeed: 100, uploadSpeed: 100 },
      });

      const result = pro.calculateScore();

      expect(result).toBe(2 + writingScorePoints);
    });

    it('should add 1 point if only uploadSpeed is good', () => {
      const pro = createSut({
        internetTest: { downloadSpeed: 10, uploadSpeed: 100 },
      });

      const result = pro.calculateScore();

      expect(result).toBe(1 + writingScorePoints);
    });

    it('should deduct a point if only uploadSpeed is bad', () => {
      const pro = createSut({
        internetTest: { downloadSpeed: 10, uploadSpeed: 1 },
      });

      const result = pro.calculateScore();

      expect(result).toBe(-1 + writingScorePoints);
    });

    it('should deduct a point if only downloadSpeed is bad', () => {
      const pro = createSut({
        internetTest: { downloadSpeed: 3, uploadSpeed: 50 },
      });

      const result = pro.calculateScore();

      expect(result).toBe(-1 + writingScorePoints);
    });

    it('should deduct 2 points if both downloadSpeed and uploadSpeed are bad', () => {
      const pro = createSut({
        internetTest: { downloadSpeed: 3, uploadSpeed: 2 },
      });

      const result = pro.calculateScore();

      expect(result).toBe(-2 + writingScorePoints);
    });

    it('should deduct a point if writingScore is low', () => {
      const pro = createSut({
        writingScore: 0.2,
      });

      const result = pro.calculateScore();

      expect(result).toBe(-1);
    });

    it('should add a point if writingScore is ok (0.7)', () => {
      const pro = createSut({
        writingScore: 0.7,
      });

      const result = pro.calculateScore();

      expect(result).toBe(1);
    });

    it('should add a point if writingScore is ok (0.3)', () => {
      const pro = createSut({
        writingScore: 0.3,
      });

      const result = pro.calculateScore();

      expect(result).toBe(1);
    });

    it('should add a point if writingScore is great', () => {
      const pro = createSut({
        writingScore: 0.8,
      });

      const result = pro.calculateScore();

      expect(result).toBe(2);
    });

    it('should add a point if referralCode is valid', () => {
      const pro = createSut({
        referralCode: 'token1234',
      });

      const result = pro.calculateScore();

      expect(result).toBe(1 + writingScorePoints);
    });

    it('should add no points if referralCode is valid', () => {
      const pro = createSut({
        referralCode: 'invalid-referral-code',
      });

      const result = pro.calculateScore();

      expect(result).toBe(0 + writingScorePoints);
    });
  });
});
