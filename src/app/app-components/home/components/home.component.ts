import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'Please, register if you haven\'t already done it.';

  constructor() {
  }

  ngOnInit(): void {
  }
}
