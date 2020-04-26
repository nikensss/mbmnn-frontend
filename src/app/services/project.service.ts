import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Project } from '../classes/project';
import { IProject } from '../interfaces/iproject';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl: string = 'http://localhost:3210/api/';
  private projectsUrl: string = this.baseUrl + 'projects/';
  private allProjects: string = this.projectsUrl + 'all';
  private postNewProjectUrl: string = this.projectsUrl + 'new';

  constructor(private http: HttpClient) {}

  public getProjects(): Promise<Project[]> {
    return this.http
      .get(this.allProjects)
      .toPromise()
      .then((data: IProject[]) => data.map((d) => new Project(d)));
  }

  public getProject(id: string): Promise<Project> {
    return this.http
      .get(this.projectsUrl + id)
      .toPromise()
      .then((data: IProject) => new Project(data));
  }

  public postNewProject(form: FormData) {
    // console.log(form.value);
    // console.log(JSON.stringify(form.value));
    // let body = new HttpParams();
    // for (const formField in form.value) {
    //   body = body.set(formField, form.value[formField]);
    // }
    // console.log('body');
    // console.log(body);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.http.post(this.postNewProjectUrl, form, {
      headers,
      observe: 'response'
    });
  }
}
