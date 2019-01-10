import { Component, OnInit } from '@angular/core';
import { PageChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { IApiResponse } from '../shared/api-response.model';
import { User } from '../kendo-grid-example/user.model';
import { UserService } from '../kendo-grid-example/user.service';
import { State } from '@progress/kendo-data-query';

@Component({
  selector: 'app-kendo-server-paging',
  templateUrl: './kendo-server-paging.component.html',
  styleUrls: ['./kendo-server-paging.component.css']
})
export class KendoServerPagingComponent implements OnInit {

  public gridView: GridDataResult;

  private users: User[];
  private loading: boolean = true;
  public state: State = {
    skip: 0,
    take: 5
  };

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadItems();
  }

  public pageChange(event: PageChangeEvent): void {
    this.state.skip = event.skip;
    this.loadItems();
  }

  private loadItems(): void {
    debugger;
    this.userService.getUsers(this.state.skip, this.state.take).then((response: IApiResponse) => {
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

}
