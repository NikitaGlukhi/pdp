import {Component, EventEmitter, OnInit, Output, SecurityContext} from '@angular/core';
import {FormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {unsubscribeMixin} from '../../../core/mixins';

@Component({
  selector: 'add-post-modal',
  templateUrl: './add-post.component.html',
})
export class AddPostComponent extends unsubscribeMixin() implements OnInit {
  @Output() response = new EventEmitter<{ text: string, isFeatured: boolean }>();

  form?: UntypedFormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly activeModal: NgbActiveModal,
    private readonly sanitizer: DomSanitizer,
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      text: ['', Validators.required],
      featured: [false],
    });
  }

  submit(): void {
    const value = this.form?.value;
    let safeText = this.sanitizer.sanitize(SecurityContext.HTML, value.text);
    safeText = this.sanitizer.sanitize(SecurityContext.URL, safeText);
    safeText = this.sanitizer.sanitize(SecurityContext.SCRIPT, safeText);

    this.response.emit({ text: safeText || '', isFeatured: value.featured });
    this.close();
  }

  close(): void {
    this.activeModal.close();
  }
}
