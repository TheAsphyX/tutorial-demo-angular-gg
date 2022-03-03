import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, interval, map, Observable, switchMap, take, tap } from 'rxjs';
import { Message } from 'src/app/model/message';
import { MessageService } from 'src/app/services/message.service';
import { fromEvent } from 'rxjs';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.scss']
})
export class MessageDetailComponent implements OnInit {

  message?: Message;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly messageService: MessageService,
    private readonly router: Router,
    private readonly titleService: TitleService
    ) { }

  ngOnInit(): void {

    fromEvent(document, 'click').subscribe(() => console.log('Clicked!'));

    
      const observable = new Observable((subscriber) => {
        subscriber.next(10);
        subscriber.next(20);
      }); 
 
observable.subscribe(x => console.log(x));

    const obs = interval(500)
           .pipe(
               take(5),
               map(i => 2 * i ) 
           );

           obs.subscribe(x => console.log(x))

    this.route.params
      .pipe(
        switchMap(params => this.messageService.get(+params['id'])),
        catchError(err => {
          console.error('sbagliato '+err)
          this.router.navigate(['/']);
          throw err;
        }),
        map((message: Message) =>{
          this.titleService.title.next(`Messaggio ${message.id}`);
          this.message = message;
        } )
      )
      .subscribe();

  }

  delete(message: Message): void {
    this.messageService.remove(message.id)
      .subscribe(
        () => {
          console.log(`${message.title} rimosso!`);
          this.router.navigate(['/']);

        },
        err => console.error(err)
      );
  }

}
