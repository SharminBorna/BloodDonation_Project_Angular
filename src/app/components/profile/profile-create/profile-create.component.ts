import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BloodGroup } from '../../../models/blood-group';
import { Location } from '../../../models/location';
import { Profile } from '../../../models/profile';
import { BloodGroupService } from '../../../services/blood-group.service';
import { LocationService } from '../../../services/location.service';
import { NotifyService } from '../../../services/notify.service';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-profile-create',
  templateUrl: './profile-create.component.html',
  styleUrls: ['./profile-create.component.css']
})
export class ProfileCreateComponent implements OnInit {

  picFile!: File;
  profile: Profile = new Profile();
  profileForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(6)]),
    role: new FormControl('Donor', [Validators.required]),
    firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    age: new FormControl('', [Validators.required]),
    weight: new FormControl('', [Validators.required]),
    gender: new FormControl('Male', Validators.required),
    bloodGroupID: new FormControl('', Validators.required),
    contactNo: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    locationID: new FormControl('', Validators.required),
    picture: new FormControl(undefined, Validators.required)
  });
  bloodGroups: BloodGroup[] = [];
  locations: Location[] = [];
  get f() {
    return this.profileForm.controls;
  }
  onChange(event: any) {
    this.picFile = event.target.files[0];
  }
  insert(): void {
    if (this.profileForm.invalid) return;
    console.log(this.profileForm.value);

    Object.assign(this.profile, this.profileForm.value);
    console.log(this.profile);
    this.profile.picture = 'no-pic.jpg';
    this.profile.username = this.f.username.value
    this.profile.password = this.f.password.value
    this.profile.role = this.f.role.value
    this.profile.firstName = this.f.firstName.value
    this.profile.lastName = this.f.lastName.value
    this.profile.age = this.f.age.value
    this.profile.weight = this.f.weight.value
    this.profile.gender = this.f.gender.value
    this.profile.bloodGroupID = this.f.bloodGroupID.value
    this.profile.contactNo = this.f.contactNo.value
    this.profile.email = this.f.email.value
    this.profile.locationID = this.f.locationID.value

    this.profileSvc.insertProfile(this.profile)
      .subscribe(p => {
        this.upload(Number(p.profileID));
      }, err => {
        this.notifySvc.fail("Failed to save data!!", "DISMISS");
      });
  }
  upload(id: number) {
    let reader = new FileReader();
    reader.addEventListener("load", (event: any) => {
      this.profileSvc.upload(id, this.picFile)
        .subscribe(r => {
          this.profile.picture = r.imagePath;
          this.notifySvc.success("Data save successfully!!", "DISMISS");
          this.profileForm.reset({});
        }, err => {
          this.notifySvc.fail("Failed to upload image!!", "DISMISS");
        })
    })
    reader.readAsDataURL(this.picFile);
  }
  constructor(
    private profileSvc: ProfileService,
    private notifySvc: NotifyService,
    private groupSvc: BloodGroupService,
    private locationSvc: LocationService
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
  }

}
