import { Input, Output, OnInit, Component, EventEmitter } from '@angular/core';
import { IUser } from '../../models';

declare global {
  interface Object {
    addFollower(userId: string): void;
  }
}

@Component({
  selector: 'user-data',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  @Input() user?: IUser;
  @Input() isCurrentUser?: boolean;

  @Output() followed = new EventEmitter<string>();

  protected readonly Object = Object;

  ngOnInit(): void {
    const componentContext = this;

    Object.prototype.addFollower = function(userId: string): void {
      componentContext.followed.emit(userId); // emitter will be parsed on parent component

      new UserComponent().followed.emit(userId) // emitter won't be passed on parent component, because it was emitted on the copy of UserComponent was created
    }
  }
}
