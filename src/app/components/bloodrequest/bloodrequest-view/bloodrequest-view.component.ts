import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
import { ConfirmDeleteDialogComponent } from '../../dialog/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-bloodrequest-view',
  templateUrl: './bloodrequest-view.component.html',
  styleUrls: ['./bloodrequest-view.component.css']
})
export class BloodrequestViewComponent implements OnInit {

  bloodRequest: BloodRequest[] = [];
  profile: Profile[] = [];
  bloodGroup: BloodGroup[] = [];
  location: Location[] = [];
  hospital: Hospital[] = [];
  dataSource: MatTableDataSource<BloodRequest> = new MatTableDataSource(this.bloodRequest);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["patient", "bloodGroup", "reason", "quantity", "location", "hospital", "contact", "status", "donationDate", "createdAt", "requester","donor", "actions"];

  constructor(
    private requestSvc: BloodRequestService,
    private notifySvc: NotifyService,
    private dialog: MatDialog,
    private groupSvc: BloodGroupService,
    private locationSvc: LocationService,
    private hospitalSvc: HospitalService,
    private profileSvc: ProfileService
  ) { }

  getBloodGroup(id: number) {
    let b = this.bloodGroup.find(b => b.bloodGroupID == id);
    return b ? b.groupName : '';
  }
  getLocation(id: number) {
    let l = this.location.find(l => l.locationID == id);
    return l ? l.locationName : '';
  }
  getHospital(id: number) {
    let h = this.hospital.find(h => h.hospitalID == id);
    return h ? h.hospitalName : '';
  }
  getProfile(id: number) {
    let p = this.profile.find(p => p.profileID == id);
    return p ? p.firstName : '';
  }

  ngOnInit(): void {
    this.requestSvc.getRequest().subscribe(x => {
      this.bloodRequest = x;
      console.log(x);
      this.dataSource.data = this.bloodRequest;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      this.notifySvc.fail("Fail to load blood request data", "DISMISS");
    });

    this.groupSvc.getBloodGroups().
      subscribe(x => {
        this.bloodGroup = x;
      }, err => {
        this.notifySvc.fail("Fail to load blood group data", "DISMISS");
      });
    this.locationSvc.getLocations().
      subscribe(x => {
        this.location = x;
      }, err => {
        this.notifySvc.fail("Fail to load location data", "DISMISS");
      });
    this.hospitalSvc.getHospitals().
      subscribe(x => {
        this.hospital = x;
      }, err => {
        this.notifySvc.fail("Fail to load hospital data", "DISMISS");
      });
    this.profileSvc.getProfiles().
      subscribe(x => {
        this.profile = x;
      }, err => {
        this.notifySvc.fail("Fail to load profile data", "DISMISS");
      });
  }
  confirmDelete(item: BloodRequest) {
    this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '450px'
    }).afterClosed().subscribe(r => {
      if (r) this.requestSvc.deleteRequest(Number(item.bloodRequestID))
        .subscribe(x => {
          this.notifySvc.success("Data Deleted Successfully!!", "DISMISS");
          this.dataSource.data = this.dataSource.data.filter(b => b.bloodRequestID != x.bloodRequestID);
        }, err => {
          this.notifySvc.fail("Failed to Delete Data!!", "DISMISS");
        });
    })
  }
}
