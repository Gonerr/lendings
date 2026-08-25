using LandingContact.Api.Models;

namespace LandingContact.Api.Services;

public interface IEmailSender
{
    Task SendContactRequestAsync(
        ContactRequest request,
        CancellationToken cancellationToken);
}
