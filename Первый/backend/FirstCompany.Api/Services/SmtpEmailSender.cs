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
            IsBodyHtml = true,
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
            DeliveryMethod = SmtpDeliveryMethod.Network,
        };

        if (!string.IsNullOrWhiteSpace(_options.Username))
        {
            smtpClient.Credentials = new NetworkCredential(
                _options.Username,
                _options.Password);
        }

        await smtpClient.SendMailAsync(message, cancellationToken);
    }

    private void EnsureConfigured()
    {
        if (string.IsNullOrWhiteSpace(_options.Host)
            || string.IsNullOrWhiteSpace(_options.FromEmail)
            || string.IsNullOrWhiteSpace(_options.RecipientEmail)
            || _options.Port is < 1 or > 65535)
        {
            throw new InvalidOperationException(
                "SMTP relay is not configured correctly.");
        }
    }

    private static string BuildBody(ContactRequest request) =>
        $"""
        <h2>Новое обращение с сайта ООО «Первый»</h2>
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
