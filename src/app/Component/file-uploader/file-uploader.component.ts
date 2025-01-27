import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf, ngFor, etc.
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { jsPDF } from 'jspdf';


@Component({
  selector: 'app-file-uploader',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add CommonModule and FormsModule here
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css'],
})
export class FileUploaderComponent {
  file: File | null = null;
  path: string = '';
  results: any[] = [];
  apiUrl = 'http://localhost:5000/api/files/verify';

  onFileChange(event: any) {
    console.log("hi");
    this.file = event.target.files[0];
    console.log(this.file);
  }

  async uploadFile() {
    if (this.file && this.path) {
      try {
        const formData = new FormData();
        formData.append('file', this.file);
        formData.append('path', this.path);

        const response = await fetch(this.apiUrl, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          this.results = await response.json();
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      alert('Please select a file and provide a valid path.');
    }
  }

  downloadPDF() {
    const doc = new jsPDF();

    // Set Title
    doc.setFontSize(18);
    doc.text('Image Verification Results', 20, 20);

    // Table Headers
    doc.setFontSize(12);
    doc.text('LAN ID', 20, 30);
    doc.text('Status', 100, 30);

    // Table Data
    let yPosition = 40;
    this.results.forEach((result) => {
      doc.text(result.lanId, 20, yPosition);
      doc.text(result.imageUploaded ? 'Uploaded' : 'Missing', 100, yPosition);
      yPosition += 10;
    });

    // Save the PDF
    doc.save('verification-results.pdf');
  }

  
}
