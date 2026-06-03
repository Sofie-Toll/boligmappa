using backend.Models;

namespace backend.Services;

public class DocumentService
{
    private readonly List<Document> _documents = [];

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

    //TODO: add misssing operations
}