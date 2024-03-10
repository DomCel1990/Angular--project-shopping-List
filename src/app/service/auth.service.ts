import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, catchError, tap, throwError } from "rxjs";
import { User } from "../model/user.model";
import { Router } from "@angular/router";
export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // user = new Subject<User>();
    user = new BehaviorSubject<User>(null);
    private timeOut: any;
  
    constructor(
        private http: HttpClient,
        private route: Router
        ) { }

    loginUser(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDuDUkGdxF8wInJIRXE7h7qW75HaZsKrvE',
            {
                email: email,
                password: password,
                token: true
            }
        ).pipe(
            catchError(this.heandelError),
            tap(responseData => {        
                this.HandleAutentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn)
            })
        )
    }

    private HandleAutentication(email: string, id: string, token: string, expiresIn: number) {
   console.log(expiresIn);
   
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        this.autoLogout(expiresIn * 1000);
        const userEmit = new User(email, id, token, expirationDate);
        this.user.next(userEmit);
        localStorage.setItem('userData', JSON.stringify(userEmit));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDuDUkGdxF8wInJIRXE7h7qW75HaZsKrvE',
            {
                email: email,
                password: password,
                token: true
            }
        )
            .pipe(
                catchError(this.heandelError),
                tap(responseData => {
                    this.HandleAutentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn)
                })
            )
    }

    logout() {
        this.user.next(null);
        this.route.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.timeOut) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = null;
    }

    autoLogout(expirationDuration: number) {
       this.timeOut = setTimeout(() => {
            this.logout();
        }, expirationDuration)
    }

    autoLogin() {
        const userData: {
             email: string;
             id: string;
             _token: string;
             _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }
        const loadUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if(loadUser.token) {
            this.user.next(loadUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    private heandelError(errror: HttpErrorResponse) {
        let errorMessage = 'An unknow error occurred!'
        if (!errror.error || !errror.error.error) {
            return throwError(errorMessage);
        }
        switch (errror.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exist already'
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'The password is invalid or the user does not have a password.'
                break;
            case 'INVALID_LOGIN_CREDENTIALS':
                errorMessage = 'Invalidi login credentials.'
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage = 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.'
        }
        return throwError(errorMessage);
    }
}