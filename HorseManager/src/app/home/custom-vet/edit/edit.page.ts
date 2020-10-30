import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomVet, ICustomVet } from 'src/app/shared/models/custom-vet.model';
import { CustomVetService } from '../custom-vet.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, 
    private customVetService: CustomVetService,
    private router: Router
    ) { }

  private id;
  public survey;

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.queryParams['id'];
    console.log(this.id);

    this.customVetService.getById(this.id).subscribe(data => {
      this.survey = data || {};
      console.log(this.survey);
    })
  }

  addHorse(form: NgForm){

    const vet = this.createFromForm(form);
    this.subscribeToSaveResponse(this.customVetService.update(vet));
  }


  private createFromForm(form: NgForm): ICustomVet {
    return {
      ...new CustomVet(),
      id: this.survey.id,
      date: new Date(form.value.birth),
      title: form.value.title,
      price: parseInt(form.value.price),
      doctor: form.value.doctor,
      horseId: parseInt(form.value.horse),
      status: 'NOTPAID',
      horseName: undefined
    };
  }

  
  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomVet>>): void {
    result.subscribe( 
      (resp) => {
      console.log("OK")
      this.router.navigateByUrl("/home/custom-vet");

    },
       (err) =>{
        console.log(err)
        this.router.navigateByUrl("/home/custom-vet");
       }
    );
  }

  delete() {
    this.subscribeToSaveResponse(this.customVetService.delete(this.id));
  }
}
