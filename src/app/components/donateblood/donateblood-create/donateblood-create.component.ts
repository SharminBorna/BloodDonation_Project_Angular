import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BloodRequest } from '../../../models/blood-request';
import { DonateBlood } from '../../../models/donate-blood';
import { Hospital } from '../../../models/hospital';
import { Location } from '../../../models/location';
import { Profile } from '../../../models/profile';
import { BloodRequestService } from '../../../services/blood-request.service';
import { DonateBloodService } from '../../../services/donate-blood.service';
import { HospitalService } from '../../../services/hospital.service';
import { LocationService } from '../../../services/location.service';
import { NotifyService } from '../../../services/notify.service';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-donateblood-create',
  templateUrl: './donateblood-create.component.html',
  styleUrls: ['./donateblood-create.component.css']
})
export class DonatebloodCreateComponent implements OnInit {

  donateBlood: DonateBlood = new DonateBlood();

  donateForm: FormGroup = new FormGroup({
    lastDonationDate: new FormControl(undefined, Validators.required),
    bloodRequestID: new FormControl('', Validators.required),
    profileID: new FormControl('', Validators.required),
    locationID: new FormControl('', Validators.required),
    hospitalID: new FormControl('', Validators.required),
    quantity: new FormControl('', [Validators.required])
  });
  bloodRequest: BloodRequest[] = [];
  profiles: Profile[] = [];
  locations: Location[] = [];
  hospitals: Hospital[] = [];

  get f() {
    return this.donateForm.controls;
  }

  insert(): void {
    if (this.donateForm.invalid) return;
    console.log(this.donateForm.value);

    Object.assign(this.donateBlood, this.donateForm.value);
    console.log(this.donateBlood);
    this.donateBlood.lastDonationDate = this.f.lastDonationDate.value
    this.donateBlood.lastDonationDate = new Date(<string>this.datePipe.transform(this.donateBlood.lastDonationDate, "yyyy-MM-dd"));
    this.donateBlood.bloodRequestID = this.f.bloodRequestID.value
    this.donateBlood.profileID = this.f.profileID.value
    this.donateBlood.locationID = this.f.locationID.value
    this.donateBlood.hospitalID = this.f.hospitalID.value
    this.donateBlood.quantity = this.f.quantity.value

    this.donateSvc.insertDonateBlood(this.donateBlood)
      .subscribe(r => {
        this.notifySvc.success("Data Inserted Successfully!!", "DISMISS");
        this.donateForm.reset({});
        console.log(r);
      }, err => {
        this.notifySvc.fail("Failed to Save Data!!", "DISMISS");
      })
  }

  constructor(
    private donateSvc: DonateBloodService,
    private notifySvc: NotifyService,
    private requestSvc: BloodRequestService,
    private datePipe: DatePipe,
    private profileSvc: ProfileService,
    private locationSvc: LocationService,
    private hospitalSvc: HospitalService
  ) { }

  ngOnInit(): void {
    this.requestSvc.getRequest()
      .subscribe(r => {
        this.bloodRequest = r;
      }, err => {
        this.notifySvc.fail("Failed to load patient name!", "DISMISS");
      })
    this.locationSvc.getLocations()
      .subscribe(l => {
        this.locations = l;
      }, err => {
        this.notifySvc.fail("Failed to load location!", "DISMISS");
      })
    this.hospitalSvc.getHospitals()
      .subscribe(h => {
        this.hospitals = h;
      }, err => {
        this.notifySvc.fail("Failed to load hospital!", "DISMISS");
      })
    this.profileSvc.getProfiles()
      .subscribe(p => {
        this.profiles = p;
      }, err => {
        this.notifySvc.fail("Failed to load donor name!", "DISMISS");
      })
  }
}
