import { Component, OnInit, ViewChild } from '@angular/core';
import { LocationService } from '../../../services/location.service';
import { NotifyService } from '../../../services/notify.service';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '../../../models/location';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmDeleteDialogComponent } from '../../dialog/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-location-view',
  templateUrl: './location-view.component.html',
  styleUrls: ['./location-view.component.css']
})
export class LocationViewComponent implements OnInit {

    locations: Location[] = [];
    dataSource: MatTableDataSource<Location> = new MatTableDataSource(this.locations);
    @ViewChild(MatSort, { static: false }) sort!: MatSort;
    @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
    columnList: string[] = ["name", "city", "actions"];

    constructor(
        private locationSvc: LocationService,
        private notifySvc: NotifyService,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.locationSvc.getLocations().subscribe(x => {
            this.locations = x;
            console.log(x);
            this.dataSource.data = this.locations;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }, err => {
            this.notifySvc.fail("Fail to load location data", "DISMISS");
        })
    }

    confirmDelete(item: Location) {
        this.dialog.open(ConfirmDeleteDialogComponent, {
            width: '450px'
        }).afterClosed().subscribe(r => {
            if (r) this.locationSvc.deleteLocation(Number(item.locationID))
                .subscribe(x => {
                    this.notifySvc.success("Data Deleted Successfully!!", "DISMISS");
                    this.dataSource.data = this.dataSource.data.filter(l => l.locationID != x.locationID);
                }, err => {
                    this.notifySvc.fail("Failed to Delete Data!!", "DISMISS");
                });
        })
    }

}
