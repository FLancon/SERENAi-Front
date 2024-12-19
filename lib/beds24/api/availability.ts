import { AxiosInstance } from 'axios';
import { ApiResponse } from '../types';

export class AvailabilityApi {
  constructor(private readonly axios: AxiosInstance) {}

  /**
   * Get availability for a property
   * @param {number} propertyId - Property ID
   * @param {Date} startDate - Start date
   * @param {Date} endDate - End date
   */
  async getAvailability(
    propertyId: number,
    startDate: Date,
    endDate: Date
  ): Promise<ApiResponse<any>> {
    try {
      const { data } = await this.axios.get('/availability', {
        params: {
          propertyId,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString()
        }
      });
      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): Error {
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 404:
          throw new Error('Property not found');
        case 429:
          throw new Error('Rate limit exceeded');
        default:
          throw new Error(data.message || 'An error occurred with the availability API');
      }
    }
    throw error;
  }
}