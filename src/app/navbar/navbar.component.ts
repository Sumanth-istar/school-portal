import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/authService/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() first_name: String;
  @Input() avatar: String;
  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit() {
  }

  public logout() {

    this.auth.logout();
    this.router.navigate(['../login'], { relativeTo: this.route });

  }

}
