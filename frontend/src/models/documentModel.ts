export type DocumentType =
  | 'BuildingPermit'
  | 'QualityAssurance'
  | 'Warranty'
  | 'Invoice'
  | 'Other';

export interface Document {
  id: string;
  propertyId: string;
  title: string;
  documentType: DocumentType;
  uploadedAt: string;
  uploadedBy: string;
}

export interface CreateDocumentRequest {
  propertyId: string;
  title: string;
  documentType: DocumentType;
  uploadedBy: string;
}

export interface UpdateDocumentRequest {
  propertyId: string;
  title: string;
  documentType: DocumentType;
  uploadedBy: string;
}
