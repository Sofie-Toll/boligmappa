import { useState } from 'react';
import { usePropertyIds, useDocuments, useCreateDocument, useDeleteDocument, useUpdateDocument } from './hooks/useDocuments';
import type { Document as DocumentModel, DocumentType } from './models/documentModel';

const DEFAULT_PROPERTY_ID = '11111111-1111-1111-1111-111111111111';
const DOCUMENT_TYPES: DocumentType[] = ['BuildingPermit', 'QualityAssurance', 'Warranty', 'Invoice', 'Other'];

type FormState = { title: string; documentType: DocumentType; uploadedBy: string };
const defaultForm: FormState = { title: '', documentType: 'BuildingPermit', uploadedBy: '' };

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>(defaultForm);
  const [editing, setEditing] = useState<{ id: string } & FormState | null>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState(DEFAULT_PROPERTY_ID);
  const [knownPropertyIds, setKnownPropertyIds] = useState<string[]>([DEFAULT_PROPERTY_ID]);

  const { data: propertyIds } = usePropertyIds();
  const { data: documents, isPending, isError, error } = useDocuments(selectedPropertyId);
  const createMutation = useCreateDocument(selectedPropertyId);
  const updateMutation = useUpdateDocument(selectedPropertyId);
  const deleteMutation = useDeleteDocument(selectedPropertyId);
  const sortedDocuments: DocumentModel[] = ((documents ?? []) as DocumentModel[]).slice().sort((a, b) =>
    new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
  );
  const existingPropertyIds: string[] = propertyIds ?? [];
  const selectablePropertyIds: string[] = Array.from(new Set([...knownPropertyIds, ...existingPropertyIds]));

  const handlePropertyChange = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
    setKnownPropertyIds((prev) => (prev.includes(propertyId) ? prev : [...prev, propertyId]));
    setShowForm(false);
    setEditing(null);
  };

  const handleGeneratePropertyId = () => {
    handlePropertyChange(crypto.randomUUID());
  };

  const handleCreate = () => {
    createMutation.mutate(
      { propertyId: selectedPropertyId, ...form },
      { onSuccess: () => { setShowForm(false); setForm(defaultForm); } }
    );
  };

  const handleUpdate = () => {
    if (!editing) return;
    const { id, ...data } = editing;
    updateMutation.mutate(
      { id, data: { propertyId: selectedPropertyId, ...data } },
      { onSuccess: () => setEditing(null) }
    );
  };

  if (isPending) return <p>Laster...</p>;
  if (isError) return <p>Feil: {error instanceof Error ? error.message : 'Ukjent feil'}</p>;

  return (
    <div>
      <h1>Dokumenter</h1>
      <label htmlFor="property-id-select">Velg eksisterende propertyId:</label>
      <select
        id="property-id-select"
        value={selectedPropertyId}
        onChange={(e) => handlePropertyChange(e.target.value)}
      >
        {!selectablePropertyIds.includes(selectedPropertyId) && (
          <option value={selectedPropertyId}>{selectedPropertyId}</option>
        )}
        {selectablePropertyIds.map((propertyId: string) => (
          <option key={propertyId} value={propertyId}>
            {propertyId}
          </option>
        ))}
      </select>
      {existingPropertyIds.length === 0 && <p>Ingen eksisterende propertyId-er funnet ennå.</p>}
      <button onClick={handleGeneratePropertyId}>Generer ny propertyId</button>
      <button onClick={() => setShowForm(true)}>Nytt dokument</button>

      {showForm && (
        <div>
          <input placeholder="Tittel" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <select value={form.documentType} onChange={(e) => setForm({ ...form, documentType: e.target.value as DocumentType })}>
            {DOCUMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <input placeholder="Lastet opp av" value={form.uploadedBy} onChange={(e) => setForm({ ...form, uploadedBy: e.target.value })} />
          <button onClick={handleCreate}>Lagre</button>
          <button onClick={() => setShowForm(false)}>Avbryt</button>
        </div>
      )}

      {sortedDocuments.length === 0 && <p>Ingen dokumenter funnet.</p>}

      {sortedDocuments.map((document: DocumentModel) => (
        <div key={document.id}>
          <h3>{document.title}</h3>
          <p>PropertyId: {document.propertyId}</p>
          <p>Type: {document.documentType}</p>
          <p>Lastet opp av: {document.uploadedBy}</p>
          <p>Lastet opp: {new Date(document.uploadedAt).toLocaleString('nb-NO')}</p>

          {editing?.id === document.id ? (
            <div>
              <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
              <select value={editing.documentType} onChange={(e) => setEditing({ ...editing, documentType: e.target.value as DocumentType })}>
                {DOCUMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <input value={editing.uploadedBy} onChange={(e) => setEditing({ ...editing, uploadedBy: e.target.value })} />
              <button onClick={handleUpdate}>Oppdater</button>
              <button onClick={() => setEditing(null)}>Avbryt</button>
            </div>
          ) : (
            <button onClick={() => setEditing({ id: document.id, title: document.title, documentType: document.documentType, uploadedBy: document.uploadedBy })}>
              Rediger
            </button>
          )}

          <button onClick={() => deleteMutation.mutate(document.id)}>Slett</button>
        </div>
      ))}
    </div>
  );
}