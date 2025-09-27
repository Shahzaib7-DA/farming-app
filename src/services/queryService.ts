import localDB from '@/data/localDB.json';
import { QueryResponse } from '@/types/farmer';

export class QueryService {
  // Offline query matching
  static getOfflineResponse(query: string): string {
    const lowercaseQuery = query.toLowerCase();
    
    for (const faq of localDB.faqs) {
      if (faq.keywords.some(keyword => lowercaseQuery.includes(keyword))) {
        return faq.response;
      }
    }
    
    return "I don't have information about this in offline mode. Please try when you're online for more detailed assistance.";
  }

  // Mock online API
  static async getOnlineResponse(query: string): Promise<string> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const lowercaseQuery = query.toLowerCase();
    
    // Enhanced responses for online mode
    if (lowercaseQuery.includes('yellow') && lowercaseQuery.includes('paddy')) {
      return "Your paddy crop may have nitrogen deficiency. Apply urea fertilizer (50-60 kg per acre). Also check soil pH - it should be 6.0-7.0. Consider getting a soil test done for precise nutrient management.";
    }
    
    if (lowercaseQuery.includes('pest') || lowercaseQuery.includes('insect')) {
      return "For integrated pest management: 1) Use pheromone traps 2) Apply neem oil spray (5ml/liter water) 3) Release beneficial insects like Trichogramma. Contact your nearest Krishi Vigyan Kendra for specific guidance.";
    }
    
    if (lowercaseQuery.includes('water') || lowercaseQuery.includes('irrigation')) {
      return "Optimal water management: Maintain 2-3 cm standing water. Use alternate wetting and drying (AWD) technique to save 25-30% water. Install piezometer tubes to monitor water levels.";
    }
    
    // Fallback to offline response with online enhancement
    const offlineResponse = this.getOfflineResponse(query);
    return offlineResponse + " [Enhanced online guidance: Contact your local agricultural extension officer for personalized advice]";
  }

  static async processQuery(query: string, isOnline: boolean): Promise<QueryResponse> {
    const response = isOnline 
      ? await this.getOnlineResponse(query)
      : this.getOfflineResponse(query);
    
    return {
      id: Date.now().toString(),
      query,
      response,
      timestamp: new Date(),
      source: isOnline ? 'online' : 'offline'
    };
  }
}