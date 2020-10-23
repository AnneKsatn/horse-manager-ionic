import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomVet, ICustomVet } from 'src/app/shared/models/custom-vet.model';
import { CustomVetService } from '../custom-vet.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private customVetService: CustomVetService) { }

  private id;
  private survey;

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.queryParams['id'];
    console.log(this.id);

    this.customVetService.getById(this.id).subscribe(data => {
      this.survey = data || {};
    })
  }

  addHorse(form: NgForm){

    const vet = this.createFromForm(form);
    
    // console.log(form.value.birth)
    console.log(vet);
    // console.log(horse)
    // this.subscribeToSaveResponse(this.customVetService.create(vet));
    // this.subscribeToSaveResponse(this.horseService.create(horse));
    form.reset();

  }


  private createFromForm(form: NgForm): ICustomVet {
    return {
      ...new CustomVet(),
      id: undefined,
      date: new Date(form.value.birth),
      title: form.value.title,
      price: parseInt(form.value.price),
      doctor: form.value.doctor,
      horseId: parseInt(form.value.horse),
      status: 'NOTPAID',
      horseName: undefined
    };
  }

  
  // protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomVet>>): void {
  //   result.subscribe( 
  //     (resp) => {
  //     console.log("OK")
  //     this.router.navigateByUrl("/home");

  //   },
  //      (err) =>{
  //       console.log(err)
  //       this.router.navigateByUrl("/home");
  //      }
  //   );
  // }
}
