export interface IsValidReferralCodeRepository {
  isValidReferralCode(referralCode: string): Promise<boolean>;
}
