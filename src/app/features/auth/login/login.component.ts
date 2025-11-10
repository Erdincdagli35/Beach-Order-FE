import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { TokenService } from 'src/app/core/services/token.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  form: FormGroup;
  error: string | null = null;
  loading = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private tokenService:TokenService, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get username(): AbstractControl | null { return this.form.get('username'); }
  get password(): AbstractControl | null { return this.form.get('password'); }
  
  submit() {
  if (this.form.invalid) return;

  this.loading = true;
  this.error = null;
  
  const { username, password } = this.form.value;
  this.auth.login(username, password).subscribe({
    next: () => {
      this.loading = false;
      const roles = this.tokenService.getRoles();

      if (roles.includes('ROLE_ADMIN')) {
        this.router.navigate(['/product-main-menu']);
      } else if (roles.includes('ROLE_CUSTOMER')) {
        this.router.navigate(['/product-list']);
      } else {
        this.error = "Yetki bulunamadı.";
      }
    },
    error: (err) => {
      this.loading = false;
      this.error = err?.error?.error || 'Login failed';
    }
  });
}

}
