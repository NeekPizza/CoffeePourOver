import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  name: String;
  profile: String;
  origin: String;
  roast: String;
  comments: String;
  user: Object;

  constructor(
  private validateService: ValidateService,
  private flashMessage: FlashMessagesService,
  private authService: AuthService,
  private router: Router
  ) { }

  ngOnInit() {
    this.authService.getUser().subscribe(data =>{
      this.user = data.user
    },
    err => {
     console.log(err);
     return false;
   });
  }

  newBean(){
    let user = JSON.parse(localStorage.getItem('user'))
    const bean = {
    name: this.name,
    profile: this.profile,
    origin: this.origin,
    roast: this.roast,
    comments: this.comments,
    _user: user.id
    }

    if(!this.validateService.validateBean(bean)){
    this.flashMessage.show('Please fill in Name field, the rest are optional', {cssClass: 'alert-danger', timeout: 3000});
    return false;
    }

    //Register bean
    this.authService.createBean(bean).subscribe(data => {
      if(data.success){
        this.flashMessage.show('Entered a new bean into your journal', {cssClass: 'alert-success', timeout: 3000})
        this.router.navigate(['/journal'])
      } else {
        this.flashMessage.show('Something Went Wrong', {cssClass: 'alert-danger', timeout: 3000})
        this.router.navigate(['/dashboard'])
      }
    });
  };
};
