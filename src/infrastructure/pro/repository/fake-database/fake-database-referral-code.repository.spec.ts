import { FakeDatabaseReferralCodeRepository } from '@/infrastructure/pro/repository/fake-database/fake-database-referral-code.repository';

describe('FakeDatabaseReferralCode Repository', () => {
  it('should return true if referralCode is valid', async () => {
    const sut = new FakeDatabaseReferralCodeRepository();

    const result = await sut.isValidReferralCode('token1234');

    expect(result).toBeTruthy();
  });

  it('should return false if referralCode is invalid', async () => {
    const sut = new FakeDatabaseReferralCodeRepository();

    const result = await sut.isValidReferralCode('invalid_token');

    expect(result).toBeFalsy();
  });
});
