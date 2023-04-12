import { Approvers } from "./approvers";

export class PTMOwner{
  id: number;
  valueId: string;
  ba?: string;
  bicsw?: string;
  vatRate?: number;
  isEveris: boolean;
  vatNumber?: string;
  approver?: Approvers;
  constructor
      (
        id: number,
        valueId: string,
        ba: string,
        bicsw: string,
        vatRate: number,
        isEveris: boolean,
        vatNumber: string,
        approver: Approvers,
      ){
          this.id=id,
          this.valueId=valueId,
          this.ba=ba,
          this.bicsw=bicsw,
          this.vatRate=vatRate,
          this.isEveris=isEveris,
          this.vatNumber=vatNumber,
          this.approver=approver
      }
}
