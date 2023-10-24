import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-header-administration',
  templateUrl: './header-administration.component.html',
  styleUrls: ['./header-administration.component.css']
})
export class HeaderAdministrationComponent {
  public userName!: string | null; // Declarar una variable para almacenar el userName
constructor(
  private authService: AuthService
){}

ngOnInit() {
  // Obtener el userName del servicio AuthService
  const tokenInfo = this.authService.getTokenInfo();
  this.userName = tokenInfo ? tokenInfo.userName : null;
}
}
