import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Variables d'état pour le thème
  private darkTheme: boolean = false;
  private cardBorder: boolean = true;
  private rtlEnabled: boolean = false;

  constructor() { }

  // Vérifie si le thème sombre est activé
  isDark(): boolean {
    return this.darkTheme;
  }

  // Permet de basculer le thème sombre
  toggleDarkTheme(): void {
    this.darkTheme = !this.darkTheme;
  }

  // Vérifie si la bordure de carte est activée
  isCardBorder(): boolean {
    return this.cardBorder;
  }

  // Permet de basculer l'affichage de la bordure de carte
  toggleCardBorder(): void {
    this.cardBorder = !this.cardBorder;
  }

  // Vérifie si le mode RTL est activé
  isRTLEnabled(): boolean {
    return this.rtlEnabled;
  }

  // Permet de basculer le mode RTL
  toggleRTL(): void {
    this.rtlEnabled = !this.rtlEnabled;
  }
}
