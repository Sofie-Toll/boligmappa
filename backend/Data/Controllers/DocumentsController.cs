using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/")]
public class DocumentsController : ControllerBase
{
    private readonly DocumentService _documentService;

    public DocumentsController(DocumentService documentService)
    {
        _documentService = documentService;
    }

    [HttpGet("properties/{propertyId}/documents")]
    public async Task<IActionResult> GetByProperty(Guid propertyId)
    {
        var documents = await _documentService.GetDocumentsByPropertyIdAsync(propertyId);
        return Ok(documents);
    }

    [HttpPost("documents")]
    public async Task<IActionResult> Create([FromBody] Document document)
    {
      //validerer mot modellen
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var created = await _documentService.CreateAsync(document);
        return Ok(created);
    }

    [HttpDelete("documents/{documentId}")]
    public async Task<IActionResult> Delete(Guid documentId)
    {
        var deleted = await _documentService.DeleteAsync(documentId);
        if (!deleted)
            return NotFound(new { message = "Document not found" });
        return NoContent();
    }

    [HttpPut("documents/{documentId}")]
    public async Task<IActionResult> Update(Guid documentId, [FromBody] Document document)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var updated = await _documentService.UpdateAsync(documentId, document);
        if (updated is null)
            return NotFound(new { message = "Document not found" });

        return Ok(updated);
    }

    //Todo add missing endpoints
    //Add validation and exception handling
}
