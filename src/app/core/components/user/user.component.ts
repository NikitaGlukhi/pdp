import { Input, Component } from '@angular/core';
import { IUser } from '../../models';

@Component({
  selector: 'user-data',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  @Input() user?: IUser;
  @Input() isCurrentUser?: boolean;
}
