import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BloodGroup } from '../../../models/blood-group';
import { BloodStock } from '../../../models/blood-stock';
import { Profile } from '../../../models/profile';
import { BloodGroupService } from '../../../services/blood-group.service';
import { BloodStockService } from '../../../services/blood-stock.service';
import { NotifyService } from '../../../services/notify.service';
import { ProfileService } from '../../../services/profile.service';
import { ConfirmDeleteDialogComponent } from '../../dialog/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-bloodstock-view',
  templateUrl: './bloodstock-view.component.html',
  styleUrls: ['./bloodstock-view.component.css']
})
export class BloodstockViewComponent implements OnInit {

  bloodStocks: BloodStock[] = [];
  bloodGroups: BloodGroup[] = [];
  profiles: Profile[] = [];

  dataSource: MatTableDataSource<BloodStock> = new MatTableDataSource(this.bloodStocks);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["bloodGroup", "bagNumber", "entryDate", "expiredDate", "selfNumber","donor", "actions"];

  constructor(
    private stockSvc: BloodStockService,
    private groupSvc: BloodGroupService,
    private profileSvc: ProfileService,
    private notifySvc: NotifyService,
    private dialog: MatDialog
  ) { }

  getBloodGroup(id: number) {
    let b = this.bloodGroups.find(b => b.bloodGroupID == id);
    return b ? b.groupName : '';
  }
  getDonor(id: number) {
    let b = this.profiles.find(b => b.profileID == id);
    return b ? b.firstName : '';
  }

  ngOnInit(): void {

    this.stockSvc.getStock().subscribe(x => {
      this.bloodStocks = x;
      console.log(x);
      this.dataSource.data = this.bloodStocks;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      this.notifySvc.fail("Fail to load stock data", "DISMISS");
    });

    this.groupSvc.getBloodGroups().
      subscribe(x => {
        this.bloodGroups = x;
      }, err => {
        this.notifySvc.fail("Fail to load blood group", "DISMISS");
      });

    this.profileSvc.getProfiles().
      subscribe(x => {
        this.profiles = x;
      }, err => {
        this.notifySvc.fail("Fail to load profile data", "DISMISS");
      });
  }

  confirmDelete(item: BloodStock) {
    this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '450px'
    }).afterClosed().subscribe(r => {
      if (r) this.stockSvc.deleteStock(Number(item.bloodStockID))
        .subscribe(x => {
          this.notifySvc.success("Data Deleted Successfully!!", "DISMISS");
          this.dataSource.data = this.dataSource.data.filter(b => b.bloodStockID != x.bloodStockID);
        }, err => {
          this.notifySvc.fail("Failed to Delete Data!!", "DISMISS");
        });
    })
  }

}
