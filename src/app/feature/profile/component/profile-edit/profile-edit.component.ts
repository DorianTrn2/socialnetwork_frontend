import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {NavigationService} from "@core/service/navigation/navigation.service";
import {APP_URL, BACKEND_ENDPOINT, BACKEND_URI, BACKEND_USER_ENDPOINT} from "@core/constant/url.constant";
import {User, UserProfile} from "@core/type/user.type";
import {UpdateProfileService} from "@feature/profile/service/update-profile.service";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  public userProfile!: UserProfile;

  public userFirstNameFormControl!: FormControl<string>;

  public userLastNameFormControl!: FormControl<string>;

  public userBirthdayFormControl!: FormControl<Date>;

  public userImageFormControl!: FormControl<File | null>;

  public userFormGroup!: FormGroup;

  public selectedImage: string | null = null;

  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  private fileInput: HTMLInputElement | null = null;

  private readonly navigationService: NavigationService = inject(NavigationService);

  private readonly updateProfileService: UpdateProfileService = inject(UpdateProfileService);

  public ngOnInit(): void {
    // Resolver
    this.userProfile = this.route.snapshot.data["userProfile"];

    this.fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');

    this.userFirstNameFormControl = new FormControl(this.userProfile.user.firstname, {
      nonNullable: true,
      validators: Validators.required
    });
    this.userLastNameFormControl = new FormControl(this.userProfile.user.lastname, {
      nonNullable: true,
      validators: Validators.required
    });
    this.userBirthdayFormControl = new FormControl(this.userProfile.user.birthday, {
      nonNullable: true,
      validators: Validators.required
    });
    this.userImageFormControl = new FormControl(null);

    this.selectedImage = `${BACKEND_URI}/${BACKEND_ENDPOINT.USER}/${this.userProfile.user.username}/${BACKEND_USER_ENDPOINT.GET_IMAGE}`;

    this.userFormGroup = new FormGroup({
      lastname: this.userLastNameFormControl,
      firstname: this.userFirstNameFormControl,
      birthday: this.userBirthdayFormControl,
      image: this.userImageFormControl,
    });

    this.userImageFormControl.valueChanges.subscribe(() => {
      this.userFormGroup.markAsDirty();
    })
  }

  public onUserImageClick(): void {
    if (this.fileInput) {
      this.fileInput.click();
    }
  }

  public onFileSelected(user: any) {
    const fileInput = user.target as HTMLInputElement;

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

      this.userImageFormControl.setValue(file);
    }
  }

  public onSubmit(): void {
    const userToSubmit: User = {
      firstname: this.userFirstNameFormControl.value,
      lastname: this.userLastNameFormControl.value,
      username: this.userProfile.user.username,
      birthday: this.userBirthdayFormControl.value,
      role_id: this.userProfile.user.role_id,
      email: this.userProfile.user.email,
    };

    this.updateProfileService.updateUserProfile(userToSubmit).subscribe(() => {
      if (this.userImageFormControl.value) {
        this.updateProfileService.postUserImage(this.userImageFormControl.value).subscribe(() => {
          this.navigationService.navigateTo(APP_URL.HOME);
        });
      }
      this.navigationService.navigateTo(APP_URL.HOME);
    })
  }
}
