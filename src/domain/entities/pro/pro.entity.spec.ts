import { ProEntity } from '@/domain/entities/pro/pro.entity';
import { EducationLevel } from '@/domain/enums/education-levels.enum';

describe('Pro Entity', () => {
  describe('calculateScore', () => {
    it('should return 0 when the Pro is underage', () => {
      const underagePro = new ProEntity(
        17,
        EducationLevel.BachelorsDegreeOrHigher,
        { sales: false, support: false },
        { downloadSpeed: 100, uploadSpeed: 100 },
        1,
        'referral-code',
      );

      const result = underagePro.calculateScore();

      expect(result).toBe(0);
    });

    it('should return add one point if Pro has the high school EducationLevel', () => {
      const underagePro = new ProEntity(
        25,
        EducationLevel.HighSchool,
        { sales: false, support: false },
        { downloadSpeed: 40, uploadSpeed: 20 },
        1,
        'referral-code',
      );

      const result = underagePro.calculateScore();

      expect(result).toBe(1);
    });
  });
});
