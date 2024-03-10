import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(private authservice: AuthService) { }

  ngOnInit(): void {
    // this.authservice.autoLogin();
    // this.authservice.user.subscribe(user => {
    //   console.log(user);
    // });

  }

}
