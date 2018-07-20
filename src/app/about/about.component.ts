import {Component, OnInit} from '@angular/core';

import {Leader} from '../shared/leader';
import {LeaderService} from '../services/leader.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { flyInOut, expand } from '../animations/app.animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [   flyInOut(), expand()]
})
export class AboutComponent implements OnInit {
  leaders: Leader[];

  constructor(private leaderService: LeaderService) {
  }

  ngOnInit() {
    this.leaderService.getLeaders()
    .subscribe(leaders => this.leaders = leaders);
  }
}
