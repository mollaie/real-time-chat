// src/app/components/signup/signup.component.ts

import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { useAuthStore } from '../stores/auth.store';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterModule],
  template: `
    <div
      class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
    >
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create a new account
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
                Email address
              </label>
              <div class="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  [(ngModel)]="email"
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                for="displayName"
                class="block text-sm font-medium text-gray-700"
              >
                Display Name
              </label>
              <div class="mt-1">
                <input
                  id="displayName"
                  name="displayName"
                  type="text"
                  required
                  [(ngModel)]="displayName"
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                for="password"
                class="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div class="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  [(ngModel)]="password"
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign up
              </button>
            </div>
          </form>

          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500"> Or </span>
              </div>
            </div>

            <div class="mt-6">
              <a
                routerLink="/login"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-gray-50"
              >
                Sign in to existing account
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SignupComponent {
  email = '';
  password = '';
  displayName = '';
  errorMessage = signal<string | null>(null);
  private authStore = inject(useAuthStore);
  private router = inject(Router);

  async onSubmit() {
    try {
      console.log(this.displayName);
      await this.authStore.signUp(this.email, this.password, this.displayName);
      this.router.navigate(['/chat']);
      // Navigate to chat list after successful signup
    } catch (error) {
      console.error('Signup error:', error);
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
