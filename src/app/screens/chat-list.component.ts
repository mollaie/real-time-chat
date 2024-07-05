// src/app/components/chat-list/chat-list.component.ts

import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Chat, useChatStore } from '../stores/chat.store';
import { useAuthStore } from '../stores/auth.store';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [RouterModule, DatePipe],
  template: `
    <div class="min-h-screen bg-gray-100">
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-bold text-gray-900">Chats</h1>
            <a
              routerLink="/new-chat"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              New Chat
            </a>
          </div>

          <div class="bg-white shadow overflow-hidden sm:rounded-md">
            <ul role="list" class="divide-y divide-gray-200">
              @for (chat of chatStore.chats(); track chat.id) {
              <li>
                <a
                  [routerLink]="['/chat', chat.id]"
                  class="block hover:bg-gray-50"
                >
                  <div class="px-4 py-4 sm:px-6">
                    <div class="flex items-center justify-between">
                      <p class="text-sm font-medium text-indigo-600 truncate">
                        {{ getChatName(chat) }}
                      </p>
                      <div class="ml-2 flex-shrink-0 flex">
                        <p
                          class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                        >
                          {{
                            chat.lastMessageTimestamp.toDate() | date : 'short'
                          }}
                        </p>
                      </div>
                    </div>
                    <div class="mt-2 sm:flex sm:justify-between">
                      <div class="sm:flex">
                        <p class="flex items-center text-sm text-gray-500">
                          {{ chat.lastMessage }}
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              }
            </ul>
          </div>

          @if (chatStore.chats().length === 0) {
          <p class="mt-4 text-gray-500">
            No chats available. Start a new chat!
          </p>
          }

          <button
            (click)="logout()"
            class="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ChatListComponent implements OnInit {
  chatStore = inject(useChatStore);
  authStore = inject(useAuthStore);
  router = inject(Router);

  ngOnInit() {
    const userId = this.authStore.currentUser()?.uid;
    if (userId) {
      this.chatStore.listenToChats(userId);
    } else {
      this.router.navigate(['/login']);
    }
  }

  getChatName(chat: Chat): string {
    if (chat.participantNames) {
      return chat.participantNames
        .filter((name) => name !== this.authStore.currentUser()?.displayName)
        .join(', ');
    }
    return 'Loading...';
  }

  logout() {
    this.authStore.logout();
    this.router.navigate(['/login']);
  }
}
