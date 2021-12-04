export class BloodStock {
  constructor(
    public bloodStockID?: number,
    public bloodGroupID?: number,
    public bagNumber?: string,
    public entryDate?: Date,
    public expiredDate?: Date,
    public selfNumber?: number,
    public profileId?: number
  ) { }
}
