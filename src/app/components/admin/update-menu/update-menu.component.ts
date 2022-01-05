import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-update-menu',
  templateUrl: './update-menu.component.html',
  styleUrls: ['./update-menu.component.scss']
})
export class UpdateMenuComponent implements OnInit {

  menuFromDb = Array();
  editField: string | undefined;

  constructor(private router: Router, private userService: UserServiceService) { }

  async ngOnInit(): Promise<void> {
    this.menuFromDb.length = 0;
     await this.getMenu();
  }

  async getMenu()
  {
     await this.userService.getMenu().then(data=>
      {
        console.log("Data is:", data)
        this.menuFromDb = data;
      });
  }

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.menuFromDb[id][property] = editField;
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

  async updateMenu()
  {
    console.log("New Menu in compo:", this.menuFromDb)
    await this.userService.updateMenuCollection(this.menuFromDb).then(data=>
      {
      });
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
