import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-management',
  templateUrl: './template-management.component.html',
  styleUrls: ['./template-management.component.scss']
})
export class TemplateManagementComponent implements OnInit {
  deleteProfile = false;
  uploadSpin1 = true;
  updateData = false;
  imgSpinner = false;
  imageSrc = '';
  constructor() { }

  ngOnInit(): void {
  }
  onFileChange(event: any) {
    var file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
    // console.log(file, "imageeeeeee");
    if (file) {
      var pattern = /image-*/;
      var reader = new FileReader();
      if (!file.type.match(pattern)) {
        return;
      }
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }
  }
  _handleReaderLoaded(e: any) {
    let reader = e.target;
    this.imageSrc = reader.result.substr(reader.result.indexOf(',') + 1);
    let payLoad = {
      image: this.imageSrc,
      type: 'labs',
    };
  }

}
