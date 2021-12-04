import { Component, OnInit, ViewChild } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { NotifyService } from '../../../services/notify.service';
import { MatDialog } from '@angular/material/dialog';
import { Hospital } from '../../../models/hospital';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmDeleteDialogComponent } from '../../dialog/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-hospital-view',
  templateUrl: './hospital-view.component.html',
  styleUrls: ['./hospital-view.component.css']
})
export class HospitalViewComponent implements OnInit {
    hospitals: Hospital[] = [];
    dataSource: MatTableDataSource<Hospital> = new MatTableDataSource(this.hospitals);
    @ViewChild(MatSort, { static: false }) sort!: MatSort;
    @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
    columnList: string[] = ["name", "address", "contact", "actions"];

    constructor(
        private hospitalSvc: HospitalService,
        private notifySvc: NotifyService,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.hospitalSvc.getHospitals().subscribe(x => {
            this.hospitals = x;
            console.log(x);
            this.dataSource.data = this.hospitals;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }, err => {
            this.notifySvc.fail("Fail to load hospital data", "DISMISS");
        })
    }

    confirmDelete(item: Hospital) {
        this.dialog.open(ConfirmDeleteDialogComponent, {
            width: '450px'
        }).afterClosed().subscribe(r => {
            if (r) this.hospitalSvc.deleteHospital(Number(item.hospitalID))
                .subscribe(x => {
                    this.notifySvc.success("Data Deleted Successfully!!", "DISMISS");
                    this.dataSource.data = this.dataSource.data.filter(h => h.hospitalID != x.hospitalID);
                }, err => {
                    this.notifySvc.fail("Failed to Delete Data!!", "DISMISS");
                });
        })
    }

}
