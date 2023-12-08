// app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  // Ajoutez cette ligne

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TetrisComponent } from './components/tetris/tetris.component';
import { BoardComponent } from './components/tetris/board/board.component';
import { PremiereScenePereNoelComponent } from './components/premiere-scene-pere-noel/premiere-scene-pere-noel.component';
import { ZoneClickableComponent } from './components/zone-clickable/zone-clickable.component';
import { CarteComponent } from './components/carte/carte.component';
import { BulleComponent } from './components/bulle/bulle.component';
import { HttpClientModule } from '@angular/common/http';
import { ArctiqueComponent } from './components/arctique/arctique.component';

@NgModule({
  declarations: [
    AppComponent,
    TetrisComponent,
    BoardComponent,
    PremiereScenePereNoelComponent,
    ZoneClickableComponent,
    CarteComponent,
    BulleComponent,
    ArctiqueComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
