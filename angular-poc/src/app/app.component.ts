import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tiffin-service';

  isLoggedIn: boolean = false;

  constructor(private authService: AuthenticationService) {

  }

  ngOnInit() {
    // this.authService.isLoggedIn.subscribe((isLoggedIn: boolean) => {
    //   this.isLoggedIn = isLoggedIn;
    // });
    
  }

}
