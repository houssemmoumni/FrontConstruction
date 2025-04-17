import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Injectable({ providedIn: 'root' })
export class IncidentCategoryService {
  private model: tf.LayersModel | null = null;
  private categories = ['STRUCTURE', 'ELECTRIQUE', 'PLOMBERIE', 'SECURITE', 'MATERIEL', 'PLANIFICATION'];
  private keywords = {
    STRUCTURE: ['fissure', 'fondation', 'poutre', 'béton', 'mur', 'charpente', 'acier', 'ossature'],
    ELECTRIQUE: ['câble', 'tableau', 'court-circuit', 'électricité', 'lumière', 'disjoncteur', 'prise', 'tension'],
    PLOMBERIE: ['tuyau', 'fuite', 'eau', 'sanitaire', 'évacuation', 'robinet', 'chaudière', 'canalisation'],
    SECURITE: ['EPI', 'échafaudage', 'chute', 'protection', 'casque', 'harnais', 'danger', 'signalisation'],
    MATERIEL: ['engin', 'pelleteuse', 'outil', 'bétonnière', 'grue', 'compresseur', 'scie', 'échafaudage'],
    PLANIFICATION: ['délai', 'calendrier', 'plan', 'organisation', 'rendez-vous', 'réunion', 'contrat', 'permis']
  };

  constructor() {
    this.loadModel();
  }

  private async loadModel() {
    try {
      this.model = await tf.loadLayersModel('/assets/models/construction-category-model.json');
    } catch (error) {
      console.warn('Utilisation du système par mots-clés pour la catégorisation');
    }
  }

  async detectCategory(description: string): Promise<{ category: string, confidence: number }> {
    if (!description.trim()) return { category: 'SECURITE', confidence: 0 };

    if (this.model) {
      try {
        const input = this.preprocessText(description);
        const prediction = this.model.predict(input) as tf.Tensor;
        const values = await prediction.data();
        const maxIndex = values.indexOf(Math.max(...values));
        const confidence = Math.round(values[maxIndex] * 100);
        input.dispose();
        prediction.dispose();
        return { category: this.categories[maxIndex], confidence };
      } catch (e) {
        console.error('Échec de la prédiction de catégorie:', e);
      }
    }

    return this.keywordDetection(description.toLowerCase());
  }

  private keywordDetection(text: string): { category: string, confidence: number } {
    const matches = this.categories.map(cat => ({
      category: cat,
      count: this.countMatches(text, this.keywords[cat as keyof typeof this.keywords])
    }));

    const bestMatch = matches.reduce((prev, current) =>
      (prev.count > current.count) ? prev : current
    );

    return {
      category: bestMatch.count > 0 ? bestMatch.category : 'SECURITE',
      confidence: Math.min(30 + (bestMatch.count * 20), 90)
    };
  }

  private countMatches(text: string, keywords: string[]): number {
    return keywords.filter(kw => text.includes(kw)).length;
  }

  private preprocessText(text: string): tf.Tensor {
    const features = [
      text.length / 200,
      (text.match(/\!/g) || []).length / 3,
      (text.split(/\s+/).length) / 40,
      (text.match(/urgent|important|critique/g) || []).length / 2
    ];
    return tf.tensor2d([features]);
  }
}
