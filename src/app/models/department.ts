export class Department{
  id: number;
  valueId: string;
  isActive: boolean;
  constructor
      (
      id: number,
      valueId: string,
      isActive: boolean,
      ){
          this.id=id,
          this.valueId=valueId,
          this.isActive=isActive
      }
}
