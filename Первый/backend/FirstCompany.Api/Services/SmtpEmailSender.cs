using System.Net;
using System.Net.Mail;
using System.Text;
using FirstCompany.Api.Models;
using FirstCompany.Api.Options;
using Microsoft.Extensions.Options;

namespace FirstCompany.Api.Services;

public sealed class SmtpEmailSender(IOptions<SmtpOptions> options) : IEmailSender
{
    private readonly SmtpOptions _options = options.Value;

    public async Task SendContactRequestAsync(
        ContactRequest request,
        CancellationToken cancellationToken)
    {
        EnsureConfigured();

        using var message = new MailMessage
        {
            From = new MailAddress(_options.FromEmail, _options.FromName, Encoding.UTF8),
            Subject = $"Обращение с сайта ООО «Первый»: {SanitizeHeader(request.Name)}",
            SubjectEncoding = Encoding.UTF8,
            BodyEncoding = Encoding.UTF8,
            IsBodyHtml = false,
            Body = BuildBody(request),
        };

        message.To.Add(new MailAddress(_options.RecipientEmail));

        if (!string.IsNullOrWhiteSpace(request.Email))
        {
            message.ReplyToList.Add(new MailAddress(request.Email.Trim()));
        }

        using var smtpClient = new SmtpClient(_options.Host, _options.Port)
        {
            EnableSsl = _options.EnableSsl,
            UseDefaultCredentials = false,
            Credentials = new NetworkCredential(_options.Username, _options.Password),
            DeliveryMethod = SmtpDeliveryMethod.Network,
        };

        await smtpClient.SendMailAsync(message, cancellationToken);
    }

    private void EnsureConfigured()
    {
        if (string.IsNullOrWhiteSpace(_options.Host)
            || string.IsNullOrWhiteSpace(_options.Username)
            || string.IsNullOrWhiteSpace(_options.Password)
            || string.IsNullOrWhiteSpace(_options.FromEmail)
            || string.IsNullOrWhiteSpace(_options.RecipientEmail))
        {
            throw new InvalidOperationException(
                "SMTP is not configured. Set the Smtp__* environment variables.");
        }
    }

    private static string BuildBody(ContactRequest request) =>
        $"""
        Новое обращение с сайта ООО «Первый»

        Имя: {request.Name.Trim()}
        Телефон: {request.Phone.Trim()}
        E-mail: {request.Email?.Trim() ?? "не указан"}

        Комментарий:
        {request.Message?.Trim() ?? "Прошу связаться со мной."}

        Получено: {DateTimeOffset.UtcNow:dd.MM.yyyy HH:mm} UTC
        """;

    private static string SanitizeHeader(string value) =>
        value.Replace("\r", " ").Replace("\n", " ").Trim();
}
