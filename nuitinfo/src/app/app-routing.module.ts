import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TetrisComponent } from './components/tetris/tetris.component';
import { MapComponent } from './components/map/map.component';

const routes: Routes = [
  { path: 'tetris', component: TetrisComponent },
  { path: 'map', component: MapComponent }
  //{ path: '', redirectTo: '/tetris', pathMatch: 'full' }, // Redirect to 'history' by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
