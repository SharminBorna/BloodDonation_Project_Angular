import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../../models/hospital';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HospitalService } from '../../../services/hospital.service';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-hospital-create',
  templateUrl: './hospital-create.component.html',
  styleUrls: ['./hospital-create.component.css']
})
export class HospitalCreateComponent implements OnInit {
    hospital: Hospital = new Hospital();
    hospitalForm: FormGroup = new FormGroup({
        hospitalName: new FormControl('', Validators.required),
        hospitalAddress: new FormControl('', Validators.required),
        contactNo: new FormControl('', Validators.required)
    });
    constructor(
        private hospitalSvc: HospitalService,
        private notifySvc: NotifyService
    ) { }

    get f() {
        return this.hospitalForm.controls;
    }
    insert() {
        if (this.hospitalForm.invalid) return;
        this.hospital.hospitalName = this.f.hospitalName.value;
        this.hospital.hospitalAddress = this.f.hospitalAddress.value;
        this.hospital.contactNo = this.f.contactNo.value;
        this.hospitalSvc.insertHospital(this.hospital).subscribe(r => {
            this.notifySvc.success("Data saved successfully!!", "DISMISS");
            this.hospitalForm.reset({});
        }, err => {
            this.notifySvc.fail("Fail to save data!!!", "DISMISS");
        })
    }

  ngOnInit(): void {
  }

}
