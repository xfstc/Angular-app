import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {

  albums: any;
  albumsSub: any;
  artist: any;
  artistSub: any;

  constructor(private route: ActivatedRoute, private mds: MusicDataService) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.artistSub = this.mds.getArtistById(id).subscribe(
      data => { this.artist = data; });

    this.albumsSub = this.mds.getAlbumsByArtistId(id).subscribe((data) => {
      this.albums = data.items.filter((thing: any, index: any, self: any) =>
        index === self.findIndex((t: any) => (
          t.place === thing.place && t.name === thing.name
        )))
    })
  }

  ngOnDestroy() {
    this.artistSub?.unsubscribe();
    this.albumsSub?.unsubscribe();
  }
}
