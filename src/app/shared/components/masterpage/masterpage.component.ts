import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service'
@Component({
  selector: 'app-masterpage',
  templateUrl: './masterpage.component.html',
  styleUrls: ['./masterpage.component.sass']
})
export class MasterpageComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  public shown
  iconBill = false;
  iconUser = false;

  ngOnInit(): void {
  }

  changeStatus(event) {
    this.shown = event
    console.log(event)
  }

  prueba(event){
    this.shown = event
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

  changeStatusDesktopClickOutside() {
    let shownDesktop = false
    this.auth.changeData(shownDesktop);
  }

  logout(){
    this.auth.logout();
    
  }
}
