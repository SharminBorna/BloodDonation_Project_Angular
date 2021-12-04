export class BloodRequest {
  constructor(
    public bloodRequestID?: number,
    public patientName?: string,
    public bloodGroupID?: number,
    public reasonForBlood?: string,
    public quantity?: number,
    public locationID?: number,
    public hospitalID?: number,
    public contactNo?: string,
    public status?: string,
    public donationDate?: Date,
    public createdAt?: Date,
    public requesterProfileId?: number,
    public donorProfileId?: number
  ) { }
}
