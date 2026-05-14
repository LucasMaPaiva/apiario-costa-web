const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

export function formatBRL(value: number | string | null | undefined): string {
    const number = typeof value === 'string' ? parseFloat(value) : (value ?? 0);
    return formatter.format(isNaN(number) ? 0 : number);
}
