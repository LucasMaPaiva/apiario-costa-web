<?php

namespace App\Mail;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OrderStatusUpdated extends Mailable
{
    use Queueable, SerializesModels;

    public const STATUS_LABELS = [
        'pending'          => 'Pendente',
        'paid'             => 'Pago',
        'processing'       => 'Em Preparação',
        'ready_for_pickup' => 'Pronto para Retirada',
        'shipped'          => 'Enviado',
        'delivered'        => 'Entregue',
        'cancelled'        => 'Cancelado',
    ];

    public string $statusLabel;

    public function __construct(public Order $order)
    {
        $this->statusLabel = self::STATUS_LABELS[$order->status] ?? $order->status;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Pedido #' . $this->order->id . ' — ' . $this->statusLabel . ' — Apiário Costa',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.orders.status_updated',
        );
    }
}
