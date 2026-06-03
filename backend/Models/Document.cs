using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class Document
{
    public Guid Id { get; set; }
    public Guid PropertyId { get; set; }
    [Required]
    public required string Title { get; set; }
    public DocumentType DocumentType { get; set; }
    public DateTimeOffset UploadedAt { get; set; }
    [Required]
    public required string UploadedBy { get; set; }
}
