import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogicService } from 'src/app/services/logic.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  submitted = false;

  form!: FormGroup;

  constructor(
    private logicService: LogicService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })
  }

  submit(){
    this.submitted = true;
    if(this.form.invalid){ return }

    const user = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.logicService.logIn(user).subscribe(res => {
      this.form.reset
      this.router.navigate([''])
      this.submitted = false;
    })
  }
  
}
