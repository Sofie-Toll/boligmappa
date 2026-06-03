namespace backend.Models;

public class DocumentSeeder
{
    private static readonly Guid DemoPropertyId = Guid.Parse("11111111-1111-1111-1111-111111111111");

    public static List<Document> GetDocuments()
    {
        return new List<Document>
        {
            new Document
            {
                Id = Guid.NewGuid(),
                PropertyId = DemoPropertyId,
                Title = "Building Permit",
                DocumentType = DocumentType.BuildingPermit,
                UploadedAt = DateTimeOffset.UtcNow,
                UploadedBy = "John Doe"
            },
            new Document
            {
                Id = Guid.NewGuid(),
                PropertyId = DemoPropertyId,
                Title = "Quality Assurance Report",
                DocumentType = DocumentType.QualityAssurance,
                UploadedAt = DateTimeOffset.UtcNow,
                UploadedBy = "Jane Smith"
            },
            new Document
            {
                Id = Guid.NewGuid(),
                PropertyId = DemoPropertyId,
                Title = "Warranty",
                DocumentType = DocumentType.Warranty,
                UploadedAt = DateTimeOffset.UtcNow,
                UploadedBy = "Alice Johnson"
            },
            new Document
            {
                Id = Guid.NewGuid(),
                PropertyId = DemoPropertyId,
                Title = "Initial Invoice",
                DocumentType = DocumentType.Invoice,
                UploadedAt = DateTimeOffset.UtcNow.AddDays(-1),
                UploadedBy = "System Seeder"
            }
        };
    }
}