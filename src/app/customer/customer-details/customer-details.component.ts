import { Component, OnInit, ViewChild  } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { CustomerEditDialogComponent } from '../customer-edit-dialog/customer-edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';
import { CommunicationService } from 'src/app/service/communication.service';

@Component({
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  customer: Customer =
  {
    id: null,
    firstName: '',
    lastName: 'male',
    gender: '',
    email: '',
    address: '',
    city: '',
    state: ''
  }
  customers: Customer[] = [];

  zoom = 7
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
      zoomControl: false,
      scrollwheel: false,
      disableDoubleClickZoom: true,
      mapTypeId: 'roadmap',
      maxZoom: 18,
      minZoom: 4,
  }
  markers = [];
  infoContent: string;

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow


  constructor(public dialog: MatDialog, 
    public communicationService: CommunicationService,
    private lsService: LocalStorageService) {}


  ngOnInit(): void {
    this.customer = this.lsService.getCustomerDetails();

    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
      }
    })

    setTimeout(() => {
      this.addMarker();
    }, 1000);
    
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--
  }

  click(event: google.maps.MouseEvent) {
    console.log(event)
  }

  addMarker() {
    this.markers.push({
      position: {
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
      },
      info: `Customer Name: ${this.customer.firstName} ${this.customer.lastName}, Customer Address: ${this.customer.address},  ${this.customer.city}, ${this.customer.state}`
    })
    
  }

  openInfo(marker: MapMarker, content) {
    this.infoContent = content
    this.info.open(marker)
  }
  
}
