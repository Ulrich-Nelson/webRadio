import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthConstants } from '../config/auth-constants';
import { StorageCutomerService } from '../services/storage-cutomer.service';

@Injectable({
  providedIn: 'root'
})

//Vérifier que l'utilisateur est connecté et le rediriger à la page de souscription si pas encore abonné.
export class AddCardGuard implements CanActivate {

  constructor(private storageService: StorageCutomerService, private router: Router ){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error('Method not implemented.');
  }
  CanActivate(): Promise<boolean>{
    return new Promise<boolean>((resolve) => {
      this.storageService.get(AuthConstants.AUTH).then(( res) =>{
        if (res) {
          resolve(true);
          console.log(res)
        } else {
          this.router.navigateByUrl('home')
          resolve(false);
          
        }
      }).catch((err) => {
        resolve(false);
      })
    });

  }
  
}
