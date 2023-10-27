import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CampusModel } from 'src/app/data/models/campus.models';

import { LocationService } from 'src/app/services/location.service';
import { RoutesService } from 'src/app/services/routes.service';

@Component({
  selector: 'app-new-route',
  templateUrl: './new-route.component.html',
  styleUrls: ['./new-route.component.css'],
})
export class NewRouteComponent {
  public campus: CampusModel[] = [];

  public routeForm: FormGroup = this.fb.group({
    routeName: ['', Validators.required],
    idCampus: ['', Validators.required],
  });

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private _locationService: LocationService,
    private _routeService: RoutesService
  ) {}
  ngOnInit(): void {
    this.loadMunicipalities();
  }

  loadMunicipalities() {
    this._locationService.getMunicipalitiesOnCampus().subscribe(
      (campus) => {
        this.campus = campus;
      },
      (error) => {
        console.error('Error al obtener la lista de municipios:', error);
      }
    );
  }

  createRoue() {
    const data = this.routeForm.value;
    this._routeService.createRoute(data).subscribe(
      ( data: any ) => {
        if( data.message ){
          const successMessage = data.message;

        this.toastr.success(successMessage, 'Guardado');
        this.routeForm.reset();
        } else {
          this.toastr.error('Error inesperado, intente de nuevo', 'Error');
        }
      },
      (err) => {
        this.toastr.error(err.error.error || 'Error inesperado, intente de nuevo', 'Error');
      }
    );
  }
}
