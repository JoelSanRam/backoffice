import { Component } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from './core/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  time;

  constructor(
    private idle: Idle, 
    private keepalive: Keepalive,
    private router: Router,
    private auth: AuthService,
    private title: Title
    ) {
    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(300);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(1350);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => { 
      this.idleState = 'No longer idle.'
      console.log(this.idleState);
      this.reset();
    });
    
    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      console.log(this.idleState);
      // auth.logout()
      // this.router.navigate(['/login']);
    });
    
    idle.onIdleStart.subscribe(() => {
        this.idleState = 'You\'ve gone idle!'
        console.log(this.idleState);
      });
      
      idle.onTimeoutWarning.subscribe((countdown) => {
        this.time = countdown
        this.idleState = 'You will time out in ' + countdown + ' seconds!'
        // console.log(this.idleState);
        this.setTitle();
    });

    // sets the ping interval to 15 seconds
    keepalive.interval(15);

    keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.reset();
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  setTitle(): void {
    if(this.router.url == '/login'){
      this.title.setTitle(`Backoffice`);
      return
    } else{
      this.title.setTitle(`Backoffice: ${this.time} restante`);
    }
  }

}
