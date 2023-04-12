export class OERPCode{
  id: number;
  value: string;
  isActive: boolean;
  constructor
      (
      id: number,
      value: string,
      isActive: boolean,
      ){
          this.id=id,
          this.value=value,
          this.isActive=isActive
      }
}
