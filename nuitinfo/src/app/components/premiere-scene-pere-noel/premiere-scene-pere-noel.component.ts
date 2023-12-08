import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-premiere-scene-pere-noel',
  templateUrl: './premiere-scene-pere-noel.component.html',
  styleUrls: ['./premiere-scene-pere-noel.component.css']
})
export class PremiereScenePereNoelComponent implements OnInit {
  jsonData: any = {};
  currentMessage: number = 0;

  constructor(private router: Router, private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.http.get('/assets/scenes/premiere-scene-pere-noel/texte.json').subscribe(data => {
      this.jsonData = data;
    });
  }

  handleDivClick(data: string): void {
    // Fonction à exécuter lors du clic sur la div cliquable avec des données spécifiques
    console.log('Div cliquée dans le composant parent avec les données :', data);
    // Utilisez le Router pour naviguer vers la route /carte
    this.router.navigate(['/carte']);
  }

  cross(data: string): void {
    if ( this.currentMessage == this.jsonData.length-1 )
      this.jsonData = {};
    else {
      if (this.jsonData.length == 0)
        console.log("scene suivante");
    }
    if ( this.currentMessage < this.jsonData.length-1)
    {
      this.cdr.detectChanges();
      this.currentMessage++;
    }
  }

}
