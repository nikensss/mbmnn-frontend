import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../classes/project';
import { IProject } from '../interfaces/iproject';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl: string = 'http://localhost:3210/api/';
  private projectsUrl: string = this.baseUrl + 'projects/';
  private allProjects: string = this.projectsUrl + 'all';

  constructor(private http: HttpClient) {}

  public getProjects(): Promise<Project[]> {
    return this.http
      .get(this.allProjects)
      .toPromise()
      .then((data: IProject[]) => data.map(d => new Project(d)));
  }

  public getProject(id: string): Promise<Project> {
    return this.http
      .get(this.projectsUrl + id)
      .toPromise()
      .then((data: IProject) => new Project(data));
  }
}
