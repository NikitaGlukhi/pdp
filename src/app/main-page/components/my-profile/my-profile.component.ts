import { Input, OnInit, Component } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { IUser } from '../../../core/models';

@Component({
  selector: 'my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  @Input() user?: IUser;

  form?: UntypedFormGroup;

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      fullName: [this.user?.fullName],
      nickname: [this.user?.nickname],
      email: [this.user?.email],
      phoneNumber: [this.user?.phoneNumber],
      password: [],
      photo: [this.user?.photo],
    });
  }
}
