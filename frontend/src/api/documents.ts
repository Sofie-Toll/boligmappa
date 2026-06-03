import type { Document, CreateDocumentRequest, UpdateDocumentRequest } from '../models/documentModel';

const BASE_URL = process.env.REACT_APP_API_BASE_URL ?? '/api';
const JSON_HEADERS = { 'Content-Type': 'application/json' };

async function requestJson<T>(path: string, action: string, init?: RequestInit): Promise<T> {
  const result = await fetch(`${BASE_URL}${path}`, init);
  if (!result.ok) {
    throw new Error(`Klarte ikke ${action} (status ${result.status})`);
  }

  return result.json();
}

async function requestVoid(path: string, action: string, init?: RequestInit): Promise<void> {
  const result = await fetch(`${BASE_URL}${path}`, init);
  if (!result.ok) {
    throw new Error(`Klarte ikke ${action} (status ${result.status})`);
  }
}

export const documentsApi = {
  getPropertyIds: (): Promise<string[]> =>
    requestJson<string[]>('/properties', 'hente propertyId-er'),

  getByProperty: (propertyId: string): Promise<Document[]> =>
    requestJson<Document[]>(`/properties/${propertyId}/documents`, 'hente dokumenter'),

  create: (data: CreateDocumentRequest): Promise<Document> =>
    requestJson<Document>('/documents', 'opprette dokument', {
      method: 'POST',
      headers: JSON_HEADERS,
      body: JSON.stringify(data),
    }),

  update: (id: string, data: UpdateDocumentRequest): Promise<Document> =>
    requestJson<Document>(`/documents/${id}`, 'redigere dokument', {
      method: 'PUT',
      headers: JSON_HEADERS,
      body: JSON.stringify(data),
    }),

  delete: (id: string): Promise<void> =>
    requestVoid(`/documents/${id}`, 'slette dokument', { method: 'DELETE' }),
};
