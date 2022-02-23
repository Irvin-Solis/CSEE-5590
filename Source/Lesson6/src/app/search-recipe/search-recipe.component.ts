import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.css']
})
export class SearchRecipeComponent implements OnInit {
  @ViewChild('recipe') recipes: ElementRef;
  @ViewChild('place') places: ElementRef;
  recipeValue: any;
  placeValue: any;
  venueList = [];
  recipeList = [];

  currentLat: any;
  currentLong: any;
  geolocationPosition: any;

  constructor(private _http: HttpClient) {
  }

  ngOnInit() {

    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.geolocationPosition = position;
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
      });
  }

  getVenues() {

    this.recipeValue = this.recipes.nativeElement.value;
    this.placeValue = this.places.nativeElement.value;

    if (this.recipeValue !== null) {
      let url = `https://api.edamam.com/api/recipes/v2?type=public&random=true&q=${this.recipeValue}&app_id=d5c1bd7f&app_key=acb4b16bba52b8bc09fbd05c02a33ff3`
      this._http.get(url)
      .subscribe((data: any) => {
        let num = 0;
        let results = data.hits;
        for (let item in results){
          if(num == 5){
            break;
          }
          let url = results[item].recipe.url;
          let name = results[item].recipe.label;
          let icon = results[item].recipe.image;
          this.recipeList.push({name, url, icon});
          num++;
        }
        console.log(this.recipeList)
      })
    }

    if (this.placeValue != null && this.placeValue !== '' && this.recipeValue != null && this.recipeValue !== '') {
      const headers = new HttpHeaders({"Accept": "application/json", "Authorization": "fsq3W6lE8mDvWo5WcnklKG+xUxyPsuhaN+T5EivLhvp4r3c="});
      let options = {headers}
      this._http.get(`https://api.foursquare.com/v3/places/search?query=${this.placeValue}&limit=5&ll=${this.currentLat},${this.currentLong}`, options)
      .subscribe((data: any) => {
        let results = data.results

        results.map((k ,v) =>{
          let name = k.name;
          let location = k.location;
          this.venueList.push({name, location})
        })
      });
    }
  }
}
