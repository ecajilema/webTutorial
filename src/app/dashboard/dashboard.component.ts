import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeroSearchComponent } from "../hero-search/hero-search.component";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, RouterLink, HeroSearchComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(response => {
      if (response.exito === 1) {
        this.heroes = response.dato.slice(1, 5);
      } else {
        console.error(response.mensaje);
      }
    });
  }


}
