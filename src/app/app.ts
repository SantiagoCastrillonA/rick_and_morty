import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { Character } from './models/character.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  public characters: Character[] = [];
  private currentPage = 1;
  private isLoading = false;
  private hasMore = true;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadCharacters();
  }

  private loadCharacters(): void {
    if (this.isLoading || !this.hasMore) return;
    this.isLoading = true;
    this.apiService.getCharacters(this.currentPage).subscribe(data => {
      this.characters.push(...data);
      this.isLoading = false;
      if (data.length < 20) {
        this.hasMore = false;
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (scrollTop + windowHeight >= documentHeight - 100 && this.hasMore && !this.isLoading) {
      this.currentPage++;
      this.loadCharacters();
    }
  }
}
