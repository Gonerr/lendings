namespace FirstCompany.Api.Options;

public sealed class SmtpOptions
{
    public const string SectionName = "Smtp";

    public string Host { get; init; } = "10.10.0.27";
    public int Port { get; init; } = 25;
    public bool EnableSsl { get; init; }
    public string Username { get; init; } = string.Empty;
    public string Password { get; init; } = string.Empty;
    public string FromEmail { get; init; } = "no-reply@l1-stroy.ru";
    public string FromName { get; init; } = "Сайт ООО «Первый»";
    public string RecipientEmail { get; init; } = "aalihacheva@l1n1.ru";
}
