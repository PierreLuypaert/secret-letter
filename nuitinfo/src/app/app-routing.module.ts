import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TetrisComponent } from './components/tetris/tetris.component';

const routes: Routes = [
  { path: 'tetris', component: TetrisComponent },
  { path: '', redirectTo: '/tetris', pathMatch: 'full' }, // Redirect to 'tetris' by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
