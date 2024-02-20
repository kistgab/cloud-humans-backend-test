import { ProEntity } from '@/domain/entities/pro/pro.entity';
import { EducationLevel } from '@/domain/enums/education-levels.enum';

function createSut(customProps?: Partial<ProEntity>) {
  return new ProEntity(
    customProps?.age || 25,
    customProps?.educationLevel || EducationLevel.NoEducation,
    customProps?.pastExperiences || { sales: false, support: false },
    customProps?.internetTest || { downloadSpeed: 100, uploadSpeed: 100 },
    customProps?.writingScore || 1,
    customProps?.referralCode || 'referral-code',
  );
}

describe('Pro Entity', () => {
  describe('calculateScore', () => {
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

      expect(result).toBe(1);
    });

    it('should add two points if Pro has the bachelors degree or higher EducationLevel', () => {
      const bachelorsPro = createSut({
        educationLevel: EducationLevel.BachelorsDegreeOrHigher,
      });

      const result = bachelorsPro.calculateScore();

      expect(result).toBe(2);
    });

    it('should add no points if Pro has no education', () => {
      const bachelorsPro = createSut({
        educationLevel: EducationLevel.NoEducation,
      });

      const result = bachelorsPro.calculateScore();

      expect(result).toBe(0);
    });

    it('should add 3 points if Pro has past experiences with support', () => {
      const bachelorsPro = createSut({
        pastExperiences: { sales: false, support: true },
      });

      const result = bachelorsPro.calculateScore();

      expect(result).toBe(3);
    });

    it('should add no points if Pro has no past experiences', () => {
      const bachelorsPro = createSut({
        pastExperiences: { sales: false, support: false },
      });

      const result = bachelorsPro.calculateScore();

      expect(result).toBe(0);
    });

    it('should add 5 points if Pro has past experiences with Sales', () => {
      const bachelorsPro = createSut({
        pastExperiences: { sales: true, support: false },
      });

      const result = bachelorsPro.calculateScore();

      expect(result).toBe(5);
    });

    it('should add 8 points if Pro has past experiences with both Sales and Support', () => {
      const bachelorsPro = createSut({
        pastExperiences: { sales: true, support: true },
      });

      const result = bachelorsPro.calculateScore();

      expect(result).toBe(8);
    });
  });
});
