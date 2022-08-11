import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/service/auth.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  public shown;
  iconBill = false;
  iconUser = false;

  ngOnInit(): void {
    this.auth.currentDatamobile.subscribe(data => this.shown = data);
  }

  changeStatus() {
    this.auth.changeDataMobile(!this.shown);
    console.log(this.shown)
  }

  changeStatusBill() {
    this.iconBill = !this.iconBill;
    return this.iconBill;
  }

  changeStatusUser() {
    this.iconUser = !this.iconUser;
    return this.iconUser;
  }

  logout(){
    this.auth.logout();
    
  }

}
