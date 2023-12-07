import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TetrisComponent } from './components/tetris/tetris.component';
import { PremiereScenePereNoelComponent } from './components/premiere-scene-pere-noel/premiere-scene-pere-noel.component';
import { ZoneClickableComponent } from './components/zone-clickable/zone-clickable.component';

@NgModule({
  declarations: [
    AppComponent,
    TetrisComponent,
    PremiereScenePereNoelComponent,
    ZoneClickableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
