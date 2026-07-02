import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'newhouse-regional',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="h-full flex flex-col justify-start items-center pt-16 px-8">
            <div class="text-center p-8 bg-white rounded-lg shadow-md">
                <div class="text-6xl mb-4">🚧</div>
                <h2 class="text-2xl font-bold text-gray-800 mb-2">Regional</h2>
                <p class="text-gray-500">This page is under development</p>
                <p class="text-gray-400 text-sm mt-2">Coming soon...</p>
            </div>
        </div>
    `
})
export class NewHouseRegionalComponent {
}