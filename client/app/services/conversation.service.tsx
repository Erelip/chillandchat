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

  async getMessages(id: string) : Promise<any> {
    return await api.get(`/conversations/${id}/messages`);
  }

  async getAllUsersButMe() : Promise<any> {
    return await api.get('/users');
  }

  async sendMessage(id: string, content: string) : Promise<any> {
    return await api.post(`/conversations/${id}/messages`,
      {
        content: content
      }
    );
  }

}