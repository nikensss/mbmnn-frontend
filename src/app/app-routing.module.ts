import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProjectComponent } from './pages/project/project.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'projects', component: HomeComponent },
  { path: 'projects/:id', component: ProjectComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled' /* scroll to top on every route change */
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
