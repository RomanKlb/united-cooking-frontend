import { Component, OnInit } from '@angular/core';
import { faHiking, faUser } from '@fortawesome/free-solid-svg-icons'
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { TokenStorageService } from '../_common/_services/token-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: any;
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showMemberBoard = false;
  pseudo?: string;

  constructor(private library: FaIconLibrary,
    private tokenStorageService: TokenStorageService) {
    library.addIcons(faHiking, faUser); }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();
      this.roles = this.user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showMemberBoard = this.roles.includes('ROLE_MEMBER');
      this.pseudo = this.user.pseudo;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
