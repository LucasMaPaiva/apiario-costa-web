<?php

namespace App\Http\Controllers;

use App\Base\Http\Controllers\BaseController;
use App\Http\Requests\Order\StoreOrderRequest;
use App\Services\Order\StoreOrderService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class OrderController extends BaseController
{
    /**
     * Store a newly created order.
     *
     * @param StoreOrderRequest $request
     * @param StoreOrderService $service
     * @return JsonResponse
     */
    public function store(StoreOrderRequest $request, StoreOrderService $service): JsonResponse
    {
        try {
            $order = $service->execute($request->validated());
            return self::successResponse($order, 'Pedido realizado com sucesso.', 201);
        } catch (\Exception $e) {
            return self::returnError($e);
        }
    }

    /**
     * List user orders.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $orders = Auth::user()->orders()->with('items.product')->orderBy('id', 'desc')->get();
            return self::successResponse($orders);
        } catch (\Exception $e) {
            return self::returnError($e);
        }
    }

    /**
     * List all orders (Admin).
     *
     * @return JsonResponse
     */
    public function adminIndex(): JsonResponse
    {
        try {
            $orders = \App\Models\Order::with(['user', 'items.product'])
                ->orderBy('id', 'desc')
                ->paginate(15);
            return self::successResponse($orders);
        } catch (\Exception $e) {
            return self::returnError($e);
        }
    }

    /**
     * Update order status.
     *
     * @param int $id
     * @param Request $request
     * @return JsonResponse
     */
    public function updateStatus(int $id, \Illuminate\Http\Request $request): JsonResponse
    {
        try {
            $order = \App\Models\Order::findOrFail($id);
            $order->update([
                'status' => $request->status,
                'payment_status' => $request->payment_status ?? $order->payment_status
            ]);
            return self::successResponse($order, 'Status do pedido atualizado.');
        } catch (\Exception $e) {
            return self::returnError($e);
        }
    }
}
