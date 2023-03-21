export class PTMOwner{
  id: number;
  valueId: string;
  ptmOwnerBA: string;
  ptmOwnerBICSW: string;
  ptmOwnerVatRate: number;
  isEveris: boolean;
  idApprover: number;
  ptmOwnerVatNumber: string;
  constructor
      (
        id: number,
        valueId: string,
        ptmOwnerBA: string,
        ptmOwnerBICSW: string,
        ptmOwnerVatRate: number,
        isEveris: boolean,
        idApprover: number,
        ptmOwnerVatNumber: string,
      ){
          this.id=id,
          this.valueId=valueId,
          this.ptmOwnerBA=ptmOwnerBA,
          this.ptmOwnerBICSW=ptmOwnerBICSW,
          this.ptmOwnerVatRate=ptmOwnerVatRate,
          this.isEveris=isEveris,
          this.idApprover=idApprover,
          this.ptmOwnerVatNumber=ptmOwnerVatNumber
      }
}
