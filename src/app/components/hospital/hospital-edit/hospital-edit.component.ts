import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../../models/hospital';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HospitalService } from '../../../services/hospital.service';
import { NotifyService } from '../../../services/notify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hospital-edit',
  templateUrl: './hospital-edit.component.html',
  styleUrls: ['./hospital-edit.component.css']
})
export class HospitalEditComponent implements OnInit {

  hospital: Hospital = new Hospital();

    hospitalForm: FormGroup = new FormGroup({
        hospitalName: new FormControl('', Validators.required),
        hospitalAddress: new FormControl('', Validators.required),
        contactNo: new FormControl('', Validators.required)
    });
    constructor(
        private hospitalSvc: HospitalService,
        private notifySvc: NotifyService,
        private activatedRoute: ActivatedRoute
    ) { }

    get f() {
        return this.hospitalForm.controls;
    }
    update() {
        if (this.hospitalForm.invalid) return;
        this.hospital.hospitalName = this.f.hospitalName.value;
        this.hospital.hospitalAddress = this.f.hospitalAddress.value;
        this.hospital.contactNo = this.f.contactNo.value;
        this.hospitalSvc.updateHospital(this.hospital).subscribe(r => {
            this.notifySvc.success("Data updated successfully!!", "DISMISS");
            this.hospitalForm.reset({});
        }, err => {
            this.notifySvc.fail("Fail to update data!!!", "DISMISS");
        })
    }

    ngOnInit(): void {
        let id: number = this.activatedRoute.snapshot.params.id;
        this.hospitalSvc.getHospitalById(id)
            .subscribe(x => {
                this.hospital = x;
                this.hospitalForm.patchValue(this.hospital);
            }, err => {
                this.notifySvc.fail("Failed to load hospital data","DISMISS");
            })
    }

}
