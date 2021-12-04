import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BloodGroup } from '../../../models/blood-group';
import { BloodStock } from '../../../models/blood-stock';
import { Profile } from '../../../models/profile';
import { BloodGroupService } from '../../../services/blood-group.service';
import { BloodStockService } from '../../../services/blood-stock.service';
import { NotifyService } from '../../../services/notify.service';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-bloodstock-create',
  templateUrl: './bloodstock-create.component.html',
  styleUrls: ['./bloodstock-create.component.css']
})
export class BloodstockCreateComponent implements OnInit {

  bloodStocks: BloodStock = new BloodStock();

  stockForm: FormGroup = new FormGroup({
    bloodGroupID: new FormControl('', Validators.required),
    bagNumber: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    entryDate: new FormControl(undefined, Validators.required),
    //expiredDate: new FormControl(undefined, Validators.required),
    selfNumber: new FormControl('', [Validators.required]),
    profileId: new FormControl('', Validators.required)
  });
  bloodGroups: BloodGroup[] = [];
  profiles: Profile[] = [];
  get f() {
    return this.stockForm.controls;
  }

  insert(): void {
    if (this.stockForm.invalid) return;

    Object.assign(this.bloodStocks, this.stockForm.value);
    this.bloodStocks.bloodGroupID = this.f.bloodGroupID.value
    this.bloodStocks.bagNumber = this.f.bagNumber.value
    this.bloodStocks.entryDate = this.f.entryDate.value
    this.bloodStocks.entryDate = new Date(<string>this.datePipe.transform(this.bloodStocks.entryDate, "yyyy-MM-dd"));
    // this.bloodStocks.expiredDate = this.f.expiredDate.value
    var abc = new Date().setMonth(this.bloodStocks.entryDate.getMonth()+3);
    this.bloodStocks.expiredDate = new Date(abc);
    this.bloodStocks.expiredDate = new Date(<string>this.datePipe.transform(this.bloodStocks.expiredDate, "yyyy-MM-dd"));
    this.bloodStocks.selfNumber = this.f.selfNumber.value
    this.bloodStocks.profileId = this.f.profileId.value

    console.log(this.bloodStocks);

    this.stockSvc.insertStock(this.bloodStocks)
      .subscribe(r => {
        this.notifySvc.success("Data Inserted Successfully!!", "DISMISS");
        this.stockForm.reset({});
        console.log(r);
      }, err => {
        this.notifySvc.fail("Failed to Save Data!!", "DISMISS");
      })
  }

  constructor(
    private stockSvc: BloodStockService,
    private profileSvc: ProfileService,
    private notifySvc: NotifyService,
    private groupSvc: BloodGroupService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.groupSvc.getBloodGroups()
      .subscribe(b => {
        this.bloodGroups = b;
      }, err => {
        this.notifySvc.fail("Failed to load bloodGroup!", "DISMISS");
      })
    this.profileSvc.getProfiles()
      .subscribe(p => {
        this.profiles = p;
      }, err => {
        this.notifySvc.fail("Failed to load profile!", "DISMISS");
      })
  }
}
