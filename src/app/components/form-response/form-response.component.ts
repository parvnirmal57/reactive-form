import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-form-response',
  templateUrl: './form-response.component.html',
  styleUrls: ['./form-response.component.css']
})
export class FormResponseComponent implements OnInit {
    formResponses: any[] = [];
    
  
    ngOnInit() {
      // Get data from localStorage
      const data = localStorage.getItem('formResponses');
      this.formResponses = data ? JSON.parse(data) : [];
    }

    //edit function
    onEdit(submission:any){
      submission.isEditing = true;
    }

    //save function
    onSave(submission:any){
      submission.isEditing=false;

      //update data
      const updatedData = this.formResponses.map(item =>
        item.id === submission.id ? submission : item
      );
      localStorage.setItem('formResponses', JSON.stringify(updatedData));
      console.log('Data saved:', submission);

     
      }
       //Delete function:
       onDelete(id: number){
        if (confirm('Are you sure you want to delete this entry?')) {
          this.formResponses = this.formResponses.filter(item => item.id !== id);
          localStorage.setItem('formResponses', JSON.stringify(this.formResponses));
          console.log('Data deleted:', id);
        }
    }


}
