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


  getNavBarItems(type) {
    let navBarItems = []
    switch (type) {
      case 'STUDENT':
        navBarItems = ['HOME', 'ATTENDANCE', 'SCORE']
        return navBarItems;
      case 'ACCOUNTANT':
        navBarItems = ['HOME', 'PLAYMENT']
        return navBarItems;
      case 'PRINCIPAL':

        return;
      case 'LIBRARIAN':

        return navBarItems;
      case 'TRACHER':
        navBarItems = ['HOME', 'UPDATE CLASS ATTENDANCE', 'UPDATE CLASS SCORE']
        return navBarItems;
      case 'GUARDIAN':
        navBarItems = ['HOME', 'ATTENDANCE', 'SCORE', 'TRACHER FEEDBACK']
        return navBarItems;
      default:
        return navBarItems;


    }

  }

  ngOnInit() {
  }

  public logout() {

    this.auth.logout();
    this.router.navigate(['../login'], { relativeTo: this.route });

  }

}
