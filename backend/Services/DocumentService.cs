using backend.Models;

namespace backend.Services;

public class DocumentService
{
    private readonly List<Document> _documents = DocumentSeeder.GetDocuments();

    public Task<IEnumerable<Guid>> GetPropertyIdsAsync()
    {
        var propertyIds = _documents
            .Select(d => d.PropertyId)
            .Distinct()
            .OrderBy(id => id)
            .ToList();

        return Task.FromResult<IEnumerable<Guid>>(propertyIds);
    }

    public Task<IEnumerable<Document>> GetDocumentsByPropertyIdAsync(Guid propertyId)
    {
        var result = _documents
            .Where(d => d.PropertyId == propertyId)
            .ToList();
        return Task.FromResult<IEnumerable<Document>>(result);
    }

    public Task<Document> CreateAsync(Document document)
    {
        document.Id = Guid.NewGuid();
        document.UploadedAt = DateTimeOffset.UtcNow;
        _documents.Add(document);
        return Task.FromResult(document);
    }

    public Task<bool> DeleteAsync(Guid documentId)
    {
        var document = _documents.FirstOrDefault(d => d.Id == documentId);
        if (document is null) return Task.FromResult(false);
        _documents.Remove(document);
        return Task.FromResult(true);
    }

    public Task<Document?> UpdateAsync(Guid documentId, Document updatedDocument)
    {
        var existing = _documents.FirstOrDefault(d => d.Id == documentId);
        if (existing is null)
        {
            return Task.FromResult<Document?>(null);
        }

        existing.Title = updatedDocument.Title;
        existing.DocumentType = updatedDocument.DocumentType;
        existing.UploadedBy = updatedDocument.UploadedBy;

        return Task.FromResult<Document?>(existing);
    }

    //TODO: add misssing operations
}