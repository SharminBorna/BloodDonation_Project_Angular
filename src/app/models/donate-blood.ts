export class DonateBlood {
  constructor(
    public donateBloodID?: number,
    public lastDonationDate?: Date,
    public bloodRequestID?: number,
    public profileID?: number,
    public locationID?: number,
    public hospitalID?: number,
    public quantity?: number
  ) { }
}
