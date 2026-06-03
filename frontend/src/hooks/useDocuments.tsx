import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { documentsApi } from '../api/documents';
import type { CreateDocumentRequest, UpdateDocumentRequest } from '../models/documentModel';

const PROPERTY_IDS_QUERY_KEY = ['propertyIds'];
const QUERY_KEY = (propertyId: string) => ['documents', propertyId];

export function usePropertyIds() {
  return useQuery({
    queryKey: PROPERTY_IDS_QUERY_KEY,
    queryFn: () => documentsApi.getPropertyIds(),
  });
}

export function useDocuments(propertyId: string) {
  return useQuery({
    queryKey: QUERY_KEY(propertyId),
    queryFn: () => documentsApi.getByProperty(propertyId),
  });
}

export function useCreateDocument(propertyId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateDocumentRequest) => documentsApi.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY(propertyId) }),
  });
}

export function useUpdateDocument(propertyId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateDocumentRequest }) => 
      documentsApi.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY(propertyId) }),
  });
}

export function useDeleteDocument(propertyId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => documentsApi.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY(propertyId) }),
  });
}