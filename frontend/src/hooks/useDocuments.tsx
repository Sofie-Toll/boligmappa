import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateDocumentRequest } from '../models/documentModel';

const BASE_URL = 'http://localhost:5050';
const QUERY_KEY = (propertyId: string) => ['documents', propertyId];

export function useDocuments(propertyId: string) {
  return useQuery({
    queryKey: QUERY_KEY(propertyId),
    queryFn: async () => {
      const result = await fetch(`${BASE_URL}/api/properties/${propertyId}/documents`);
      return result.json();
    },
  });
}

export function useCreateDocument(propertyId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateDocumentRequest) => {
      const result = await fetch(`${BASE_URL}/api/documents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return result.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY(propertyId) }),
  });
}

export function useDeleteDocument(propertyId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await fetch(`${BASE_URL}/api/documents/${id}`, { method: 'DELETE' });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY(propertyId) }),
  });
}