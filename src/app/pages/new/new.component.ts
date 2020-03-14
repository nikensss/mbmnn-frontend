import { Component, OnInit } from '@angular/core';
import { CurrentSessionService } from 'src/app/services/current-session.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  constructor(public session: CurrentSessionService) {
    console.log(session)
  }

  ngOnInit() {
  }

}
