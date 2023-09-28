import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {Common, Sponsors} from "../../../constants";
import {MatTableDataSource} from "@angular/material/table";
import {Sponsor} from "../../../types";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
// import {SponsorsActions} from "../../store/sponsors.action";
// import GetAllSponsors = SponsorsActions.GetAllSponsors;
// import {Store} from "@ngxs/store";
// import {SponsorState} from "../../store/sponsors.state";
import {AddEditSponsorComponent} from "../popups/add-edit-sponsor/add-edit-sponsor.component";
import {SponsorsService} from "../../../services/sponsors.service";

@Component({
  selector: 'app-all-sponsors',
  templateUrl: './all-sponsors.component.html',
  styleUrls: ['./all-sponsors.component.scss']
})
export class AllSponsorsComponent implements OnInit {

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    displayedColumns: string[] = [
        Sponsors.ID,
        Sponsors.NAME,
        Sponsors.EMAIL,
        Sponsors.CONTACT_NUMBER,
        Common.ACTION_COLUMN_TEXT
    ];

    dataSource: MatTableDataSource<Sponsor> = new MatTableDataSource<Sponsor>();

    SPONSOR_MESSAGES = Sponsors;
    COMMON_MESSAGES = Common;

    subscriptions: Subscription[] = [];
    isLoading = true;

   constructor(
       // private store: Store,
       private sponsorService: SponsorsService,
       private matDialog: MatDialog
   ) { }

    ngOnInit(): void {
        // this.store.dispatch(new GetAllSponsors());
        // this.subscriptions.push(this.store.select(SponsorState.sponsors).subscribe(data => {
        this.subscriptions.push(this.sponsorService.getAllSponsors().subscribe(data => {
            debugger;
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
        const dialogRef = this.matDialog.open(AddEditSponsorComponent, {width: '800px', data: {edit: 0}});
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

}
