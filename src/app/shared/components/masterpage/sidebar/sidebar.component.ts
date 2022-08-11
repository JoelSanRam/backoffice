import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/service/auth.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  public shown;
  public shownDesktop = false;
  iconBill = false;
  iconUser = false;

  ngOnInit(): void {
    this.auth.currentData.subscribe(data => this.shownDesktop = data);
    this.auth.currentDatamobile.subscribe(data => this.shown = data);
  }

  changeStatus() {
    this.auth.changeDataMobile(!this.shown);
    console.log(this.shown)
  }

  changeData() {
    this.auth.changeData(!this.shownDesktop);
    console.log(this.shownDesktop)
  }

  changeStatusBill() {
    this.iconBill = !this.iconBill;
    return this.iconBill;
  }

  changeStatusUser() {
    this.iconUser = !this.iconUser;
    return this.iconUser;
  }

  logout() {
    this.auth.logout();

  }

}
