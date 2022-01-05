import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-menu',
  templateUrl: './update-menu.component.html',
  styleUrls: ['./update-menu.component.scss']
})
export class UpdateMenuComponent implements OnInit {

  menuFromDb = Array();
  editField: any;
  editPrice = 0;

  constructor(private router: Router, private userService: UserServiceService,
    private toastr: ToastrService) { }

  async ngOnInit(): Promise<void> {
    this.menuFromDb.length = 0;
     await this.getMenu();
  }

  async getMenu()
  {
     await this.userService.getMenu().then(data=>
      {
        this.menuFromDb = data;
      });
  }

  updateList(id: number, property: any, event: any) {
    const editField = event.target.textContent;
    this.menuFromDb[id][property] = editField;
  }

  changeValue(id: number, property: any, event: any) {
    this.editField = event.target.textContent;
  }

  updatePrice(id: number, property: any, event: any) {
    const editPrice = event.target.textContent;
    this.menuFromDb[id][property] = +editPrice;
  }

  changePrice(id: number, property: any, event: any) {
    this.editPrice = +event.target.textContent;
  }

  async updateMenu()
  {
    await this.userService.updateMenuCollection(this.menuFromDb).then(data=>
      {
      });
      this.toastr.success('Menu Updated');
      this.router.navigate(['admin-home']);
  }

  addItem()
  {
    this.menuFromDb.push({itemName: '', price: 0, quantity: 0, amount: 0});
  }

  deleteExistingItem(id: number)
  {
    this.menuFromDb.splice(id, 1);
  }
}
