import { Component } from '@angular/core';
import { CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-dd-horizontal-sorting',
    imports: [CdkDropList, CdkDrag],
    templateUrl: './dd-horizontal-sorting.component.html',
    styleUrl: './dd-horizontal-sorting.component.scss'
})
export class DdHorizontalSortingComponent {

    timePeriods = [
        'Bronze age',
        'Iron age',
        'Middle ages',
        'Early modern period',
        'Long nineteenth century',
    ];

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.timePeriods, event.previousIndex, event.currentIndex);
    }

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}