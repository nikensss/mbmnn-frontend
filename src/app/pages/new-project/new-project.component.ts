import { Component, OnInit } from '@angular/core';
import { CurrentSessionService } from 'src/app/services/current-session.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  constructor(currentSessionService: CurrentSessionService) {}

  ngOnInit() {
  }

}
