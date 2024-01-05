import { Approvers } from "./approvers";

export class PTMOwner{
  id: number;
  valueId: string;
  ba?: string;
  bicsw?: string;
  vatRate?: number;
  isStaff: boolean;
  vatNumber?: string;
  approver?: Approvers;
  constructor
      (
        id: number,
        valueId: string,
        ba: string,
        bicsw: string,
        vatRate: number,
        isStaff: boolean,
        vatNumber: string,
        approver: Approvers,
      ){
          this.id=id,
          this.valueId=valueId,
          this.ba=ba,
          this.bicsw=bicsw,
          this.vatRate=vatRate,
          this.isStaff=isStaff,
          this.vatNumber=vatNumber,
          this.approver=approver
      }
}
