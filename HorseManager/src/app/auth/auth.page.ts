import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthGuard } from './auth.guard';
import { Observable } from 'rxjs';
import { AuthResponseData } from './auth.service'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(
    private authService: AuthService, 
    private router: Router,
    private loadCtrl: LoadingController,
    private alertCtrl: AlertController
    ) { }

  isLogin = true;
  isLoading = false;

  ngOnInit() {
  }

  authenticate(email: string, password: string){
    this.isLoading = true;
    this.loadCtrl
    .create({keyboardClose: true, message: 'Logging in...'})
    .then(loadingEl => {
      loadingEl.present();

      let authObs: Observable<AuthResponseData>;

      if(this.isLogin) {
        authObs = this.authService.login(email, password);
      } else {
        authObs = this.authService.signup(email, password);
      }

      authObs.subscribe(resData => {
        console.log(resData);
        this.isLoading = false;
        loadingEl.dismiss();
        this.router.navigateByUrl('/home');
      }, errRes => {
        loadingEl.dismiss();
        const code = errRes.error.error.message;
        let message = 'Не получилось зрагитрироваться, попробуйте еще раз';
        if( code === 'EMAIL_EXISTS') {
          message = 'Этот адрес уже зарегистрирован'
        } else if (code === 'EMAIL_NOT_FOUND') {
          message = 'Данные адрес не зарегистрирован'
        } else if (code === 'INVALID_PASSWORD') {
          message = 'Неправильный пароль'
        }

        this.showAlert(message);
      });
    });
  }

  onSubmit(form: NgForm){
    if(!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.authenticate(email, password);
  }

  onSwitchAuthModule(){
    this.isLogin = !this.isLogin;
  }
  private showAlert(message: string){
    this.alertCtrl.create({
      header: 'Не удалось зарегистрироваться',
      message: message,
      buttons: ['Okay']
    }).then(alertEl => alertEl.present());
  }

}
