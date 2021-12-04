import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotifyService } from '../../../services/notify.service';
import { ActivatedRoute } from '@angular/router';
import { BloodGroup } from '../../../models/blood-group';
import { BloodGroupService } from '../../../services/blood-group.service';

@Component({
  selector: 'app-bloodgroup-edit',
  templateUrl: './bloodgroup-edit.component.html',
  styleUrls: ['./bloodgroup-edit.component.css']
})
export class BloodgroupEditComponent implements OnInit {

    bloodGroup: BloodGroup = new BloodGroup();
    bloodGroupForm: FormGroup = new FormGroup({
        groupName: new FormControl('', Validators.required)
    });
    constructor(
        private groupSvc: BloodGroupService,
        private notifySvc: NotifyService,
        private activatedRoute: ActivatedRoute
    ) { }

    get f() {
        return this.bloodGroupForm.controls;
    }
    update() {
        if (this.bloodGroupForm.invalid) return;
        this.bloodGroup.groupName = this.f.groupName.value;
        this.groupSvc.updateBloodGroup(this.bloodGroup).subscribe(r => {
            this.notifySvc.success("Data updated successfully!!", "DISMISS");
            this.bloodGroupForm.reset({});
        }, err => {
            this.notifySvc.fail("Fail to update data!!!", "DISMISS");
        })
    }

    ngOnInit(): void {
        let id: number = this.activatedRoute.snapshot.params.id;
        this.groupSvc.getBloodGroupById(id)
            .subscribe(x => {
                this.bloodGroup = x;
                this.bloodGroupForm.patchValue(this.bloodGroup);
            }, err => {
                    this.notifySvc.fail("Failed to load blood group data", "DISMISS");
            })
    }

}
