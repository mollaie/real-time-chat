// src/app/components/new-chat/new-chat.component.ts

import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { useChatStore } from '../stores/chat.store';

@Component({
  selector: 'app-new-chat',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div
      class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
    >
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Start a New Chat
        </h2>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          @if (errorMessage()) {
          <div
            class="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span class="block sm:inline">{{ errorMessage() }}</span>
          </div>
          }

          <form (ngSubmit)="onSubmit()" class="space-y-6">
            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700"
              >
                Participant's Email
              </label>
              <div class="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  [(ngModel)]="participantEmail"
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Start Chat
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class NewChatComponent {
  participantEmail = '';
  errorMessage = signal<string | null>(null);
  private chatStore = inject(useChatStore);
  private router = inject(Router);

  async onSubmit() {
    try {
      const chatId = await this.chatStore.createNewChat(this.participantEmail);
      this.router.navigate(['/chat', chatId]);
    } catch (error) {
      console.error('New chat error:', error);
      if (error instanceof Error) {
        this.errorMessage.set(error.message);
      } else {
        this.errorMessage.set(
          'An unexpected error occurred. Please try again.'
        );
      }
    }
  }
}
