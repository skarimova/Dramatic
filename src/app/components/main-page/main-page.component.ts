import { Component, Input, OnInit} from '@angular/core';
import { Film } from 'src/app/models/movies.model';
import { DataService } from 'src/app/services/data.service';
import { LogicService } from 'src/app/services/logic.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  constructor(private logicService: LogicService,
    private dataService: DataService){}
  
  films: Film[] = [];

  ngOnInit(): void {
    console.log(`token: `, this.logicService.token)
    this.logicService.getAllFilms().subscribe(res => {
      this.films = res;
    })
  }

  getFilm(film: Film){
    this.dataService.myMethod(film);
  }

  getSearchingFilms(keyword: string){
    this.logicService.getAllFilms(keyword).subscribe(res => {
      this.films = res;
    })
  }

  likeFilm(film: Film){
    const token = this.logicService.token;
    if(!token || !film.id) return;
    this.logicService.likeFilm(film.id, token).subscribe(res => {
     // 
    })
  }

}
