import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataStoregeService } from "../service/data-storage.service";
import { AuthService } from "../service/auth.service";
import { User } from "../model/user.model";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAutentucate = false;
    user: User
    private userSub: Subscription;
    collapsed = true;

    constructor(
        private dataHttp: DataStoregeService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe(user => {
            this.isAutentucate = !user ? false : true;
            console.log(!user);
            console.log(!!user);

            // this.user = user;
        })
    }

    onSaveRecepie() {
        this.dataHttp.storeRecepie();
    }

    onFechData() {
        this.dataHttp.ferchData().subscribe();
    }

    logout() {
        this.authService.logout();
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
}