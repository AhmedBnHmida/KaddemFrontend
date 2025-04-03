import { Component, Inject , OnInit} from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiprojService } from 'src/app/services/apiproj.service';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogprojets',
  templateUrl: './dialogprojets.component.html',
  styleUrls: ['./dialogprojets.component.css']
})
export class DialogprojetsComponent {
projectForm !: FormGroup;
actionbutton : string = "Save" ; 
ajoutmodif : string = "Ajouter ";
ajtprclass = "ajtpr";
style1 ="blue";
style2="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
style3="none" ;

  

  constructor(private formbuilder : FormBuilder, private apiproj : ApiprojService, @Inject (MAT_DIALOG_DATA) public editData:any , private dialogref : MatDialogRef<DialogprojetsComponent>) { }

  ngOnInit() :void {

   this.projectForm=this.formbuilder.group({

    montantContrat : ['',Validators.required],
    dateDebutContrat : ['',Validators.required],
    dateFinContrat : ['',[Validators.required]],
    specialite : ['',Validators.required],
    archived : ['',Validators.required]
   })

   console.log(this.editData);

   if (this.editData) {

       this.actionbutton="Update " ;
       this.ajoutmodif="Modifier " ;
       this.style3="flex";
       this.projectForm.controls['montantContrat'].setValue(this.editData.montantContrat);
       this.projectForm.controls['dateDebutContrat'].setValue(this.editData.dateDebutContrat);
       this.projectForm.controls['dateFinContrat'].setValue(this.editData.dateFinContrat);
       this.projectForm.controls['specialite'].setValue(this.editData.specialite);
       this.projectForm.controls['archived'].setValue(this.editData.archived);
       

   }
   }

   
addproject() {
if (!this.editData){

  if (this.projectForm.valid){

    this.apiproj.postProject(this.projectForm.value)
    .subscribe({
      next:(res)=>{
      alert("Contract added successfully");
      this.projectForm.reset();
      this.dialogref.close('save');
      },
      error:(res)=>{
        alert("Error")
        }
  
    })
  }
}
else{
  this.updateProject()
}
}

updateProject() {

this.projectForm.value.idProject=this.editData.idProject;


this.apiproj.putProject(this.projectForm.value)
.subscribe({
next:(res)=>{
  alert("updated successfully");
  this.projectForm.reset();
  this.dialogref.close('update') ;
},
  error:(res)=>{
  alert("Error")
  }

})


}

}
