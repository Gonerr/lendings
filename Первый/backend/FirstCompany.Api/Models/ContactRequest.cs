using System.ComponentModel.DataAnnotations;

namespace FirstCompany.Api.Models;

public sealed class ContactRequest
{
    [Required(ErrorMessage = "Укажите имя.")]
    [StringLength(100)]
    public string Name { get; init; } = string.Empty;

    [Required(ErrorMessage = "Укажите телефон.")]
    [StringLength(50)]
    public string Phone { get; init; } = string.Empty;

    [EmailAddress(ErrorMessage = "Укажите корректный e-mail.")]
    [StringLength(254)]
    public string? Email { get; init; }

    [StringLength(2000)]
    public string? Message { get; init; }

    [StringLength(200)]
    public string? Website { get; init; }
}
