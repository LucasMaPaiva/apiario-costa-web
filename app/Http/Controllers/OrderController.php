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
            $user = \App\Models\User::find(Auth::id());
            $orders = $user->orders()->with('items.product')->orderBy('id', 'desc')->get();
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
     * Display the specified order (Client).
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        try {
            $user = \App\Models\User::find(Auth::id());
            $order = $user->orders()->with('items.product')->findOrFail($id);
            return self::successResponse($order);
        } catch (\Exception $e) {
            return self::returnError($e);
        }
    }

    /**
     * Display the specified order (Admin).
     *
     * @param int $id
     * @return JsonResponse
     */
    public function adminShow(int $id): JsonResponse
    {
        try {
            $order = \App\Models\Order::with(['user', 'items.product'])->findOrFail($id);
            return self::successResponse($order);
        } catch (\Exception $e) {
            return self::returnError($e);
        }
    }

    /**
     * Update order status.
     *
     * @param int $id
     * @param \Illuminate\Http\Request $request
     * @return JsonResponse
     */
    public function updateStatus(int $id, \Illuminate\Http\Request $request): JsonResponse
    {
        try {
            $order = \App\Models\Order::findOrFail($id);
            $order->update($request->only(['status', 'payment_status', 'tracking_code']));
            return self::successResponse($order, 'Pedido atualizado com sucesso.');
        } catch (\Exception $e) {
            return self::returnError($e);
        }
    }
}
