<?php

namespace App\Services\Logistics;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MotoboyShippingService
{
    // Mercado Municipal São Francisco - Av. Maj. Williams, 1009 - Centro, Boa Vista - RR
    private const ORIGIN_LAT = 2.8274831;
    private const ORIGIN_LNG = -60.6692466;

    private const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';
    private const OSRM_URL = 'https://router.project-osrm.org/route/v1/driving';

    public function calculate(array $location): ?array
    {
        $coords = $this->geocode($location);
        if (!$coords) {
            Log::info('Motoboy: não foi possível geocodificar o endereço.', $location);
            return null;
        }

        $distanceKm = $this->routeDistanceKm($coords['lat'], $coords['lng']);
        if ($distanceKm === null) {
            Log::info('Motoboy: não foi possível calcular a rota.', $coords);
            return null;
        }

        $price = $this->priceForDistance($distanceKm);

        Log::info('Motoboy: frete calculado.', ['distance_km' => round($distanceKm, 2), 'price' => $price]);

        return [
            'id'            => 'motoboy',
            'name'          => 'Motoboy - Entrega Expressa',
            'price'         => $price,
            'delivery_time' => 1,
            'company'       => 'Apiário Costa',
            'company_logo'  => '/logo.jpg',
        ];
    }

    private function priceForDistance(float $km): float
    {
        if ($km < 10) return 10.00;
        if ($km < 15) return 15.00;
        return 20.00;
    }

    private function geocode(array $location): ?array
    {
        $parts = array_filter([
            $location['street'] ?? null,
            $location['neighborhood'] ?? null,
            'Boa Vista',
            'Roraima',
            'Brasil',
        ]);
        $query = implode(', ', $parts);

        return Cache::remember('motoboy:geocode:' . md5($query), now()->addDays(30), function () use ($query) {
            try {
                $response = Http::timeout(5)
                    ->withHeaders(['User-Agent' => 'ApiarioCostaWeb/1.0'])
                    ->get(self::NOMINATIM_URL, [
                        'format'       => 'json',
                        'q'            => $query,
                        'limit'        => 1,
                        'countrycodes' => 'br',
                    ]);

                if ($response->failed()) return null;

                $data = $response->json();
                if (empty($data)) return null;

                return [
                    'lat' => (float) $data[0]['lat'],
                    'lng' => (float) $data[0]['lon'],
                ];
            } catch (\Throwable $e) {
                Log::warning('Motoboy: erro ao geocodificar.', ['error' => $e->getMessage(), 'query' => $query]);
                return null;
            }
        });
    }

    private function routeDistanceKm(float $lat, float $lng): ?float
    {
        $url = sprintf('%s/%F,%F;%F,%F', self::OSRM_URL, self::ORIGIN_LNG, self::ORIGIN_LAT, $lng, $lat);

        try {
            $response = Http::timeout(5)->get($url, ['overview' => 'false']);

            if ($response->failed()) return null;

            $data = $response->json();
            if (($data['code'] ?? null) !== 'Ok' || empty($data['routes'])) return null;

            return $data['routes'][0]['distance'] / 1000;
        } catch (\Throwable $e) {
            Log::warning('Motoboy: erro ao calcular rota.', ['error' => $e->getMessage()]);
            return null;
        }
    }
}
