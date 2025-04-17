import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';
import { HeaderLight3Component } from '../../../elements/header/header-light3/header-light3.component';
import { Footer13Component } from '../../../elements/footer/footer13/footer13.component';

interface Message {
  contenu: string;
  dateEnvoi: string;
  nom: string;
  prenom: string;
  role: string;
  sender_id: number;
}

interface Document {
  nom: String;
  url: string;
  typeDocument: String;
}

@Component({
  selector: 'app-chat',
  templateUrl: './Negociation-chat.component.html',
  styleUrls: ['./Negociation-chat.component.scss'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatCardModule,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    HeaderLight3Component,
        
            Footer13Component,
           
            CommonModule,
           
            MatButtonModule,
          

            MatInputModule,
          
            ReactiveFormsModule
  ]
})
export class NegociationChatFrontComponent implements OnInit {
  openDocument(url: string): void {
    if (url.startsWith('blob:')) {
      try {
        // Validate the blob URL
        const blobUrl = new URL(url);
        console.log('Attempting to fetch blob URL:', blobUrl.toString());

        // Check if the blob URL is still valid
        fetch(blobUrl.toString(), { method: 'HEAD' })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Blob URL is inaccessible. HTTP status: ${response.status}`);
            }
            // Proceed to fetch the blob content
            return fetch(blobUrl.toString());
          })
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.blob();
          })
          .then(blob => {
            const link = document.createElement('a');
            const tempBlobUrl = URL.createObjectURL(blob);
            link.href = tempBlobUrl;
            link.download = ''; // Optional: set a default filename
            document.body.appendChild(link);
            link.click(); // Trigger the download
            document.body.removeChild(link); // Clean up the DOM
            URL.revokeObjectURL(tempBlobUrl); // Release the temporary URL
            console.log('File downloaded successfully.');
          })
          .catch(error => {
            console.error('Error downloading the blob file:', error);
            alert('Failed to download the file. Please ensure the file is accessible and try again.');
          });
      } catch (error) {
        console.error('Invalid blob URL:', error);
        alert('The file URL is invalid or no longer available.');
      }
    } else {
      try {
        console.log('Attempting to download file from URL:', url);
        const link = document.createElement('a');
        link.href = url;
        link.download = ''; // Optional: set a default filename
        document.body.appendChild(link);
        link.click(); // Trigger the download
        document.body.removeChild(link); // Clean up the DOM
        console.log('File downloaded successfully.');
      } catch (error) {
        console.error('Error downloading the file:', error);
        alert('Failed to download the file. Please check the URL and try again.');
      }
    }
  }

  negociationId: number = 0;
  senderId: number = 0;
  messages: Message[] = [];
  Documents: Document[] = [];
  messageForm: FormGroup;
  errorMessage: string = '';
  private apiUrl2 = 'http://localhost:8890/gestionnegociation/api/negociations';
  private baseUrl = 'http://localhost:8890/gestionnegociation/api/phase3/negociations';
  private baseUrl1 = 'http://localhost:8890/gestionnegociation/api/negociations';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public themeService: CustomizerSettingsService,
  ) {
    this.messageForm = new FormGroup({
      contenu: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.negociationId = +params['negociationId'];
      this.senderId = +params['senderId'];
      this.loadMessages();
      this.loadDocument();
      console.log('Negociation ID:', this.negociationId);
      console.log('Sender ID:', this.senderId);
    });
  }

  loadMessages(): void {
    this.http.get<Message[]>(`${this.baseUrl}/${this.negociationId}/messages/messages`)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe({
        next: (data) => {
          this.messages = Array.isArray(data) ? data : [];
          console.log('Messages loaded:', this.messages);
        },
        error: (error) => {
          this.errorMessage = 'Error loading messages.';
          console.error(error);
          this.messages = [];
        }
      });
  }

  loadDocument(): void {
    this.http.get<Document[]>(`${this.baseUrl1}/${this.negociationId}/documents/infos`)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe({
        next: (data) => {
          this.Documents = Array.isArray(data) ? data : [];
          console.log('Documents loaded:', this.Documents);
        },
        error: (error) => {
          this.errorMessage = 'Error loading Documents.';
          console.error(error);
          this.Documents = [];
        }
      });
  }

  sendMessage(): void {
    if (this.messageForm.valid) {
      const contenu = this.messageForm.get('contenu')!.value;
      const payload = { contenu };

      this.http.post<Message>(`${this.baseUrl}/${this.negociationId}/messages/${this.senderId}`, payload)
        .pipe(
          tap(() => {
            this.messageForm.reset();
            this.loadMessages();
          }),
          catchError(this.handleError)
        )
        .subscribe({
          next: (response) => {
            console.log('Message sent successfully:', response);
            this.errorMessage = '';
          },
          error: (error) => {
            this.messageForm.reset();
            window.location.reload();
          }
        });
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (typeof ErrorEvent !== 'undefined' && error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${typeof error.error === 'string' ? error.error : JSON.stringify(error.error)}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (input && input.files && input.files.length > 0) {
      const file: File = input.files[0];

      const fileName: string = file.name;
      console.log('File Name:', fileName);

      const fileURL: string = URL.createObjectURL(file);
      console.log('File URL:', fileURL);

      const documentTypeMIME: string = file.type;
      console.log('Document Type (MIME):', documentTypeMIME);

      const fileExtension = fileName.split('.').pop()?.toLowerCase();
      let friendlyDocumentType: string = 'Unknown';

      if (fileExtension) {
        switch (fileExtension) {
          case 'pdf':
            friendlyDocumentType = 'PDF Document';
            break;
          case 'doc':
          case 'docx':
            friendlyDocumentType = 'Word Document';
            break;
          case 'xls':
          case 'xlsx':
            friendlyDocumentType = 'Excel Spreadsheet';
            break;
          case 'ppt':
          case 'pptx':
            friendlyDocumentType = 'PowerPoint Presentation';
            break;
          case 'jpg':
          case 'jpeg':
          case 'png':
          case 'gif':
            friendlyDocumentType = 'Image File';
            break;
          case 'txt':
            friendlyDocumentType = 'Text File';
            break;
          // Add more cases as needed
        }
        console.log('Friendly Document Type:', friendlyDocumentType);
      }

      const documentData = {
        nom: fileName,
        url: fileURL,
        typeDocument: friendlyDocumentType
      };

      console.log('JSON Payload:', documentData);

      this.http.post(
        `${this.apiUrl2}/${this.negociationId}/documents`,
        documentData
      ).subscribe({
        next: (response) => {
          console.log('Document information sent successfully:', response);
          this.loadDocument(); // Reload the document list after successful upload
          // Optionally, handle the response from the backend (e.g., show a success message)
        },
        error: (error) => {
          window.location.reload();
          console.error('Error sending document information:', error);
          // Optionally, handle the error (e.g., show an error message to the user)
        }
      });
    } else {
      console.log('No file selected.');
    }
  }
  goNegociation() {
    const url = window.location.href;
    const id = url.split('/').pop();
    // Navigate to the specified path with the extracted id
    window.location.href = `/front/negociationList/${this.senderId}`;
}
}