import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.sass']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: boolean;
  mensaje: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
  ) {
    this.error = false;
    this.loginForm = this.formBuilder.group(
      {
        name: ["", Validators.required],
        password: ["", Validators.required]
      }
    );
    const user = localStorage.getItem('user_data');
    const token = localStorage.getItem('access_token');
    if (user && token) this.router.navigate(['/hotel']);
  }

  ngOnInit(): void {
  }

  login() {
    let customer = {
      usuario: this.loginForm.value.name,
      password: this.loginForm.value.password,
      idOperador: 'TMST'
    };
    this.auth.login(customer).subscribe(res => {
      if(res.status === 'error'){
        alert(res.message)
      }else if(res.status === 'success'){
        console.log(res)
        // this.router.navigate(['/dashboard'])
        //location.reload()
      }
    }, err => {
      alert(err.message)
    })
  }

}
