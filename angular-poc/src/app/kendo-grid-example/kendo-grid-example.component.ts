import { Component, OnInit } from '@angular/core';

import { UserService } from './user.service';
import { User } from './user.model';
import { IApiResponse } from '../shared/api-response.model';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';

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
  private loading: boolean = false;

  
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loading = true;
    this.userService.getUsers().then((response: IApiResponse) => {
      if (response.isSuccess) {
        this.loading = false;
        this.users = response.data;
        this.gridView = {
          data: this.users.slice(this.skip, this.skip + this.pageSize),
          total: 1000
        };

      }
    });
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
}

  private loadItems(): void {
    this.gridView = {
        data: this.users.slice(this.skip, this.skip + this.pageSize),
        total: this.users.length
    };
}

  getGender(genderId: number) {
    if (genderId == 1) {
      return "Male";
    } else if (genderId == 2) {
      return "False";
    } else {
      return "Not Mentioned";
    }
  }

}
