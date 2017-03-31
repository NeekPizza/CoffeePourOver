import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.css']
})
export class ToolComponent implements OnInit {
  ratio: number;
  water: number;
  coffee: number;
  seconds: number;
  minutes: number;
  intervalId: any;

  constructor(
    private authService: AuthService,
    private flashMessage: FlashMessagesService
  ) {  }

  ngOnInit() {
    this.seconds = 0;
    this.minutes = 0;
  }

  //Ratio Calculator

  calculate(){
    if(this.ratio == null || this.ratio < 0){
      this.flashMessage.show("Ratio Can Not Be Blank or Negative!",{cssClass: 'alert-danger',timeout: 5000})
      return false;
    }
    if(this.water  == null  && this.coffee == null || this.water < 0 || this.coffee < 0){
      this.flashMessage.show("Fill In Coffee Or Water. Both Can Not Be Blank, Neither Can Be Negative",{cssClass: 'alert-danger',timeout: 8000})
      return false;
    } else if(this.water == null){
      this.flashMessage.show(`You should use ${(this.ratio*this.coffee).toFixed(2)} grams of Water`,{cssClass: 'alert-success',timeout: 30000})
    } else if(this.coffee == null){
      this.flashMessage.show(`You should use ${(this.water/this.ratio).toFixed(2)} grams of coffee`,{cssClass: 'alert-success',timeout: 30000})
    } else {
      this.flashMessage.show(`Looks like you entered all the fields in. You must not have a use for this calculator.`,{cssClass: 'alert-danger',timeout: 5000})
    }
  }

  //StopWatch

  listen(){
    if(this.seconds == 60){
      this.seconds = 0;
      this.minutes++;
    }
  };

  start(){
    this.intervalId = setInterval(() =>  {
      this.seconds += 1;
      this.listen()
    }, 1000);

  }

  stop(){
    clearInterval(this.intervalId);
  }

  reset(){
    clearInterval(this.intervalId);
    this.seconds = 0;
    this.minutes = 0;
  };
};
