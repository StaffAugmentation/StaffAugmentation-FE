export class Recruitment{
  id: number;
  responsibleName?: string;
  responsibleEmail?: string;
  isPartner: boolean=false;
  typeOfContractId?: number;
  constructor
      (
      id: number,
      responsibleName : string,
      responsibleEmail: string,
      ){
          this.id=id,
          this.responsibleName =responsibleName,
          this.responsibleEmail=responsibleEmail
      }
}
