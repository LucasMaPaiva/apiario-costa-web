install: build setup-networks up
	docker compose exec app composer install
	docker compose exec app npm install
	docker compose exec app php artisan key:generate --ansi
	docker compose exec app php artisan migrate --ansi
	docker compose exec app npm run build
	$(MAKE) fix-permissions

fix-permissions:
	docker compose exec app chmod -R 777 storage bootstrap/cache

setup-networks:
	docker network inspect nginx-proxy-manager >/dev/null 2>&1 || docker network create nginx-proxy-manager

build:
	docker compose build

up: setup-networks
	docker compose up -d
	$(MAKE) fix-permissions

down:
	docker compose down

stop:
	docker compose stop

shell:
	docker compose exec app sh

logs:
	docker compose logs -f

migrate:
	docker compose exec app php artisan migrate

tinker:
	docker compose exec app php artisan tinker

npm-dev:
	docker compose exec app npm run dev

npm-build:
	docker compose exec app npm run build
