export class Department{
  Id: number;
  ValueId: number;
  isActive: boolean;
  constructor
      (
      Id: number,
      ValueId: number,
      isActive: boolean,
      ){
          this.Id=Id,
          this.ValueId=ValueId,
          this.isActive=isActive
      }
}
