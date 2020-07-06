import { Component, OnInit, ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';
import { Customer } from '../../models/customer.model';
import { LocalStorageService } from '../../service/local-storage.service';

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

  customers: Customer[];
  urlCustomerId: number;

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


  constructor(private lsService: LocalStorageService, 
    private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.getCustomerById();
    this.getCustomerDetails();

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

  getCustomerById() {
    this.route.params.subscribe(params => {
      this.urlCustomerId = Number(params.customerId);
    });
  }

  getCustomerDetails() {
    const customers = this.lsService.getCustomers();

    const findCustomer = customers.find(customer => customer.id === this.urlCustomerId);
    this.customer = findCustomer;
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
