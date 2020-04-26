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
  private _mainImage: File;
  private _sideImages: File[] = [];

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
      mainImage: [null, [Validators.required]],
      texts: this.fb.array([this.createText('')]),
      images: this.fb.array([this.createImage()])
    });

    this._texts = this.texts;
    this._images = this.images;
  }

  get mainImage() {
    return this._mainImage;
  }

  set mainImage(f: File) {
    this._mainImage = f;
  }

  get sideImages() {
    return this._sideImages;
  }

  set sideImages(files: File[]) {
    this._sideImages = files;
  }

  get texts(): FormArray {
    return this.projectForm.get('texts') as FormArray;
  }

  get images(): FormArray {
    return this.projectForm.get('images') as FormArray;
  }

  public addImage(): void {
    this._images.push(this.createImage());
  }

  public createImage(): FormGroup {
    return this.fb.group({
      image: [null, [Validators.required]]
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
  /*
  to have iamges in Base64 encoding

  const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      console.log('loading image result: ' + event.target.result);
      if (target === 'mainImage') {
        this._mainImage = event.target.result;
      } else {
         this._sideImages.push(event.target.result);
      }
    });

    reader.readAsDataURL(file);
   */

  public onFileSelected(event: any) {
    console.log(event);
    console.log(event.target.dataset.formcontrolname);
    // this.projectForm.patchValue({
    //   mainImage: event.target.files[0]
    // });
    if (event.target.dataset.formcontrolname === 'mainImage') {
      this.mainImage = event.target.files[0];
      // this.projectForm.get('mainImage').setValue(this.mainImage);
      // console.log(this.projectForm.get('mainImage'));
      // console.log(this.projectForm.get('mainImage').value);
    } else {
      this.sideImages.push(event.target.files[0]);
    }
  }

  private flushAndAssignExtraImages() {
    this.projectForm.value.mainImage = this._mainImage;
    this.projectForm.value.images = this._projectForm.value.images
      .filter((i) => i.image !== null)
      .map((image, index) => this._sideImages[index]);
  }

  public submit(): void {
    // this.disabled = true;
    this.submitText = 'Submitting';
    this.flushAndAssignExtraImages();
    const formData = new FormData();
    formData.append('title', this.projectForm.get('title').value);
    formData.append('description', this.projectForm.get('description').value);
    formData.append('mainImage', this.mainImage, this.mainImage.name);
    formData.append('texts', this.projectForm.get('texts').value);
    this.projectService.postNewProject(formData).subscribe((res) => {
      console.log(res);
      this.submitText = 'Submit';
    });
  }
}

//const handle = setInterval(() => {
//   this.submitText = /\.{3}/.test(this.submitText) ? 'Submitting.' : this.submitText + '.';
// }, 250);
// setTimeout(() => {
//   clearInterval(handle);
//   this.submitText = 'Done!';
//   this.disabled = false;
// }, 3000);
