import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { FileUploaderComponent } from './Component/file-uploader/file-uploader.component';


@Component({
  selector: 'app-root',
  standalone:true,
  imports: [FileUploaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Image_Upload_Verifier_App';
}
