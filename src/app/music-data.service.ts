import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';
import { environment } from './../environments/environment';

import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {

  constructor(private spotifyToken: SpotifyTokenService, private http: HttpClient) { }

  getNewReleases(): Observable<SpotifyApi.ListOfNewReleasesResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
      return this.http.get<any>("https://api.spotify.com/v1/browse/new-releases", { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  getArtistById(id: any): Observable<SpotifyApi.SingleArtistResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
      return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  getAlbumsByArtistId(id: any): Observable<SpotifyApi.ArtistsAlbumsResponse> {
    const include_groups = "album,single";
    const limit = 50;

    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
      return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=${include_groups}&limit=${limit}`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  getAlbumById(id: any): Observable<SpotifyApi.SingleAlbumResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
      return this.http.get<any>(`https://api.spotify.com/v1/albums/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  searchArtists(searchString: any): Observable<SpotifyApi.ArtistSearchResponse> {
    const q = searchString;
    const type = "artist";
    const limit = 50;

    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
      return this.http.get<any>(`https://api.spotify.com/v1/search?q=${q}&type=${type}&limit=${limit}`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  addToFavourites(id): Observable<[String]> {
    // TODO: make a PUT request to environment.userAPIBase/favourites/:id to add id to favourites
    return this.http.put<[String]>(`${environment.userAPIBase}/favourites/${id}`, id);
  }

  removeFromFavourites(id): Observable<SpotifyApi.MultipleTracksResponse> {
    return this.http.delete<[String]>(`${environment.userAPIBase}/favourites/${id}`).pipe(mergeMap(favouritesArray => {
      // TODO: Perform the same tasks as the original getFavourites() method, only using "favouritesArray" from above, instead of this.favouritesList
      // NOTE: for the empty array, you will need to use o=>o.next({tracks: []}) instead of o=>{o.next([])}
      if (favouritesArray.length > 0) {
        const ids = favouritesArray.join(',');
        return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
          return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${ids}`, { headers: { "Authorization": `Bearer ${token}` } });
        }));
      } else {
        return new Observable((o) => o.next({ tracks: [] }));
      }
    }));
  }

  getFavourites(): Observable<SpotifyApi.MultipleTracksResponse> {
    return this.http.get<[String]>(`${environment.userAPIBase}/favourites/`).pipe(mergeMap(favouritesArray => {
      // TODO: Perform the same tasks as the original getFavourites() method, only using "favouritesArray" from above, instead of this.favouritesList
      // NOTE: for the empty array, you will need to use o=>o.next({tracks: []}) instead of o=>{o.next([])}
      if (favouritesArray.length > 0) {
        const ids = favouritesArray.join(',');
        return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
          return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${ids}`, { headers: { "Authorization": `Bearer ${token}` } });
        }));
      } else {
        return new Observable((o) => o.next({ tracks: [] }));
      }
    }));
  }

}
