import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy {

  results: any;
  resultsSub: any;
  searchQuery: any;
  searchSub: any;

  constructor(private route: ActivatedRoute, private mds: MusicDataService, private router: Router) { }

  ngOnInit(): void {
    this.searchSub = this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || 0;
      this.resultsSub = this.mds.searchArtists(this.searchQuery).subscribe(data => {
        this.results = data.artists.items.filter((item: any) => item.images.length > 0)
      })
    });
  }

  ngOnDestroy() {
    this.resultsSub?.unsubscribe();
    this.searchSub?.unsubscribe();
  }
}
