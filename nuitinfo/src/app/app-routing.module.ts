import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TetrisComponent } from './components/tetris/tetris.component';
import { PremiereScenePereNoelComponent } from './components/premiere-scene-pere-noel/premiere-scene-pere-noel.component';

const routes: Routes = [
  { path: 'home', component: PremiereScenePereNoelComponent },
  { path: 'tetris', component: TetrisComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to 'history' by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
