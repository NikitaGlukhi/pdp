import { OnInit, Component, Output, EventEmitter } from '@angular/core';
import { UntypedFormGroup, FormBuilder, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'add-post-modal',
  templateUrl: './add-post.component.html',
})
export class AddPostComponent implements OnInit {
  @Output() response = new EventEmitter<{ text: string, isFeatured: boolean }>();

  form?: UntypedFormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly activeModal: NgbActiveModal,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      text: ['', Validators.required],
      featured: [false],
    });
  }

  submit(): void {
    const value = this.form?.value;
    this.response.emit({ text: value.text, isFeatured: value.featured });
    this.close();
  }

  close(): void {
    this.activeModal.close();
  }
}
