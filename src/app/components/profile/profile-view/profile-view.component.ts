import { Component, OnInit, ViewChild } from '@angular/core';
import { Profile } from '../../../models/profile';
import { BloodGroup } from '../../../models/blood-group';
import { Location } from '../../../models/location';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ProfileService } from '../../../services/profile.service';
import { NotifyService } from '../../../services/notify.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../../dialog/confirm-delete-dialog/confirm-delete-dialog.component';
import { BloodGroupService } from '../../../services/blood-group.service';
import { LocationService } from '../../../services/location.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  profile: Profile[] = [];
  bloodGroup: BloodGroup[] = [];
  location: Location[] = [];
  dataSource: MatTableDataSource<Profile> = new MatTableDataSource(this.profile);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["picture", "username", "role", "name", "age", "weight", "gender", "bloodGroup", "contact", "email", "location", "actions"];
  constructor(
    private profileSvc: ProfileService,
    private notifySvc: NotifyService,
    private dialog: MatDialog,
    private groupSvc: BloodGroupService,
    private locationSvc: LocationService
  ) { }
  
  confirmDelete(item: Profile) {
    this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '450px'
    }).afterClosed().subscribe(r => {
      if (r) this.profileSvc.deleteProfile(Number(item.profileID))
        .subscribe(x => {
          this.notifySvc.success("Profile is Deleted From List!!", "DISMISS");
          this.dataSource.data = this.dataSource.data.filter(p => p.profileID != x.profileID);
        }, err => {
          this.notifySvc.fail("Failed to Delete Profile From List!!", "DISMISS");
        });
    })
  }
  getBloodGroup(id: number) {
    let b = this.bloodGroup.find(b => b.bloodGroupID == id);
    return b ? b.groupName : '';
  }
  getLocation(id: number) {
    let l = this.location.find(l => l.locationID == id);
    return l ? l.locationName : '';
  }
  ngOnInit(): void {
    this.getProfile();
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
  }
  getProfile() {
    this.profileSvc.getProfiles()
      .subscribe(r => {
        this.profile = r;
        console.log(r);
        this.dataSource.data = this.profile;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.notifySvc.fail("Fail to load profile data", "DISMISS");
      });
  }

}
