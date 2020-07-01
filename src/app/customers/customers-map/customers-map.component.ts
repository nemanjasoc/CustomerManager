import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { Customer } from '../../models/customer.model';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';

@Component({
    templateUrl: './customers-map.component.html',
    styleUrls: ['./customers-map.component.scss']
})
export class CustomersMapComponent implements OnInit {
    customers: Customer[] = [];

    @ViewChild(GoogleMap, { static: false }) map: GoogleMap
    @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow
  
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
  
  
    constructor(private lsService: LocalStorageService) { }
    
  
    ngOnInit(): void {
        this.customers = this.lsService.getCustomers();
  
        navigator.geolocation.getCurrentPosition(position => {
            this.center = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            }
        })

        setTimeout(() => {
            this.addMarkers();
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
  
    addMarkers() {
        for (let i = 0; i < this.customers.length; i++) {
            let currentCustomer = this.customers[i];
        
            this.markers.push({
                position: {
                    lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
                    lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
                },
                title: 'Marker title ' + (this.markers.length + 1),
                info: `Customer Name: ${currentCustomer.firstName} ${currentCustomer.lastName}, Customer Address: ${currentCustomer.address},  ${currentCustomer.city}, ${currentCustomer.state}`
            })
        }
    }
  
    openInfo(marker: MapMarker, content) {
        this.infoContent = content
        this.info.open(marker)
    }
}
