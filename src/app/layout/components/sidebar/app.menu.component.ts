import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../../service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
                    { label: 'Business Request', icon: 'pi pi-fw pi-shopping-bag', routerLink: ['/business-request'] },
                    {
                        label: 'Settings', icon: 'pi pi-fw pi-cog',
                        items: [
                            {
                                label: 'Data Type', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Company', icon: 'pi pi-fw pi-bookmark', routerLink: ['/company'] },
                                    { label: 'Department', icon: 'pi pi-fw pi-bookmark', routerLink: ['/department'] },
                                    { label: 'Approver', icon: 'pi pi-fw pi-bookmark', routerLink: ['/approver'] },
                                    { label: 'Profile', icon: 'pi pi-fw pi-bookmark', routerLink: ['/profile'] },
                                    { label: 'PTM Owner', icon: 'pi pi-fw pi-bookmark', routerLink: ['/ptm-owner'] },
                                    { label: 'Type', icon: 'pi pi-fw pi-bookmark', routerLink: ['/type'] },
                                    { label: 'Level', icon: 'pi pi-fw pi-bookmark', routerLink: ['/level'] },
                                    { label: 'Category', icon: 'pi pi-fw pi-bookmark', routerLink: ['/category'] },
                                    { label: 'Place Of Delivery', icon: 'pi pi-fw pi-bookmark', routerLink: ['/place-of-delivery'] },{ label: 'Subcontractor', icon: 'pi pi-fw pi-bookmark', routerLink: ['/subcontractor'] }
                                ]
                            }
                        ]
                    }
                ]
            }
        ];
    }
}
