import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MicroblogService } from '../../service/microblog.service';

@Component({
  selector: 'app-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.scss']
})
export class BlogItemComponent implements OnInit {
  @Input() imgItem: string;
  @Input() titulo: string;
  @Input() fecha: string;
  @Input() id: string;

  constructor(
    private microblogService: MicroblogService,
    private router: Router
  ) { 
  }

  ngOnInit(): void {  
  }

  blogDetalle(){
    this.router.navigate([`/microblog/detail`], { queryParams: { id: this.id } })
    
  }

}
