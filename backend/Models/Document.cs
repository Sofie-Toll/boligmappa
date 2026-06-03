namespace backend.Models;

public class Document
{
    public Guid Id { get; set; }
    public Guid PropertyId { get; set; }
    public required string Title { get; set; }
    public DocumentType DocumentType { get; set; }
    public DateTimeOffset UploadedAt { get; set; }
    public required string UploadedBy { get; set; }
}
 