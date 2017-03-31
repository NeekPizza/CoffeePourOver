import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  bean: Object;
  user: Object;

  constructor(
    private validateService: ValidateService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const beanID = this.route.snapshot.params['id'];
    this.authService.getBean(beanID).subscribe(data =>{
      this.bean = data.bean
    },
    err => {
     console.log(err);
     return false;
   });
   this.authService.getUser().subscribe(data =>{
     this.user = data.user
     console.log(this.user)
   },
   err => {
    console.log(err);
    return false;
  });
  }

  deleteBean() {
    const user = this.user
    const beanID = this.route.snapshot.params['id'];
    this.authService.deleteBean(beanID,user).subscribe(data => {
      if(data.success){
        this.flashMessage.show('Deleted bean', {cssClass: 'alert-success', timeout: 3000})
        this.router.navigate(['/journal'])
      } else {
        this.flashMessage.show('Something Went Wrong', {cssClass: 'alert-danger', timeout: 3000})
        this.router.navigate(['/journal'])
      }
    });
  };



    //Send Bean to Server



}
