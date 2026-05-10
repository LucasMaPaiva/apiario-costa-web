<?php

namespace App\Services\Order;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

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

            $order = Order::create([
                'user_id' => Auth::id(),
                'total_amount' => $total_amount,
                'status' => 'pending',
                'cep' => $data['cep'],
                'street' => $data['street'],
                'number' => $data['number'],
                'complement' => $data['complement'] ?? null,
                'neighborhood' => $data['neighborhood'],
                'city' => $data['city'],
                'state' => $data['state'],
            ]);

            foreach ($items_to_create as $item) {
                $order->items()->create($item);
            }

            return $order->load('items.product');
        });
    }
}
