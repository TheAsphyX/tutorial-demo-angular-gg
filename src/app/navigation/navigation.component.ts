import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { TitleService } from '../services/title.service';
import { Authentication } from '../model/authentication';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit {

  title: string = '';
  user: string='';
  auth: Authentication= {
    username: '',
    loginDate: new Date,
    expirationDate: new Date
  };


  constructor(
    private readonly titleService: TitleService,
    private readonly authenticationService: AuthenticationService, 
    private readonly ref: ChangeDetectorRef
  ) { 

  
   }

  ngOnInit(): void {
    this.titleService.title
      .pipe(
        map(title => {
          this.title = title;
          this.ref.detectChanges();
        })
      )
      .subscribe();

      this.auth = this.authenticationService.getAuthentication() as Authentication;

      this.user = this.auth.username;
     
    
  }

}