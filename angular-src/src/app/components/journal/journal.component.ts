import { Component, OnInit, Pipe } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css'],
})


export class JournalComponent implements OnInit {
  user: Object;
  constructor(
    private authService: AuthService,
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

}
