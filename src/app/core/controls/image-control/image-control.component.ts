import { Input, forwardRef, Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { tap, Observable } from 'rxjs';

@Component({
  selector: 'image-control',
  templateUrl: './image-control.component.html',
  styleUrls: ['./image-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageControlComponent),
      multi: true,
    },
  ],
})
export class ImageControlComponent implements ControlValueAccessor {
  @Input() uploader: Uploader;
  url: string | null = null;
  file: File | null = null;
  disabled = false;
  private onChange?: (value) => unknown;
  private onTouched = () => {};

  registerOnChange(onChangeMethod: () => unknown): void {
    this.onChange = onChangeMethod;
  }

  registerOnTouched(onTouchedMethod: () => unknown): void {
    this.onTouched = onTouchedMethod;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  writeValue(value: any): void {
    this.url = value;
  }

  onAddFile(event: Event): void {
    this.file = (event.target as HTMLInputElement).files?.[0] || null;

    if (this.file) {
      this.uploader.uploadFile(this.file)
        .pipe(
          tap(result => {
            this.url = result.url;
            if (this.onChange) {
              this.onChange(this.url);
            }
          }),
        ).subscribe();
    }
  }

  clear() {
    this.url = null;
    if (this.onChange) {
      this.onChange(this.url);
    }
  }
}

export interface Uploader {
  uploadFile(file: File): Observable<{url: string;}>;
}
