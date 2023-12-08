import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TetrisComponent } from './components/tetris/tetris.component';
import { PremiereScenePereNoelComponent } from './components/premiere-scene-pere-noel/premiere-scene-pere-noel.component';
import { CarteComponent } from './components/carte/carte.component';
import { ArctiqueComponent } from './components/arctique/arctique.component';
import { OceanieComponent } from './components/oceanie/oceanie.component';
import { MenuComponent } from './components/menu/menu.component';

const routes: Routes = [
  { path: 'oceanie', component: OceanieComponent, data: { animation: 'fadeInOut' } },
  { path: 'arctique', component: ArctiqueComponent, data: { animation: 'fadeInOut' } },
  { path: 'carte', component: CarteComponent, data: { animation: 'fadeInOut' } },
  { path: 'menu', component: MenuComponent, data: { animation: 'fadeInOut' } },
  { path: 'home', component: PremiereScenePereNoelComponent, data: { animation: 'fadeInOut' } },
  { path: 'tetris', component: TetrisComponent, data: { animation: 'fadeInOut' } },
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
