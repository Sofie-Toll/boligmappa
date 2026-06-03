namespace backend.Models;

public class DocumentSeeder
{
    public static List<Document> GetDocuments()
    {
        return new List<Document>
        {
            new Document
            {
                Id = Guid.NewGuid(),
                PropertyId = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                Title = "Building Permit",
                DocumentType = DocumentType.BuildingPermit,
                UploadedAt = DateTimeOffset.UtcNow,
                UploadedBy = "John Doe"
            },
            new Document
            {
                Id = Guid.NewGuid(),
                PropertyId = Guid.Parse("22222222-2222-2222-2222-222222222222"),
                Title = "Quality Assurance Report",
                DocumentType = DocumentType.QualityAssurance,
                UploadedAt = DateTimeOffset.UtcNow,
                UploadedBy = "Jane Smith"
            },
            new Document
            {
                Id = Guid.NewGuid(),
                PropertyId = Guid.Parse("33333333-3333-3333-3333-333333333333"),
                Title = "Warranty",
                DocumentType = DocumentType.Warranty,
                UploadedAt = DateTimeOffset.UtcNow,
                UploadedBy = "Alice Johnson"
            }
        };
    }
}