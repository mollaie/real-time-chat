// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { SignupComponent } from './screens/signup.component';
import { LoginComponent } from './screens/login.component';
import { ChatListComponent } from './screens/chat-list.component';
import { ChatDetailComponent } from './screens/chat-detail.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { NewChatComponent } from './screens/new-chat.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

export const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'chats',
    component: ChatListComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'chat/:chatId',
    component: ChatDetailComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'new-chat',
    component: NewChatComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: '',
    redirectTo: '/chats',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/chats',
  },
];
