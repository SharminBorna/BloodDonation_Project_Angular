import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
import { ConfirmDeleteDialogComponent } from '../../dialog/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-donateblood-view',
  templateUrl: './donateblood-view.component.html',
  styleUrls: ['./donateblood-view.component.css']
})
export class DonatebloodViewComponent implements OnInit {

  donateBlood: DonateBlood[] = [];
  bloodRequest: BloodRequest[] = [];
  profiles: Profile[] = [];
  locations: Location[] = [];
  hospitals: Hospital[] = [];

  dataSource: MatTableDataSource<DonateBlood> = new MatTableDataSource(this.donateBlood);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["lastDonationDate", "patient","donor","location","hospital", "quantity", "actions"];

  constructor(
    private donateSvc: DonateBloodService,
    private requestSvc: BloodRequestService,
    private notifySvc: NotifyService,
    private dialog: MatDialog,
    private profileSvc: ProfileService,
    private locationSvc: LocationService,
    private hospitalSvc: HospitalService

  ) { }

  getBloodRequest(id: number) {
    let b = this.bloodRequest.find(b => b.bloodRequestID == id);
    return b ? b.patientName : '';
  }
  getProfile(id: number) {
    let p = this.profiles.find(p => p.profileID == id);
    return p ? p.firstName : '';
  }
  getLocation(id: number) {
    let l = this.locations.find(l => l.locationID == id);
    return l ? l.locationName : '';
  }
  getHospital(id: number) {
    let h = this.hospitals.find(h => h.hospitalID == id);
    return h ? h.hospitalName : '';
  }

  ngOnInit(): void {

    this.donateSvc.getDonateBlood().subscribe(x => {
      this.donateBlood = x;
      console.log(x);
      this.dataSource.data = this.donateBlood;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      this.notifySvc.fail("Fail to load donate blood data", "DISMISS");
    });

    this.requestSvc.getRequest().
      subscribe(x => {
        this.bloodRequest = x;
      }, err => {
        this.notifySvc.fail("Fail to load patient name", "DISMISS");
      });
    this.locationSvc.getLocations().
      subscribe(x => {
        this.locations = x;
      }, err => {
        this.notifySvc.fail("Fail to load location data", "DISMISS");
      });
    this.hospitalSvc.getHospitals().
      subscribe(x => {
        this.hospitals = x;
      }, err => {
        this.notifySvc.fail("Fail to load hospital data", "DISMISS");
      });
    this.profileSvc.getProfiles().
      subscribe(x => {
        this.profiles = x;
      }, err => {
        this.notifySvc.fail("Fail to load donor name", "DISMISS");
      });
  }

  confirmDelete(item: DonateBlood) {
    this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '450px'
    }).afterClosed().subscribe(r => {
      if (r) this.donateSvc.deleteDonateBlood(Number(item.donateBloodID))
        .subscribe(x => {
          this.notifySvc.success("Data Deleted Successfully!!", "DISMISS");
          this.dataSource.data = this.dataSource.data.filter(b => b.donateBloodID != x.donateBloodID);
        }, err => {
          this.notifySvc.fail("Failed to Delete Data!!", "DISMISS");
        });
    })
  }

}
