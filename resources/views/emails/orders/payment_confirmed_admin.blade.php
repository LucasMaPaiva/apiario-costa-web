<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pagamento Recebido</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 0; }
        .wrapper { max-width: 600px; margin: 32px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
        .header { background: #16a34a; padding: 32px; text-align: center; }
        .header h1 { color: #fff; margin: 0; font-size: 24px; }
        .header p { color: #fff; margin: 8px 0 0; opacity: 0.9; }
        .body { padding: 32px; }
        .body h2 { color: #1f2937; font-size: 18px; margin-top: 0; }
        .body p { color: #4b5563; line-height: 1.6; }
        table { width: 100%; border-collapse: collapse; margin: 24px 0; }
        th { background: #f0fdf4; color: #166534; text-align: left; padding: 10px 12px; font-size: 13px; }
        td { padding: 10px 12px; border-bottom: 1px solid #f3f4f6; color: #374151; font-size: 14px; }
        tr:last-child td { border-bottom: none; }
        .total-row td { font-weight: bold; color: #1f2937; background: #f9fafb; }
        .info-box { background: #f9fafb; border-radius: 6px; padding: 16px; margin: 16px 0; font-size: 14px; color: #374151; line-height: 1.7; }
        .footer { background: #f9fafb; padding: 20px 32px; text-align: center; font-size: 12px; color: #9ca3af; }
    </style>
</head>
<body>
<div class="wrapper">
    <div class="header">
        <h1>🍯 Apiário Costa</h1>
        <p>Pagamento confirmado</p>
    </div>
    <div class="body">
        <h2>Pagamento aprovado para o pedido #{{ $order->id }}</h2>
        <p>
            O pagamento do pedido <strong>#{{ $order->id }}</strong> foi confirmado e o status já foi atualizado para <strong>Pago</strong>.
            Assim que possível, mude o status para "Em Preparação" e siga com a separação do pedido.
        </p>

        <div class="info-box">
            <strong>Cliente:</strong> {{ $order->user->name }} ({{ $order->user->email }})<br>
            <strong>Recebimento:</strong> {{ $order->delivery_method === 'pickup' ? 'Retirada no local' : 'Entrega' }}
            @if($order->delivery_method !== 'pickup')
                — {{ $order->city }}/{{ $order->state }}
            @endif
        </div>

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
    </div>
    <div class="footer">
        © {{ date('Y') }} Apiário Costa — Todos os direitos reservados.
    </div>
</div>
</body>
</html>
