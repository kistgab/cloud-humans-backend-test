export class FakeDatabaseReferralCodeRepository {
  private readonly VALID_REFERRAL_CODE = 'token1234';

  async isValidReferralCode(referralCode: string): Promise<boolean> {
    return referralCode === this.VALID_REFERRAL_CODE;
  }
}
