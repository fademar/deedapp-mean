import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private titleService: Title, public auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.titleService.setTitle('HOME - Russian Deeds App');

    if (this.auth.isAuthenticated) {
      this.router.navigate(['/list']);
    }
  }

}
