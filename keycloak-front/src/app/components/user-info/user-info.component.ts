import { Component, OnInit } from '@angular/core';

import { UserInfoService } from '../../services/user-info.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.styl']
})
export class UserInfoComponent implements OnInit {
  info: any = null;

  constructor(private userInfo: UserInfoService) { }

  async ngOnInit(): Promise<void> {
    this.info = await this.userInfo.requestUserInfo();
    
    console.log('userinfo', this.info);
  }
}
