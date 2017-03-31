import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  beanId: String;
  bean: Object;
  name: String;
  profile: String;
  origin: String;
  roast: String;
  comments: String;

  constructor(
    private validateService: ValidateService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const beanID = this.route.snapshot.params['id'];
    this.authService.getBean(beanID).subscribe(edit =>{
      console.log(edit)
      this.bean = edit.bean
    },
    err => {
     console.log(err);
     return false;
   });
  }

  //Update Bean Function
  updateBean(){
    const beanID = this.route.snapshot.params['id'];
    const bean = {
    name: this.name,
    profile: this.profile,
    origin: this.origin,
    roast: this.roast,
    comments: this.comments,
    }
    //Validate Bean Name
    if(!this.validateService.validateBean(bean)){
    this.flashMessage.show('Please fill in Name field, the rest are optional', {cssClass: 'alert-danger', timeout: 3000});
    return false;
    }
    //Send Bean to Server
    this.authService.updateBean(bean,beanID).subscribe(data => {
      if(data.success){
        this.flashMessage.show('Saved changes to bean', {cssClass: 'alert-success', timeout: 3000})
        this.router.navigate(['/journal'])
      } else {
        this.flashMessage.show('Something Went Wrong', {cssClass: 'alert-danger', timeout: 3000})
        this.router.navigate(['/journal'])
      }
    });
  };

}
