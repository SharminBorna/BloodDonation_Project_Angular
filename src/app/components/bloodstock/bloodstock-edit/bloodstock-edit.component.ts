import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BloodGroup } from '../../../models/blood-group';
import { BloodStock } from '../../../models/blood-stock';
import { Profile } from '../../../models/profile';
import { BloodGroupService } from '../../../services/blood-group.service';
import { BloodStockService } from '../../../services/blood-stock.service';
import { NotifyService } from '../../../services/notify.service';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-bloodstock-edit',
  templateUrl: './bloodstock-edit.component.html',
  styleUrls: ['./bloodstock-edit.component.css']
})
export class BloodstockEditComponent implements OnInit {

  bloodStocks: BloodStock = new BloodStock();

  stockForm: FormGroup = new FormGroup({
    bloodGroupID: new FormControl('', Validators.required),
    bagNumber: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    entryDate: new FormControl(undefined, Validators.required),
    expiredDate: new FormControl(undefined, Validators.required),
    selfNumber: new FormControl('', [Validators.required]),
    profileId: new FormControl('', Validators.required)
  });
  bloodGroups: BloodGroup[] = [];
  profiles: Profile[] = [];
  get f() {
    return this.stockForm.controls;
  }

  update(): void {
    if (this.stockForm.invalid) return;
    this.bloodStocks.bloodGroupID = this.f.bloodGroupID.value
    this.bloodStocks.bagNumber = this.f.bagNumber.value
    this.bloodStocks.entryDate = this.f.entryDate.value
    this.bloodStocks.entryDate = new Date(<string>this.datePipe.transform(this.bloodStocks.entryDate, "yyyy-MM-dd"));
    this.bloodStocks.expiredDate = this.f.expiredDate.value
    //var abc = new Date().setMonth(this.bloodStocks.entryDate.getMonth() + 3);
    //this.bloodStocks.expiredDate = new Date(abc);
    this.bloodStocks.expiredDate = new Date(<string>this.datePipe.transform(this.bloodStocks.expiredDate, "yyyy-MM-dd"));
    this.bloodStocks.selfNumber = this.f.selfNumber.value
    this.bloodStocks.profileId = this.f.profileId.value

    this.stockSvc.updateStock(this.bloodStocks)
      .subscribe(r => {
        this.notifySvc.success("Data Updated Successfully!!", "DISMISS");
        this.stockForm.reset({});
        console.log(r);
      }, err => {
        this.notifySvc.fail("Failed to Update Data!!", "DISMISS");
      })
  }

  constructor(
    private stockSvc: BloodStockService,
    private profileSvc: ProfileService,
    private notifySvc: NotifyService,
    private groupSvc: BloodGroupService,
    private datePipe: DatePipe,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let id: number = this.activatedRoute.snapshot.params.id;
    this.stockSvc.getStockById(id)
      .subscribe(x => {
        this.bloodStocks = x;
        this.stockForm.patchValue(this.bloodStocks);
      }, err => {
        this.notifySvc.fail("Failed to load stock data", "DISMISS");
      })
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
