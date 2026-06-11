<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Atualização do Pedido</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 0; }
        .wrapper { max-width: 600px; margin: 32px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
        .header { background: #d97706; padding: 32px; text-align: center; }
        .header h1 { color: #fff; margin: 0; font-size: 24px; }
        .header p { color: #fff; margin: 8px 0 0; opacity: 0.9; }
        .body { padding: 32px; }
        .body h2 { color: #1f2937; font-size: 18px; margin-top: 0; }
        .body p { color: #4b5563; line-height: 1.6; }
        table { width: 100%; border-collapse: collapse; margin: 24px 0; }
        th { background: #fff7ed; color: #92400e; text-align: left; padding: 10px 12px; font-size: 13px; }
        td { padding: 10px 12px; border-bottom: 1px solid #f3f4f6; color: #374151; font-size: 14px; }
        tr:last-child td { border-bottom: none; }
        .total-row td { font-weight: bold; color: #1f2937; background: #f9fafb; }
        .badge { display: inline-block; background: #ffedd5; color: #92400e; border-radius: 4px; padding: 2px 10px; font-size: 13px; font-weight: bold; }
        .info-box { background: #f9fafb; border-radius: 6px; padding: 16px; margin: 16px 0; font-size: 14px; color: #374151; line-height: 1.7; }
        .whatsapp-box { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; margin: 24px 0; text-align: center; }
        .whatsapp-box p { margin: 0 0 12px; color: #166534; font-weight: bold; }
        .whatsapp-button { display: inline-block; background: #25D366; color: #fff !important; text-decoration: none; padding: 10px 24px; border-radius: 6px; font-size: 14px; font-weight: bold; }
        .footer { background: #f9fafb; padding: 20px 32px; text-align: center; font-size: 12px; color: #9ca3af; }
    </style>
</head>
<body>
<div class="wrapper">
    <div class="header">
        <h1>🍯 Apiário Costa</h1>
        <p>Atualização do seu pedido</p>
    </div>
    <div class="body">
        <h2>Olá, {{ $order->user->name }}!</h2>
        <p>
            O status do seu pedido <strong>#{{ $order->id }}</strong> foi atualizado para:
        </p>

        <p><span class="badge">{{ $statusLabel }}</span></p>

        @if($order->status === 'shipped' && $order->tracking_code)
            <div class="info-box">
                <strong>Código de rastreio:</strong> {{ $order->tracking_code }}
            </div>
        @endif

        @if($order->status === 'ready_for_pickup')
            <p>Seu pedido já está pronto e te espera para retirada no Apiário Costa.</p>
        @elseif($order->status === 'shipped')
            <p>Seu pedido saiu para entrega. Em breve chegará até você!</p>
        @elseif($order->status === 'delivered')
            <p>Seu pedido foi entregue. Esperamos que aproveite!</p>
        @elseif($order->status === 'cancelled')
            <p>Seu pedido foi cancelado. Caso não tenha solicitado o cancelamento, entre em contato conosco.</p>
        @elseif($order->status === 'processing')
            <p>Estamos preparando seu pedido com carinho.</p>
        @endif

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

        <div class="whatsapp-box">
            <p>Alguma dúvida ou ajuda com seu pedido? Nos mande mensagem!</p>
            <a class="whatsapp-button" href="https://wa.me/{{ config('services.whatsapp.number') }}?text={{ urlencode("Oi! Fiz o pedido #{$order->id} com os itens: " . $order->items->map(fn ($item) => $item->quantity . 'x ' . $item->product->name)->implode(', ') . ". Tenho uma dúvida e gostaria de ajuda.") }}" target="_blank">
                Falar no WhatsApp
            </a>
        </div>

        <p style="color:#6b7280; font-size:13px;">Qualquer dúvida, responda este email ou entre em contato conosco.</p>
    </div>
    <div class="footer">
        © {{ date('Y') }} Apiário Costa — Todos os direitos reservados.
    </div>
</div>
</body>
</html>
