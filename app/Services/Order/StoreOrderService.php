<?php

namespace App\Services\Order;

use App\Mail\OrderConfirmed;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class StoreOrderService
{
    /**
     * Handle the order creation logic.
     *
     * @param array $data
     * @return Order
     */
    public function execute(array $data): Order
    {
        return DB::transaction(function () use ($data) {
            $total_amount = 0;
            $items_to_create = [];

            foreach ($data['items'] as $item_data) {
                $product = Product::findOrFail($item_data['product_id']);
                $price = (float) $product->price;
                $quantity = (int) $item_data['quantity'];
                
                $total_amount += $price * $quantity;

                $items_to_create[] = [
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'price' => $price,
                ];
            }

            $delivery_method = $data['delivery_method'] ?? 'delivery';
            $is_pickup = $delivery_method === 'pickup';

            $shipping_cost = $is_pickup ? 0.0 : (float) ($data['shipping_cost'] ?? 0);
            $total_amount += $shipping_cost;

            $order = Order::create([
                'user_id' => Auth::id(),
                'total_amount' => $total_amount,
                'status' => 'pending',
                'delivery_method' => $delivery_method,
                'cep' => $is_pickup ? null : $data['cep'],
                'street' => $is_pickup ? null : $data['street'],
                'number' => $is_pickup ? null : $data['number'],
                'complement' => $is_pickup ? null : ($data['complement'] ?? null),
                'neighborhood' => $is_pickup ? null : $data['neighborhood'],
                'city' => $is_pickup ? null : $data['city'],
                'state' => $is_pickup ? null : $data['state'],
                'shipping_method' => $is_pickup ? 'Retirada no Local' : ($data['shipping_method'] ?? null),
                'shipping_cost' => $shipping_cost,
                'payment_status' => 'pending',
            ]);

            foreach ($items_to_create as $item) {
                $order->items()->create($item);
                
                $product = Product::find($item['product_id']);
                if ($product) {
                    $product->decrement('stock', $item['quantity']);
                    
                    // Se o estoque chegar a 0, desativa o produto
                    if ($product->fresh()->stock <= 0) {
                        $product->update(['is_active' => false]);
                    }
                }
            }

            $order->load('items.product', 'user');

            Mail::to($order->user->email)->send(new OrderConfirmed($order));
            Mail::to(config('mail.admin_address'))->send(new OrderConfirmed($order));

            return $order;
        });
    }
}
