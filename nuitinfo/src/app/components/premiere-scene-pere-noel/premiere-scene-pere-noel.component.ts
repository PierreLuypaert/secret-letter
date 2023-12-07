import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-premiere-scene-pere-noel',
  templateUrl: './premiere-scene-pere-noel.component.html',
  styleUrls: ['./premiere-scene-pere-noel.component.css']
})
export class PremiereScenePereNoelComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  handleDivClick(data: string): void {
    // Fonction à exécuter lors du clic sur la div cliquable avec des données spécifiques
    console.log('Div cliquée dans le composant parent avec les données :', data);
    // Utilisez le Router pour naviguer vers la route /carte
    this.router.navigate(['/carte']);
  }

}
