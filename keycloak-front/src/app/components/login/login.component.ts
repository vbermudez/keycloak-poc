import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { UserInfoService } from '../../services/user-info.service';
import { UserAuthz } from '../../model/user-authz';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {
  userField: FormControl = new FormControl('', [Validators.required]);
  passwordField: FormControl = new FormControl('', [Validators.required]);

  constructor(private formBuilder: FormBuilder, private userAuthzSvc: UserInfoService) { }

  ngOnInit(): void {
    
  }

  doLogin(): Promise<any> {
    if (!this.isValid()) return;

    const usrAuthz: UserAuthz = {
      user: this.userField.value,
      password: this.passwordField.value
    };

    console.log('formData =', usrAuthz);

    // this.userAuthzSvc.login(usrAuthz).subscribe( usrtoken => console.log('token', usrtoken) );
  }

  isValid(): boolean {
    return this.userField.valid && this.passwordField.valid;
  }

  getErrorMessage(which): string {
    if (this[`${which}Field`].hasError('required'))
      return 'Campo requerido';

    return '';
  }
}
