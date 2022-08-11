import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MicroblogService } from '../../service/microblog.service';

@Component({
  selector: 'app-microblog-detail',
  templateUrl: './microblog-detail.component.html',
  styleUrls: ['./microblog-detail.component.scss']
})
export class MicroblogDetailComponent implements OnInit {
  id;
  details;
  fondo = 'https://s1.1zoom.me/big3/471/Painting_Art_Back_view_Photographer_575380_3840x2400.jpg'
  constructor(
    private route: ActivatedRoute,
    private microblogService: MicroblogService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getBlogDetails();
  }

  getBlogDetails(){
    this.route.queryParams.subscribe(params => {
      this.id = params.id
      this.microblogService.getPublicacion(this.id).subscribe(res => {
        this.details = res.data
        console.log(this.details)
      })
    });
  }

  siguienteAnteriorBlog(id){
    this.router.navigate([`/microblog/detail`], { queryParams: { id: id } })
  }

  regresar(){
    this.router.navigate(['/microblog'])
  }

}
