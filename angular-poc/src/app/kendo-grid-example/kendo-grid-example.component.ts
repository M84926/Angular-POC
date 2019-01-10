import { Component, OnInit } from '@angular/core';

import { UserService } from './user.service';
import { User } from './user.model';
import { IApiResponse } from '../shared/api-response.model';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';

@Component({
  selector: 'app-kendo-grid-example',
  templateUrl: './kendo-grid-example.component.html',
  styleUrls: ['./kendo-grid-example.component.css']
})
export class KendoGridExampleComponent implements OnInit {

  public gridView: GridDataResult;
  public pageSize = 10;
  public skip = 0;
  private users: User[];
  private loading: boolean;

  // sorting
  public multiple = true;
  public allowUnsort = true;
  public sort: SortDescriptor[] = [{
    field: 'firstName',
    dir: 'asc'
  }];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loading = true;
    this.userService.getUsers().then((response: IApiResponse) => {
      if (response.isSuccess) {
        this.loading = false;
        this.users = response.data[0].users;
        this.bindGridData();
      }
    });
  }

  private bindGridData(): void {
    this.users = orderBy(this.users, this.sort)
    this.gridView = {
      data: this.users.slice(this.skip, this.skip + this.pageSize),
      total: this.users.length
    };
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.bindGridData();
  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.bindGridData();
  }

}
