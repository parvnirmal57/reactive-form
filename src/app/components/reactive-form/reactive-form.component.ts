import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators,} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent {
  signUpForm = new FormGroup({
    

    id: new FormControl('0'),

    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    lastName: new FormControl(''),

    mobile: new FormControl('',[
      Validators.required,
      Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
      Validators.minLength(10),
      Validators.maxLength(10)
    ]),
    address: new FormControl(''),
    
    email: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    website: new FormControl('',[
      Validators.required,
      Validators.pattern( /^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,4}(\/[\w\-]*)*\/?$/)
    ]),
    image: new FormControl('',[
      Validators.required,
    ]),
  });

  submitted = false;

    onImageChange(event: any) {
      const file: File = event.target.files[0];
      if(file) {
        this.signUpForm.controls.image.setErrors(null);

        //check file type
        const allowedTypes = ['image/png','image/jpeg'];
        if(!allowedTypes.includes(file.type)){
          this.signUpForm.controls.image.setErrors({fileType: true });
          return;
        }
        //check file size (<2MB)
        const maxSizeInBytes= 2 * 1024*1024;
        if(file.size > maxSizeInBytes){
          this.signUpForm.controls.image.setErrors({ fileSize:true });
          return;
        }

      }
    }

    constructor(private router: Router){}

  

  
    onSubmit() {
      this.submitted = true;
      
      if (this.signUpForm.invalid){
        return;
      }
      // Retrieve and increment the ID counter
      let currentId = Number(localStorage.getItem('formIdCounter') || '0');
      currentId += 1;
      localStorage.setItem('formIdCounter', currentId.toString());
    
      // Get the form data and assign the incremented ID
      const formData = { ...this.signUpForm.value, id: currentId };
    
      // Get existing data from localStorage
      const existingData = JSON.parse(localStorage.getItem('formResponses') || '[]');
      existingData.push(formData);
    
      // Save updated data back to localStorage
      localStorage.setItem('formResponses', JSON.stringify(existingData));
    
      console.log('Form saved in local storage:', existingData);
    
      // Navigate to the new component
      this.router.navigate(['/form-response']);
    }
    
  onReset(){
    this.submitted = false;
    this.signUpForm.reset();
  }
  

}
