import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  date =  ""
  timeSet = false;
  countDownDate = new Date().getTime();

  demo = "0d 0h 0min 0sec"
  timer:any;
  x = setInterval(()=>{
    let n = new Date().getTime();
    let distance = this.countDownDate - n;
    let days = Math.floor(distance/(1000*60*60*24));
    let hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
    let min = Math.floor((distance % (1000*60*60)) / (1000*60));
    let sec = Math.floor((distance % (1000*60)) / 1000);
    this.timer = days + "d " + hours + "h " + min + "min " + sec + "sec ";
  })

  submitTime(){
    this.countDownDate = new Date(this.date).getTime();
    this.timeSet = true;
  }
}
