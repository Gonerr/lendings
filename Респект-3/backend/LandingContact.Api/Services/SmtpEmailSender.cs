using System.Net;
using System.Net.Mail;
using System.Text;
using LandingContact.Api.Models;
using LandingContact.Api.Options;
using Microsoft.Extensions.Options;

namespace LandingContact.Api.Services;

public sealed class SmtpEmailSender(
    IOptions<ContactOptions> contactOptions,
    IOptions<SmtpOptions> smtpOptions) : IEmailSender
{
    private readonly ContactOptions _contactOptions = contactOptions.Value;
    private readonly SmtpOptions _smtpOptions = smtpOptions.Value;

    public async Task SendContactRequestAsync(
        ContactRequest request,
        CancellationToken cancellationToken)
    {
        EnsureConfigured();

        var siteName = string.IsNullOrWhiteSpace(_contactOptions.SiteName)
            ? "Лендинг"
            : _contactOptions.SiteName.Trim();

        using var message = new MailMessage
        {
            From = new MailAddress(
                _smtpOptions.FromEmail,
                _smtpOptions.FromName,
                Encoding.UTF8),
            Subject = $"Обращение с сайта {SanitizeHeader(siteName)}: {SanitizeHeader(request.Name)}",
            SubjectEncoding = Encoding.UTF8,
            BodyEncoding = Encoding.UTF8,
            IsBodyHtml = true,
            Body = BuildBody(siteName, request),
        };

        message.To.Add(new MailAddress(_smtpOptions.RecipientEmail));

        if (!string.IsNullOrWhiteSpace(request.Email))
        {
            message.ReplyToList.Add(new MailAddress(request.Email.Trim()));
        }

        using var smtpClient = new SmtpClient(_smtpOptions.Host, _smtpOptions.Port)
        {
            EnableSsl = _smtpOptions.EnableSsl,
            UseDefaultCredentials = false,
            DeliveryMethod = SmtpDeliveryMethod.Network,
        };

        if (!string.IsNullOrWhiteSpace(_smtpOptions.Username))
        {
            smtpClient.Credentials = new NetworkCredential(
                _smtpOptions.Username,
                _smtpOptions.Password);
        }

        await smtpClient.SendMailAsync(message, cancellationToken);
    }

    private void EnsureConfigured()
    {
        if (string.IsNullOrWhiteSpace(_smtpOptions.Host)
            || string.IsNullOrWhiteSpace(_smtpOptions.FromEmail)
            || string.IsNullOrWhiteSpace(_smtpOptions.RecipientEmail)
            || _smtpOptions.Port is < 1 or > 65535)
        {
            throw new InvalidOperationException(
                "SMTP relay is not configured correctly.");
        }
    }

    private static string BuildBody(string siteName, ContactRequest request) =>
        $"""
        <h2>Новое обращение с сайта {WebUtility.HtmlEncode(siteName)}</h2>
        <p><b>Имя:</b> {WebUtility.HtmlEncode(request.Name.Trim())}</p>
        <p><b>Телефон:</b> {WebUtility.HtmlEncode(request.Phone.Trim())}</p>
        <p><b>E-mail:</b> {WebUtility.HtmlEncode(request.Email?.Trim() ?? "не указан")}</p>
        <p><b>Комментарий:</b><br/>{HtmlEncodeWithBreaks(request.Message)}</p>
        <p><small>Получено: {DateTimeOffset.Now:dd.MM.yyyy HH:mm}</small></p>
        """;

    private static string HtmlEncodeWithBreaks(string? value)
    {
        var text = string.IsNullOrWhiteSpace(value)
            ? "Прошу связаться со мной."
            : value.Trim();

        return WebUtility.HtmlEncode(text)
            .Replace("\r\n", "<br/>")
            .Replace("\n", "<br/>");
    }

    private static string SanitizeHeader(string value) =>
        value.Replace("\r", " ").Replace("\n", " ").Trim();
}
