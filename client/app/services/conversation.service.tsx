import { api } from '../lib/api';

export class ConversationService {

  async register(ids: string[]) : Promise<any> {
    return await api.post('/conversations/create', {
        participantIds: ids,
      }
    );
  }

  async getConversations() : Promise<any> {
    return await api.get('/conversations');
  }

  async getAllUsersButMe() : Promise<any> {
    return await api.get('/users');
  }
}