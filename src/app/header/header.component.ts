import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { faHiking, faUser } from '@fortawesome/free-solid-svg-icons'
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { TokenStorageService } from '../_common/_services/_jwt/token-storage.service';
import { LoginComponent } from '../login/login.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: any;
  private roles: string[] = [];

  isLoggedIn!: boolean;

  showAdminBoard = false;
  showMemberBoard = false;
  pseudo?: string;

  modalRef?: BsModalRef;

  constructor(private library: FaIconLibrary,
    private tokenStorageService: TokenStorageService,
    private modalService: BsModalService
    ) {
    library.addIcons(faHiking, faUser);
  }

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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.logout();
    this.modalRef?.hide();
  }
 
  decline(): void {
    this.modalRef?.hide();
  }

}
