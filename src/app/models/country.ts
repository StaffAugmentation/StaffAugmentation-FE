export class Country{
  id: number;
  countryName: string;
  isVisible: boolean;
  hotelCeiling?: number;
  dailyAllowance?: number;
  constructor
      (
      id: number,
      countryName: string,
      hotelCeiling: number,
      dailyAllowance: number,
      isVisible: boolean
      ){
          this.id=id,
          this.countryName=countryName,
          this.hotelCeiling=hotelCeiling,
          this.dailyAllowance=dailyAllowance,
          this.isVisible=isVisible
      }
}
