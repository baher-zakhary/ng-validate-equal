# Validate equal

An Angular directive to validate equality of two template-driven form fields

[Online Demo & Usage Guide](https://baherwael.github.io/ng-validate-equal/)

## Installation and Usage

### Step #1:

install ng-validate-equal package

```sh
 npm i ng-validate-equal
 ```

### Step #2:

 import "ValidateEqualModule" in your module.ts and add it to the NgModule imports' array

```ts
import { ValidateEqualModule } from 'ng-validate-equal';

@NgModule({
  declarations: [],
  imports: [
    ValidateEqualModule
  ],
  providers: [],
})
```

### Step #3:

- Make sure you surround your field and its confirmation/retype field in a `<form> </form>` tag
- Give your primary field a name
- Use the directive on the secondary field and pass the primary field's name to the directive
- Look for "notEqual" error in the confirmation field errors array

```html
<!-- form -->
<form>

<!-- password -->
<label>
  Password
</label>

<input type="password" name="passwordFieldName" placeholder="Password" #modelPassword="ngModel" [(ngModel)]="model.password">

<!-- confirm Password -->
<label>
  Confirm Password
</label>

<input type="password" ngValidateEqual="passwordFieldName" #modelConfirmPassword="ngModel" [(ngModel)]="model.confirmPassword" placeholder="Confirm Password">

<div *ngIf="(modelConfirmPassword.dirty || modelConfirmPassword.touched) && modelConfirmPassword.invalid">
    <p class="warning-text" *ngIf="modelConfirmPassword.hasError('notEqual') && modelPassword.valid">
      Passwords Don't Match
    </p>
</div>

</form>
```

### CHEERS :)

Love our package? [Give our repo a star >](https://github.com/BaherWael/ng-validate-equal)
