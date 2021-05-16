import { Directive, forwardRef, Attribute, OnDestroy } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
    selector: '[ngValidateEqual]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => ValidateEqualDirective), multi: true }
    ]
})
export class ValidateEqualDirective implements Validator, OnDestroy {

    private valueChangesSub: Subscription;

    constructor(@Attribute('ngValidateEqual') public otherControl: string) {
        this.valueChangesSub = new Subscription();
    }

    ngOnDestroy() {
        if (this.valueChangesSub) {
            this.valueChangesSub.unsubscribe();
        }
    }

    validate(selfControl: AbstractControl): any {

        const selfControlValue = selfControl.value;
        const otherControl = selfControl.root.get(this.otherControl);

        if (!otherControl) {
            throw new Error('ng-validate-equal: "otherControl" is not defined, please pass the name of the main field to the directive put on the secondary field like this example: ngValidateEqual="passwordFieldName"');
        }

        if (this.valueChangesSub) {
            this.valueChangesSub.unsubscribe();
        }

        // this code works when user types in other control putting the error in self control
        this.valueChangesSub = otherControl.valueChanges.subscribe(
            otherControlValue => {
                if (!this.isEqual(selfControlValue, otherControlValue) && (selfControl.touched || selfControl.dirty)) {
                    selfControl.setErrors(
                        {
                            notEqual: true
                        }
                    );
                } else {
                    if (selfControl.errors && selfControl.hasError('notEqual')) {
                        delete selfControl.errors['notEqual'];
                        if (!Object.keys(selfControl.errors).length) { selfControl.setErrors(null); }
                    }
                }
            }
        );

        // this code works when the user types in self control putting the error in self control
        if (!this.isEqual(selfControlValue, otherControl.value) && (selfControl.touched || selfControl.dirty)) {
            return {
                notEqual: true
            };
        }

        return null;
    }

    private isEqual(val1: any, val2: any) {
        val1 = this.unifyEmptyStrings(val1);
        val2 = this.unifyEmptyStrings(val2);

        return val1 === val2;
    }

    private unifyEmptyStrings(val: any) {
        const isDefined = this.isDefined;
        if (val === null || !isDefined(val)) {
            val = '';
        }
        return val;
    }

    private isDefined(value: any) {
        const defaultUndefined = void (0);
        return value !== defaultUndefined;
    }

}
