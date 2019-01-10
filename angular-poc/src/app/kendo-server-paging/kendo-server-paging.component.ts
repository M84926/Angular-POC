import { Component, OnInit } from '@angular/core';
import { PageChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { IApiResponse } from '../shared/api-response.model';
import { User } from '../kendo-grid-example/user.model';
import { UserService } from '../kendo-grid-example/user.service';
import { State, SortDescriptor } from '@progress/kendo-data-query';

@Component({
  selector: 'app-kendo-server-paging',
  templateUrl: './kendo-server-paging.component.html',
  styleUrls: ['./kendo-server-paging.component.css']
})
export class KendoServerPagingComponent implements OnInit {

  private users: User[];

  // Grid
  public gridView: GridDataResult;
  private loading: boolean = true;

  // Paging
  public state: State = {
    skip: 0,
    take: 5
  };

  // sorting
  public multiple = true;
  public allowUnsort = true;
  public sort: SortDescriptor[] = [{
    field: 'firstName',
    dir: 'asc'
  }];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadItems();
  }

  private loadItems(): void {

    let orderby: string = "";
    if (this.sort.length > 0) {
      this.sort.forEach(element => {
        orderby += element.field + "=" + element.dir + ";"
      });
    }

    this.userService.getUsers(this.state.skip, this.state.take,orderby).then((response: IApiResponse) => {
      if (response.isSuccess) {
        this.loading = false;
        this.users = response.data[0].users;
        this.gridView = {
          data: this.users,
          total: response.data[0].count
        };

      }
    });
  }

  public pageChange(event: PageChangeEvent): void {
    this.state.skip = event.skip;
    this.loadItems();
  }

  public sortChange(sort: SortDescriptor[]): void {
    debugger;
    this.sort = sort;
    this.loadItems();
  }

}
