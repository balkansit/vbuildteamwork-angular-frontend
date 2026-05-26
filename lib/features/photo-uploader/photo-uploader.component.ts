import { Component, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

export interface Photo {
  id?: number;
  profile_id?: number;
  photo_url: string;
  created_at?: string;
  updated_at?: string;
  preview_url?: string;
}

@Component({
  selector: 'app-photo-uploader',
  standalone: false,
  templateUrl: './photo-uploader.component.html',
  styleUrl: './photo-uploader.component.css',
})
export class PhotoUploaderComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  deletedPhotoIds: number[] = [];

  @Input() photos: Photo[] = [];
  @Input() photoFiles: (File | null)[] = [];
  @Input() maxPhotos: number = 10;
  @Input() showSubmitbtn: boolean = true;

  @Output() photosChange = new EventEmitter<Photo[]>();
  @Output() photoFilesChange = new EventEmitter<{ newFiles: (File | null)[]; deletedPhotoIds: number[] }>();
  @Output() upload = new EventEmitter<void>();
  @Output() photoDeleted = new EventEmitter<{ index: number, photo: Photo | null, file: File | null }>();

  currentIndex: number | null = null;
  acceptedPhotos: boolean[] = [];

  ngOnInit() {
    console.log('Initial photoFiles:', this.photoFiles);
  }


  addPhotoBox() {
    if (this.photos.length < this.maxPhotos) {
      this.photos.push({ id: 0, profile_id: 0, photo_url: '', created_at: '', updated_at: '' });
      this.photoFiles.push(null);
      this.acceptedPhotos.push(false); // new photo not accepted yet
      this.emitChanges();
    }
  }

  triggerFileInput(index: number) {
    this.currentIndex = index;
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0] && this.currentIndex !== null) {
      const file = input.files[0];
      this.photoFiles[this.currentIndex] = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.photos[this.currentIndex!] = {
          id: 0,
          profile_id: 0,
          photo_url: '',
          preview_url: reader.result as string,
        };

        this.acceptedPhotos[this.currentIndex!] = false;
        this.emitChanges();
      };

      reader.readAsDataURL(file);
      input.value = '';
    }
  }


  acceptPhoto(index: number, event: MouseEvent) {
    event.stopPropagation();
    this.acceptedPhotos[index] = true; // mark as accepted
  }

  removePhoto(index: number, event: MouseEvent) {
    event.stopPropagation();

    if (this.photos[index]?.id) {
      this.deletedPhotoIds.push(this.photos[index].id);
    }

    // Remove from arrays
    this.photos.splice(index, 1);
    this.photoFiles.splice(index, 1);
    this.acceptedPhotos.splice(index, 1);
    this.emitChanges();
  }


  private emitChanges() {
    this.photosChange.emit(this.photos);
    this.photoFilesChange.emit(
      { newFiles: this.photoFiles, deletedPhotoIds: this.deletedPhotoIds }
    );
  }
}
