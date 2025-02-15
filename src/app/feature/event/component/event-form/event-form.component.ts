import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EVENT_THEME, EventTheme} from "@core/constant/theme.constant";
import {Event} from "@core/type/event.type";
import {APP_URL, BACKEND_ENDPOINT, BACKEND_EVENT_ENDPOINT, BACKEND_URI} from "@core/constant/url.constant";
import {AuthenticationStore} from "@core/store/authentication/authentication.store";
import {EventService} from "@shared/event/service/event.service";
import {NavigationService} from "@core/service/navigation/navigation.service";

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

  private readonly authenticationStore: AuthenticationStore = inject(AuthenticationStore);

  private readonly eventService: EventService = inject(EventService);

  private readonly navigationService: NavigationService = inject(NavigationService);

  public ngOnInit(): void {
    // Resolver
    this.eventToEdit = this.route.snapshot.data["event"] ?? null;
    this.editMode$$.set(!!this.eventToEdit);

    this.fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');

    this.eventNameFormControl = new FormControl(this.eventToEdit?.name ?? null, Validators.required);
    this.eventDateFormControl = new FormControl(this.eventToEdit?.date ?? null, Validators.required);
    this.eventThemeFormControl = new FormControl(this.eventToEdit?.theme_code ?? null, Validators.required);
    this.eventPriceFormControl = new FormControl(this.eventToEdit?.price ?? 1, [Validators.required, Validators.min(1), Validators.max(100)]);
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
    });

    this.eventImageFormControl.valueChanges.subscribe(() => {
      this.eventFormGroup.markAsDirty();
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
    const eventToSubmit: Event = {
      name: this.eventNameFormControl.value as string,
      theme_code: this.eventThemeFormControl.value as EventTheme,
      date: this.eventDateFormControl.value as Date,
      price: this.eventPriceFormControl.value as number,
      _id: this.eventToEdit?._id ?? '',
      created_by_email: this.eventToEdit?.created_by_email ?? this.authenticationStore.connectedUser$()?.user?.email ?? '',
    };

    if (this.editMode$$()) {
      this.eventService.updateEvent(eventToSubmit).subscribe(() => {
        if (this.eventImageFormControl.value) {
          this.eventService.postEventImage(eventToSubmit._id, this.eventImageFormControl.value).subscribe(() => {
            this.navigationService.navigateTo(APP_URL.EVENT + '/' + eventToSubmit._id);
          });
        }
        this.navigationService.navigateTo(APP_URL.EVENT + '/' + eventToSubmit._id);
      })
    } else {
      this.eventService.postNewEvent(eventToSubmit).subscribe((event: Event | null) => {
        if (event) {
          if (this.eventImageFormControl.value) {
            this.eventService.postEventImage(event._id, this.eventImageFormControl.value).subscribe(() => {
              this.navigationService.navigateTo(APP_URL.EVENT + '/' + eventToSubmit._id);
            });
          }
          this.navigationService.navigateTo(APP_URL.EVENT + '/' + event._id);
        } else {
          this.navigationService.navigateTo(APP_URL.HOME);
        }
      })
    }
  }
}
