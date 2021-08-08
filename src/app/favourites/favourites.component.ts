import { Component, OnDestroy, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit, OnDestroy {

  favourites: Array<any> = [];
  favouritesSub: any;

  constructor(private mds: MusicDataService) { }

  ngOnInit(): void {
    this.favouritesSub = this.mds.getFavourites().subscribe(
      data => { this.favourites = data.tracks })
  }

  removeFromFavourites(id: any) {
    this.favouritesSub = this.mds.removeFromFavourites(id).subscribe(
      data => { this.favourites = data.tracks })
  }

  ngOnDestroy() {
    this.favouritesSub?.unsubscribe();
  }
}
