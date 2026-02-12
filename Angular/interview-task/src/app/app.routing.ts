import { HomeComponent } from "../components/home.page";
import { ClientListComponent } from "../components/client-list.page";
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'clients',
    component: ClientListComponent
  },
];