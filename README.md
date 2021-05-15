# Validate equal directive for Angular

  

An Angular directive to validate equality of two template-driven form fields

  

[Online Demo & Usage Guide](https://baher-zakhary.github.io/ng-validate-equal/)

  

## Installation and Usage

  

### Step #1:

  

install ng-validate-equal package
  

```sh

npm i ng-validate-equal

```

  
  
  

### Step #2:

  

import `ValidateEqualModule from 'ng-validate-equal'` in your module.ts and add it to the NgModule imports' array

  

```ts
import { ValidateEqualModule } from  'ng-validate-equal';

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

- Use the directive `ngValidateEqual` on the secondary field and pass the primary field's name to the directive like this `ngValidateEqual="primaryFieldName"`

- Look for `'notEqual'` error in the confirmation field's errors array like this `modelConfirmPassword.hasError('notEqual')`

**Example:**
app.component.html
```html
<form>

	<!-- Password field -->
	<label> Password </label>
 
	<input  type="password" name="passwordFieldName" placeholder="Password"
		#modelPassword="ngModel" [(ngModel)]="model.password">

	<!-- Confirm password field -->
	<label> Confirm Password </label>

	<input type="password" ngValidateEqual="passwordFieldName"  
		name="confirmPasswordFieldName" #modelConfirmPassword="ngModel"
		[(ngModel)]="model.confirmPassword" placeholder="Confirm Password">

	<!-- Error message -->
	<div *ngIf="(modelConfirmPassword.dirty || modelConfirmPassword.touched) &&
		modelConfirmPassword.invalid">

		<p style="color:red" *ngIf="modelConfirmPassword.hasError('notEqual') &&
			modelPassword.valid">
			Passwords Don't Match
		</p>
	</div>

</form>
```

app.component.ts
```ts 
import { Component } from  '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export  class  AppComponent {

	model  = {
		password: null,
		confirmPassword: null
	};

}
```
  

### CHEERS :)

  

Love our package? [Give our repo a star >](https://github.com/baher-zakhary/ng-validate-equal)

  

### Keywords

  

validate

equal

confirm

password

repeat

retype

email

angular

directive

tempate-driven forms

form

validation

equality

fields

match

matching