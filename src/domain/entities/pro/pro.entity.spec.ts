import { ProEntity } from '@/domain/entities/pro/pro.entity';
import { EducationLevel } from '@/domain/enums/education-levels.enum';

function createSut(customProps?: Partial<ProEntity>) {
  return new ProEntity(
    customProps?.age || 25,
    customProps?.educationLevel || EducationLevel.BachelorsDegreeOrHigher,
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

    it('should return add one point if Pro has the high school EducationLevel', () => {
      const highSchoolPro = createSut({
        educationLevel: EducationLevel.HighSchool,
      });

      const result = highSchoolPro.calculateScore();

      expect(result).toBe(1);
    });

    it('should return add two points if Pro has the bachelors degree or higher EducationLevel', () => {
      const bachelorsPro = createSut({
        educationLevel: EducationLevel.BachelorsDegreeOrHigher,
      });

      const result = bachelorsPro.calculateScore();

      expect(result).toBe(2);
    });
  });
});
