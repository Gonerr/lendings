using FirstCompany.Api.Models;

namespace FirstCompany.Api.Services;

public interface IEmailSender
{
    Task SendContactRequestAsync(
        ContactRequest request,
        CancellationToken cancellationToken);
}
