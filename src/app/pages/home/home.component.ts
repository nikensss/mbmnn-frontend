import { Component } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/classes/project';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public projects: Project[] = [];
  public error: string;

  constructor(projectService: ProjectService) {
    projectService
      .getProjects()
      .then((d: Project[]) => (this.projects = d))
      .catch((err) => (this.error = err.error));
  }
}
