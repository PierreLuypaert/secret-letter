import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TetrisComponent } from './components/tetris/tetris.component';
import { PremiereScenePereNoelComponent } from './components/premiere-scene-pere-noel/premiere-scene-pere-noel.component';
import { CarteComponent } from './components/carte/carte.component';

const routes: Routes = [
  { path: 'carte', component: CarteComponent, data: { animation: 'fadeInOut' } },
  { path: 'home', component: PremiereScenePereNoelComponent, data: { animation: 'fadeInOut' } },
  { path: 'tetris', component: TetrisComponent, data: { animation: 'fadeInOut' } },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
