using FirstCompany.Api.Models;
using FirstCompany.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace FirstCompany.Api.Controllers;

[ApiController]
[Route("api/contact")]
public sealed class ContactController(
    IEmailSender emailSender,
    ILogger<ContactController> logger) : ControllerBase
{
    [HttpPost]
    [EnableRateLimiting("ContactForm")]
    [RequestSizeLimit(16 * 1024)]
    public async Task<IActionResult> Send(
        [FromBody] ContactRequest request,
        CancellationToken cancellationToken)
    {
        // A filled hidden field is treated as a bot submission without revealing it.
        if (!string.IsNullOrWhiteSpace(request.Website))
        {
            return Ok(new { message = "Обращение принято." });
        }

        try
        {
            await emailSender.SendContactRequestAsync(request, cancellationToken);
            return Ok(new { message = "Обращение отправлено." });
        }
        catch (Exception exception) when (exception is not OperationCanceledException)
        {
            logger.LogError(exception, "Failed to send a contact request e-mail.");

            return Problem(
                statusCode: StatusCodes.Status503ServiceUnavailable,
                title: "Не удалось отправить обращение",
                detail: "Попробуйте ещё раз позднее или свяжитесь с нами по e-mail.");
        }
    }
}
