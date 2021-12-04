import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BloodGroup } from '../../../models/blood-group';
import { BloodRequest } from '../../../models/blood-request';
import { Hospital } from '../../../models/hospital';
import { Location } from '../../../models/location';
import { Profile } from '../../../models/profile';
import { BloodGroupService } from '../../../services/blood-group.service';
import { BloodRequestService } from '../../../services/blood-request.service';
import { HospitalService } from '../../../services/hospital.service';
import { LocationService } from '../../../services/location.service';
import { NotifyService } from '../../../services/notify.service';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-bloodrequest-create',
  templateUrl: './bloodrequest-create.component.html',
  styleUrls: ['./bloodrequest-create.component.css']
})
export class BloodrequestCreateComponent implements OnInit {

  bloodRequest: BloodRequest = new BloodRequest();
  requestForm: FormGroup = new FormGroup({
    patientName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    bloodGroupID: new FormControl('', Validators.required),
    reasonForBlood: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    quantity: new FormControl('', [Validators.required]),
    locationID: new FormControl('', Validators.required),
    hospitalID: new FormControl('', Validators.required),
    contactNo: new FormControl('', Validators.required),
    status: new FormControl('Pending', [Validators.required]),
    donationDate: new FormControl(undefined, Validators.required),
    createdAt: new FormControl(undefined, Validators.required),
    requesterProfileId: new FormControl('', Validators.required),
    donorProfileId: new FormControl('', Validators.required)
  });

  bloodGroups: BloodGroup[] = [];
  locations: Location[] = [];
  hospitals: Hospital[] = [];
  profiles: Profile[] = [];
  get f() {
    return this.requestForm.controls;
  }
  
  insert(): void {
    if (this.requestForm.invalid) return;
    console.log(this.requestForm.value);

    Object.assign(this.bloodRequest, this.requestForm.value);
    console.log(this.bloodRequest);
    this.bloodRequest.patientName = this.f.patientName.value
    this.bloodRequest.bloodGroupID = this.f.bloodGroupID.value
    this.bloodRequest.reasonForBlood = this.f.reasonForBlood.value
    this.bloodRequest.quantity = this.f.quantity.value
    this.bloodRequest.locationID = this.f.locationID.value
    this.bloodRequest.hospitalID = this.f.hospitalID.value
    this.bloodRequest.contactNo = this.f.contactNo.value
    this.bloodRequest.status = this.f.status.value
    this.bloodRequest.donationDate = this.f.donationDate.value
    this.bloodRequest.donationDate = new Date(<string>this.datePipe.transform(this.bloodRequest.donationDate, "yyyy-MM-dd"));
    this.bloodRequest.createdAt = this.f.createdAt.value
    this.bloodRequest.createdAt = new Date(<string>this.datePipe.transform(this.bloodRequest.createdAt, "yyyy-MM-dd"));
    this.bloodRequest.requesterProfileId = this.f.requesterProfileId.value
    this.bloodRequest.donorProfileId = this.f.donorProfileId.value

    this.requestSvc.insertRequest(this.bloodRequest)
      .subscribe(r => {
        this.notifySvc.success("Data Inserted Successfully!!", "DISMISS");
        this.requestForm.reset({});
        console.log(r);
      }, err => {
        this.notifySvc.fail("Failed to Save Data!!", "DISMISS");
      });
  }
 
  constructor(
    private requestSvc: BloodRequestService,
    private datePipe: DatePipe,
    private profileSvc: ProfileService,
    private notifySvc: NotifyService,
    private groupSvc: BloodGroupService,
    private locationSvc: LocationService,
    private hospitalSvc: HospitalService
  ) { }

  ngOnInit(): void {
    this.groupSvc.getBloodGroups()
      .subscribe(b => {
        this.bloodGroups = b;
      }, err => {
        this.notifySvc.fail("Failed to load bloodGroup!", "DISMISS");
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
        this.notifySvc.fail("Failed to load profile!", "DISMISS");
      })
  }

}
