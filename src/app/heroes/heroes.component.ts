import { ChangeDetectorRef, Component } from '@angular/core';
import { Hero } from '../hero';
import { UpperCasePipe } from '@angular/common';  
import { FormsModule } from '@angular/forms'; 
import { HeroService } from '../hero.service';
import { NgFor, NgIf } from '@angular/common';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { MessageService } from '../message.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [FormsModule, NgFor, RouterLink],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss'
})
export class HeroesComponent {
  public lst: Hero[] = [];
  /*hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };*/
  //heroes: Hero[]=[];
  //selectedHero?: Hero;

  /*onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }*/
  constructor(
    private heroService: HeroService, 
    private changeDetector: ChangeDetectorRef
   ) {}
   ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
     this.heroService.getHeroes().
     subscribe(response =>{
      this.lst = response.dato;
    });
    //console.log(this.lst);
     //subscribe(heroes => this.heroes = heroes);
  }

   /*
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
  
    this.heroService.add({ name } as Hero)
      .subscribe({
        next: (response) => {
          if (response.exito === 1 && response.dato) {
            // Verifica si dato es un array o un solo héroe
            if (Array.isArray(response.dato)) {
              // Si es array, añade todos los elementos
              this.lst.push(...response.dato);
            } else {
              // Si es un solo héroe, añádelo directamente
              this.lst.push(response.dato);
            }
            console.log(`Héroe(s) añadido(s)`);
          } else {
            console.error(`Error: ${response.mensaje || 'No se pudo añadir el héroe'}`);
          }
        },
        error: (err) => {
          console.error('Error al añadir héroe:', err.message);
        }
      });
  }*/
    
      add(name: string){
        const hero: Hero ={ name, id:0};
        this.heroService.add(hero).subscribe(response=> {
          this.getHeroes();
          if(response.exito===1){
            console.log('Datos insertados');
            
          }
        });
      }

  

  delete(hero: Hero): void {

    this.heroService.delete(hero.id).subscribe(response=> {
      this.getHeroes();
      if(response.exito===1){
        console.log('Eliminado');
        }

    });
  
  

}
}