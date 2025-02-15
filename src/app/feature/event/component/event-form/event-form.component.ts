import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EVENT_THEME, EventTheme} from "@core/constant/theme.constant";
import {Event} from "@core/type/event.type";
import {BACKEND_ENDPOINT, BACKEND_EVENT_ENDPOINT, BACKEND_URI} from "@core/constant/url.constant";

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  public editMode$$: WritableSignal<boolean> = signal(false);

  public eventNameFormControl!: FormControl<string | null>;

  public eventDateFormControl!: FormControl<Date | null>;

  public eventThemeFormControl!: FormControl<EventTheme | null>;

  public eventPriceFormControl!: FormControl<number | null>;

  public eventImageFormControl!: FormControl<File | null>;

  public eventFormGroup!: FormGroup;

  public selectedImage: string | null = null;

  public eventToEdit!: Event | null;

  public eventThemes: EventTheme[] = Object.keys(EVENT_THEME) as EventTheme[];
  protected readonly EVENT_THEME = EVENT_THEME;
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private fileInput: HTMLInputElement | null = null;

  public ngOnInit(): void {
    // Resolver
    this.eventToEdit = this.route.snapshot.data["event"] ?? null;
    this.editMode$$.set(!!this.eventToEdit);

    this.fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');

    this.eventNameFormControl = new FormControl(this.eventToEdit?.name ?? null, Validators.required);
    this.eventDateFormControl = new FormControl(this.eventToEdit?.date ?? null, Validators.required);
    this.eventThemeFormControl = new FormControl(this.eventToEdit?.theme_code ?? null, Validators.required);
    this.eventPriceFormControl = new FormControl(this.eventToEdit?.price ?? 0, Validators.required);
    this.eventImageFormControl = new FormControl(null);

    if (this.eventToEdit) {
      this.selectedImage = `${BACKEND_URI}/${BACKEND_ENDPOINT.EVENT}/${this.eventToEdit._id}/${BACKEND_EVENT_ENDPOINT.GET_IMAGE}`;
    }

    this.eventFormGroup = new FormGroup({
      name: this.eventNameFormControl,
      date: this.eventDateFormControl,
      theme: this.eventThemeFormControl,
      price: this.eventPriceFormControl,
      image: this.eventImageFormControl,
    })
  }

  public onEventImageClick(): void {
    if (this.fileInput) {
      this.fileInput.click();
    }
  }

  public onFileSelected(event: any) {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      // Valider le type MIME
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        alert('Seuls les fichiers PNG, JPG, et JPEG sont autorisés.');
        return;
      }

      // Lire le fichier comme URL pour l'aperçu
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string; // Mettre à jour l'image dans le tableau
      };
      reader.readAsDataURL(file);

      this.eventImageFormControl.setValue(file);
    }
  }

  public onSubmit(): void {

  }
}
