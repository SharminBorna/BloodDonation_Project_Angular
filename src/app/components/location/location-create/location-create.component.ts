import { Component, OnInit } from '@angular/core';
import { Location } from '../../../models/location';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocationService } from '../../../services/location.service';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-location-create',
  templateUrl: './location-create.component.html',
  styleUrls: ['./location-create.component.css']
})
export class LocationCreateComponent implements OnInit {

    location: Location = new Location();
    locationForm: FormGroup = new FormGroup({
        locationName: new FormControl('', Validators.required),
        cityName: new FormControl('', Validators.required)
    });
    constructor(
        private locationSvc: LocationService,
        private notifySvc: NotifyService
    ) { }

    get f() {
        return this.locationForm.controls;
    }
    insert() {
        if (this.locationForm.invalid) return;
        this.location.locationName = this.f.locationName.value;
        this.location.cityName = this.f.cityName.value;
        this.locationSvc.insertLocation(this.location).subscribe(r => {
            this.notifySvc.success("Data saved successfully!!", "DISMISS");
            this.locationForm.reset({});
        }, err => {
            this.notifySvc.fail("Fail to save data!!!", "DISMISS");
        })
    }

  ngOnInit(): void {
  }

}
