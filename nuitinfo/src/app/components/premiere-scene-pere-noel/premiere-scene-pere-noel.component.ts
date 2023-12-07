import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-premiere-scene-pere-noel',
  templateUrl: './premiere-scene-pere-noel.component.html',
  styleUrls: ['./premiere-scene-pere-noel.component.css']
})
export class PremiereScenePereNoelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  handleDivClick(data: string): void {
    // Fonction à exécuter lors du clic sur la div cliquable avec des données spécifiques
    console.log('Div cliquée dans le composant parent avec les données :', data);
  }

}
