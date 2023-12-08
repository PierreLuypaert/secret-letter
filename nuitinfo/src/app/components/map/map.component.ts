import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { Feature } from 'geojson';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map: any;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  constructor() { }

  addGeoJsonLayer() {
    const pointLayer: Feature = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [125.6, 10.1]
      },
      properties: {
        name: "Dinagat Islands"
      }
    }

    const zoneLayer: Feature = {
      type: "Feature",
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [0, 0],
            [0, 10],
            [10, 10],
            [10, 0],
            [0, 0],
          ],
        ],
      },
      properties: {
        name: 'My Zone',
        description: 'Description for My Zone',
      },
    }
  
    L.geoJSON(zoneLayer).addTo(this.map);
    L.geoJSON(pointLayer).addTo(this.map);
  }

  test() {
    fetch("../../assets/data/deforestation/cartodb-query.geojson")
      .then(response => response.json())
      .then(geoJsonData => {
        // Create a GeoJSON layer and add it to the map
        L.geoJSON(geoJsonData).addTo(this.map);
      })
      .catch(error => console.error('Error loading GeoJSON:', error));
  }

  cleanMap() {
    console.log(document.querySelector(".SourcesFooterHTML"))
  }
  

  ngAfterViewInit(): void {
    //this.initMap();
    //this.addGeoJsonLayer();
    //this.test();

    this.cleanMap();
  }
}