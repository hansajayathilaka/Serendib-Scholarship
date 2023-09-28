import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Common, Projects } from "../../../constants";
import { Project } from "../../../types";
import { AddEditProjectComponent } from "../popups/add-edit-project/add-edit-project.component";
// import { Store } from "@ngxs/store";
import { ProjectsActions } from "../../store/projects.actions";
import { Subscription } from "rxjs";
// import { ProjectState } from "../../store/projects.state";
// import GetAllProjects = ProjectsActions.GetAllProjects;
import {ProjectService} from "../../../services/projects.service";

@Component({
    selector: 'app-all-projects',
    templateUrl: './all-projects.component.html',
    styleUrls: ['./all-projects.component.scss']
})
export class AllProjectsComponent implements OnInit {

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    displayedColumns: string[] = [
        Projects.ID,
        Projects.PROJECT_NAME,
        Projects.LAND_NAME,
        Projects.ADDRESS,
        Projects.PURCHASING_DATE,
        Projects.PURCHASING_PRICE,
        Projects.EXTEND,
        Projects.REMARKS,
        Projects.PLAN_NO,
        Projects.DEED_NO,
        Projects.TAGS,
        Common.ACTION_COLUMN_TEXT
    ];

    dataSource: MatTableDataSource<Project> = new MatTableDataSource<Project>();
    isLoading = true;

    PROJECT_MESSAGES = Projects;
    COMMON_MESSAGES = Common;

    subscriptions: Subscription[] = [];

    constructor(
        // private store: Store,
        private projectService: ProjectService,
        private matDialog: MatDialog
    ) {
    }

    ngOnInit() {
        // this.store.dispatch(new GetAllProjects());
        // this.subscriptions.push(this.store.select(ProjectState.projects).subscribe(data => {
        this.subscriptions.push(this.projectService.GetAllProjects().subscribe(data => {
            if (data === undefined) {
                this.isLoading = true;
            } else {
                data = Array.from(data!);
                this.dataSource = new MatTableDataSource(data);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
                this.isLoading = false;
            }
        }));
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    ngOnClickAdd() {
        const dialogRef = this.matDialog.open(AddEditProjectComponent, {width: '800px', data: {edit: 0}});
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

}
