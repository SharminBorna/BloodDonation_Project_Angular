import { Component, OnInit } from '@angular/core';
import { Location } from '../../../models/location';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotifyService } from '../../../services/notify.service';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from '../../../services/location.service';

@Component({
  selector: 'app-location-edit',
  templateUrl: './location-edit.component.html',
  styleUrls: ['./location-edit.component.css']
})
export class LocationEditComponent implements OnInit {

    location: Location = new Location();
    locationForm: FormGroup = new FormGroup({
        locationName: new FormControl('', Validators.required),
        cityName: new FormControl('', Validators.required)
    });
    constructor(
        private locationSvc: LocationService,
        private notifySvc: NotifyService,
        private activatedRoute: ActivatedRoute
    ) { }

    get f() {
        return this.locationForm.controls;
    }
    update() {
        if (this.locationForm.invalid) return;
        this.location.locationName = this.f.locationName.value;
        this.location.cityName = this.f.cityName.value;
        this.locationSvc.updateLocation(this.location).subscribe(r => {
            this.notifySvc.success("Data updated successfully!!", "DISMISS");
            this.locationForm.reset({});
        }, err => {
            this.notifySvc.fail("Fail to update data!!!", "DISMISS");
        })
    }

    ngOnInit(): void {
        let id: number = this.activatedRoute.snapshot.params.id;
        this.locationSvc.getLocationById(id)
            .subscribe(x => {
                this.location = x;
                this.locationForm.patchValue(this.location);
            }, err => {
                this.notifySvc.fail("Failed to load location data", "DISMISS");
            })
    }

}
