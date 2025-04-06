import { Component } from '@angular/core';
import { Hero } from '../hero';
import { UpperCasePipe } from '@angular/common';  
import { FormsModule } from '@angular/forms'; 
import { HeroService } from '../hero.service';
import { NgFor, NgIf } from '@angular/common';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [FormsModule, NgFor, HeroDetailComponent],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss'
})
export class HeroesComponent {
  /*hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };*/
  heroes: Hero[]=[];
  selectedHero?: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }
  constructor(
    private heroService: HeroService, 
    private messageService: MessageService) {}

  getHeroes(): void {
     this.heroService.getHeroes().
     subscribe(heroes => this.heroes = heroes);
  }
  ngOnInit(): void {
    this.getHeroes();
  }

  
}
