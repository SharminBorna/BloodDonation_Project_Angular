import { Component, OnInit, ViewChild } from '@angular/core';
import { BloodGroup } from '../../../models/blood-group';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BloodGroupService } from '../../../services/blood-group.service';
import { NotifyService } from '../../../services/notify.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-bloodgroup-view',
  templateUrl: './bloodgroup-view.component.html',
  styleUrls: ['./bloodgroup-view.component.css']
})
export class BloodgroupViewComponent implements OnInit {

    bloodGroups: BloodGroup[] = [];
    dataSource: MatTableDataSource<BloodGroup> = new MatTableDataSource(this.bloodGroups);
    @ViewChild(MatSort, { static: false }) sort!: MatSort;
    @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
    columnList: string[] = ["name", "actions"];

    constructor(
        private groupSvc: BloodGroupService,
        private notifySvc: NotifyService,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.groupSvc.getBloodGroups().subscribe(x => {
            this.bloodGroups = x;
            console.log(x);
            this.dataSource.data = this.bloodGroups;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }, err => {
            this.notifySvc.fail("Fail to load blood group data", "DISMISS");
        })
    }

}
