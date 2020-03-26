import { Component, OnInit } from '@angular/core';
import { CurrentSessionService } from 'src/app/services/current-session.service';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {
  private _texts: FormArray;
  private _images: FormArray;
  private _projectForm: FormGroup;

  public submitText: string = 'Submit';
  public disabled: boolean = false;

  constructor(
    private currentSessionService: CurrentSessionService,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private location: Location,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm();
  }

  get projectForm(): FormGroup {
    return this._projectForm;
  }

  private createForm(): void {
    this._projectForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      mainImage: ['', [Validators.required]],
      texts: this.fb.array([
        this.fb.group({
          text: ['', [Validators.required]]
        })
      ]),
      images: this.fb.array([
        this.fb.group({
          image: ['', [Validators.required]]
        })
      ])
    });

    this._texts = this.texts;
    this._images = this.images;
  }

  get texts(): FormArray {
    return this._projectForm.get('texts') as FormArray;
  }

  get images(): FormArray {
    return this._projectForm.get('images') as FormArray;
  }

  public addImage(): void {
    this._images.push(this.createImage(''));
  }

  public createImage(image: String): FormGroup {
    return this.fb.group({
      image: [image, [Validators.required]]
    });
  }

  public deleteImage(index: number): void {
    this.delete('images', index);
  }

  public addText(): void {
    this._texts.push(this.createText(''));
  }

  public createText(text: String): FormGroup {
    return this.fb.group({
      text: [text, [Validators.required]]
    });
  }

  public deleteText(index: number): void {
    this.delete('texts', index);
  }

  private delete(controlName: string, index: number): void {
    (this._projectForm.controls[controlName] as FormArray).removeAt(index);
  }

  public submit(): void {
    this.disabled = true;
    this.submitText = 'Submitting.';
    const handle = setInterval(() => {
      this.submitText = /\.{3}/.test(this.submitText) ? 'Submitting.' : this.submitText + '.';
    }, 250);
    setTimeout(() => {
      clearInterval(handle);
      this.submitText = 'Done!';
      this.disabled = false;
    }, 3000);
  }
}
