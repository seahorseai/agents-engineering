import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Import NgbModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgbModule],
  template: `
  
  <div class="container mt-4">
    <h2 class="text-primary">Custom Themed ng-bootstrap</h2>

    <!-- Themed Alert -->
    <ngb-alert type="success" class="mt-3">
      This is a success alert with custom styling!
    </ngb-alert>

    <!-- Themed Modal -->
    <button class="btn btn-primary mt-3" (click)="openModal(content)">Open Modal</button>

    <ng-template #content let-modal>
        <div class="modal-header">
          <h4 class="modal-title">Custom Themed Modal</h4>
          <button type="button" class="btn-close" aria-label="Close" (click)="modal.dismiss('Cross click')"></button>
        </div>
      <div class="modal-body">
        This is a custom-styled modal!
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" (click)="modal.close('Close click')">Close</button>
      </div>
    </ng-template>
  </div>

  
  
  `,
})
export class AppComponent {
  title = 'ng-boostrap-theming-poc';
  constructor(private modalService: NgbModal) {}

  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }
}
