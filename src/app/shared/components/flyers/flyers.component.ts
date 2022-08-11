import { Component, Input, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-flyers',
  templateUrl: './flyers.component.html',
  styleUrls: ['./flyers.component.sass']
})
export class FlyersComponent implements OnInit {

  @Input() flyers;

  constructor(
    private _lightbox: Lightbox,
  ) { }

  ngOnInit(): void {
  }

  openGallery(index: number, galeria: any): void {
    var album = [];
    var item_album = []
    console.log("galeria0", galeria);
    console.log(item_album)
    galeria.map(img => {
      /*
    dentro de mapeo crear item de album*/
      var item_album = { src: img.url, caption: img.title, thumn: img.ulr_thumbnail }
      album.push(item_album)
    })

    // open lightbox
    this._lightbox.open(album, index, { showZoom: true, centerVertically: true });
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

}
