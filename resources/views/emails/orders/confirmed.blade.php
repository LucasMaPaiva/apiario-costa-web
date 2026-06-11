<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pedido Confirmado</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 0; }
        .wrapper { max-width: 600px; margin: 32px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
        .header { background: #f59e0b; padding: 32px; text-align: center; }
        .header h1 { color: #fff; margin: 0; font-size: 24px; }
        .header p { color: #fff; margin: 8px 0 0; opacity: 0.9; }
        .body { padding: 32px; }
        .body h2 { color: #1f2937; font-size: 18px; margin-top: 0; }
        .body p { color: #4b5563; line-height: 1.6; }
        table { width: 100%; border-collapse: collapse; margin: 24px 0; }
        th { background: #fef3c7; color: #92400e; text-align: left; padding: 10px 12px; font-size: 13px; }
        td { padding: 10px 12px; border-bottom: 1px solid #f3f4f6; color: #374151; font-size: 14px; }
        tr:last-child td { border-bottom: none; }
        .total-row td { font-weight: bold; color: #1f2937; background: #f9fafb; }
        .address-box { background: #f9fafb; border-radius: 6px; padding: 16px; margin: 16px 0; font-size: 14px; color: #374151; line-height: 1.7; }
        .badge { display: inline-block; background: #fef3c7; color: #92400e; border-radius: 4px; padding: 2px 10px; font-size: 13px; font-weight: bold; }
        .footer { background: #f9fafb; padding: 20px 32px; text-align: center; font-size: 12px; color: #9ca3af; }
    </style>
</head>
<body>
<div class="wrapper">
    <div class="header">
        <h1>🍯 Apiário Costa</h1>
        <p>Seu pedido foi recebido!</p>
    </div>
    <div class="body">
        <h2>Olá, {{ $order->user->name }}!</h2>
        <p>
            Recebemos seu pedido <strong>#{{ $order->id }}</strong> e ele já está sendo processado.
            Em breve entraremos em contato com as informações de envio.
        </p>

        <table>
            <thead>
                <tr>
                    <th>Produto</th>
                    <th style="text-align:center">Qtd</th>
                    <th style="text-align:right">Subtotal</th>
                </tr>
            </thead>
            <tbody>
                @foreach($order->items as $item)
                <tr>
                    <td>{{ $item->product->name }}</td>
                    <td style="text-align:center">{{ $item->quantity }}</td>
                    <td style="text-align:right">R$ {{ number_format($item->price * $item->quantity, 2, ',', '.') }}</td>
                </tr>
                @endforeach
                @if($order->shipping_cost > 0)
                <tr>
                    <td colspan="2">Frete ({{ $order->shipping_method ?? 'Padrão' }})</td>
                    <td style="text-align:right">R$ {{ number_format($order->shipping_cost, 2, ',', '.') }}</td>
                </tr>
                @endif
                <tr class="total-row">
                    <td colspan="2">Total</td>
                    <td style="text-align:right">R$ {{ number_format($order->total_amount, 2, ',', '.') }}</td>
                </tr>
            </tbody>
        </table>

        @if($order->delivery_method === 'pickup')
        <p><strong>Retirada no local:</strong></p>
        <div class="address-box">
            O pedido será retirado diretamente no Apiário Costa. Em breve entraremos em contato para combinar o melhor horário.
        </div>
        @else
        <p><strong>Endereço de entrega:</strong></p>
        <div class="address-box">
            {{ $order->street }}, {{ $order->number }}
            @if($order->complement) — {{ $order->complement }}@endif<br>
            {{ $order->neighborhood }} — {{ $order->city }}/{{ $order->state }}<br>
            CEP: {{ $order->cep }}
        </div>
        @endif

        <p>Status do pedido: <span class="badge">Aguardando pagamento</span></p>
        <p style="color:#6b7280; font-size:13px;">Qualquer dúvida, responda este email ou entre em contato conosco.</p>
    </div>
    <div class="footer">
        © {{ date('Y') }} Apiário Costa — Todos os direitos reservados.
    </div>
</div>
</body>
</html>
