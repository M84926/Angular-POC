import { Component, OnInit } from '@angular/core';

import { UserService } from './user.service';
import { User } from './user.model';
import {  IApiResponse } from '../shared/api-response.model';

@Component({
  selector: 'app-kendo-grid-example',
  templateUrl: './kendo-grid-example.component.html',
  styleUrls: ['./kendo-grid-example.component.css']
})
export class KendoGridExampleComponent implements OnInit {

  users: User[];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().then((response: IApiResponse) => {
      if(response.isSuccess){
        this.users = response.data;
      }
    });
  }

  getGender(genderId: number){
    if(genderId == 1){
      return "Male";
    }else if(genderId == 2){
      return "False";
    }else {
      return "Not Mentioned";
    }
  }

}
