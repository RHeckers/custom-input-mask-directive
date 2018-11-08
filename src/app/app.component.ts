import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'input-mask-directive';

  container:HTMLElement;
  
  ngOnInit(){
    this.container = document.getElementById('container');
    this.container.style.height = window.innerHeight / 2 + 'px';
  }
}
