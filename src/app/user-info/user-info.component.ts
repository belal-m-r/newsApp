import { Component, OnInit } from '@angular/core';
import { ShowToggleService } from '../services/show-toggle.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor(private toggleService : ShowToggleService) { }

  ngOnInit() {
  }

  showGrid() {
    this.toggleService.showGrid();
  }

  showList() {
    this.toggleService.showList();
  }
}
