export class Recruitment{
  id: number;
  name?: string;
  email?: string;
  isPartner: boolean=false;
  typeOfContractId?: number;
  constructor
      (
      id: number,
      name : string,
      email: string,
      ){
          this.id=id,
          this.name =name,
          this.email=email
      }
}
