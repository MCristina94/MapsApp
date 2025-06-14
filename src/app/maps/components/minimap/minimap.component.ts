import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  viewChild,
} from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-minimap',
  imports: [],
  templateUrl: './minimap.component.html',
  styles: `
  div{
    width: 100%;
    height: 260px
  }`,
})
export class MinimapComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  lngLat = input.required<{ lng: number; lat: number }>();

  async ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) return;

    await new Promise((resolve) => setTimeout(resolve, 80));
    const element = this.divElement()!.nativeElement;

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat(), // starting position [lng, lat]
      zoom: 11, // starting zoom
    });

    new mapboxgl.Marker().setLngLat(this.lngLat()).addTo(map);
  }
}
