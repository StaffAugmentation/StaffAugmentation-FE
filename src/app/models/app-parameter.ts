export class AppParameter{
  id: number;
  qtmDailyPriceIsActive?: boolean;
  tmDailyPriceIsActive?: boolean;
  daysBeforeDeletingFile?: number;
  sAUrlAppProd?: string;
  saEmail?: string;
  brAdvancedSearchDate?: number;
  scAdvancedSearchPeriod?: number;
  hrEmailSubject?: string;
  hrEmailText?: string;
  consultantEmailSubject?: string;
  consultantEmailText?: string;
  sAVersion?: string;
  useLDAPService?: boolean;
  contractApprover?: string;
  contractApproverEmail?: string;
  constructor(id:number){
    this.id=id;
  }
}
