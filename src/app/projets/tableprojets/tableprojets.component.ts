import { Component, Input, OnInit,ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiprojService } from 'src/app/services/apiproj.service';
import { DialogprojetsComponent } from '../dialogprojets/dialogprojets.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-tableprojets',
  templateUrl: './tableprojets.component.html',
  styleUrls: ['./tableprojets.component.css']
})
export class TableprojetsComponent implements OnInit{

  displayedColumns: string[] = ['montantContrat', 'dateDebutContrat', 'dateFinContrat', 'specialite' , 'archived' , 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  titlestyle="font-family: verdana" ; 
  @Input("paragraph") paragraphe :any ;
  
  constructor( private dialog : MatDialog , private apiproj : ApiprojService) {

  }
  ngOnInit(): void {
    this.getAllProjects();
  }
  openDialog() {
    this.dialog.open(DialogprojetsComponent, {

      
    }).afterClosed().subscribe(val=>{

      if(val === 'save') {
        this.getAllProjects();
      }
    })

}

getAllProjects(){
this.apiproj.getProject()
.subscribe({
next:(res)=> {
  this.dataSource = new MatTableDataSource(res);
  this.dataSource.paginator = this.paginator ;
  this.dataSource.sort = this.sort
}

  
})

}


editProject(row:any) {
  this.dialog.open(DialogprojetsComponent, {
    width:'30%',
    data:row
  }).afterClosed().subscribe(val=>{

    if(val === 'update') {
      this.getAllProjects();
    }
  })

}



deleteProject(idProject:number) {

this.apiproj.deleteProject(idProject)
.subscribe({
  next:(res)=>{
    alert("deleted successfully");
    this.getAllProjects();
  }
})
}


applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

}
