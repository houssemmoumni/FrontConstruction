import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Injectable({ providedIn: 'root' })
export class SeverityDetectionService {
  private model: tf.LayersModel | null = null;
  private keywords = {
    HIGH: ['crash', 'urgent', 'emergency', 'stop', 'critical', 'blocked', 'down', 'broken'],
    MEDIUM: ['slow', 'problem', 'issue', 'error', 'bug', 'not working', 'failed'],
    LOW: ['suggestion', 'improvement', 'cosmetic', 'minor', 'feature', 'enhancement']
  };

  constructor() {
    this.loadModel();
  }

  private async loadModel() {
    try {
      this.model = await tf.loadLayersModel('/assets/models/severity-model.json');
    } catch (error) {
      console.warn('Using keyword fallback detection');
    }
  }

  async detectSeverity(description: string): Promise<{ severity: 'LOW' | 'MEDIUM' | 'HIGH', confidence: number }> {
    if (!description.trim()) return { severity: 'MEDIUM', confidence: 0 };

    // Try model first
    if (this.model) {
      try {
        const input = this.preprocessText(description);
        const prediction = this.model.predict(input) as tf.Tensor;
        const values = await prediction.data();
        const maxValue = Math.max(...values);
        const index = values.indexOf(maxValue);
        const severity = ['LOW', 'MEDIUM', 'HIGH'][index] as 'LOW' | 'MEDIUM' | 'HIGH';
        const confidence = Math.round(maxValue * 100);
        input.dispose();
        prediction.dispose();
        return { severity, confidence };
      } catch (e) {
        console.error('Model prediction failed:', e);
      }
    }

    // Fallback to keyword detection
    return this.keywordDetection(description.toLowerCase());
  }

  private keywordDetection(text: string): { severity: 'LOW' | 'MEDIUM' | 'HIGH', confidence: number } {
    const highMatches = this.countMatches(text, this.keywords.HIGH);
    const mediumMatches = this.countMatches(text, this.keywords.MEDIUM);
    const lowMatches = this.countMatches(text, this.keywords.LOW);

    if (highMatches > 0) return { severity: 'HIGH', confidence: Math.min(90 + (highMatches * 2), 98) };
    if (mediumMatches > 0) return { severity: 'MEDIUM', confidence: Math.min(80 + (mediumMatches * 3), 95) };
    if (lowMatches > 0) return { severity: 'LOW', confidence: Math.min(85 + (lowMatches * 3), 95) };

    return { severity: 'MEDIUM', confidence: 50 };
  }

  private countMatches(text: string, keywords: string[]): number {
    return keywords.filter(kw => text.includes(kw)).length;
  }

  private preprocessText(text: string): tf.Tensor {
    // Simple feature extraction
    const features = [
      text.length / 200,                          // Normalized length
      (text.match(/\!/g) || []).length / 5,       // Exclamation marks
      (text.split(/\s+/).length) / 50,            // Word count
      text.toLowerCase() === text ? 0 : 0.2        // Case sensitivity
    ];
    return tf.tensor2d([features]);
  }
}
