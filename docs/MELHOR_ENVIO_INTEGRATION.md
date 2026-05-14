# Documentação de Integração: Melhor Envio API v2

Este documento serve como referência para o desenvolvimento da integração logística do Apiário Costa com a plataforma Melhor Envio.

## 1. Autenticação e Credenciais (OAuth 2.0)
A integração utilizará o modelo de "Aplicativo" para permitir que o administrador conecte sua conta de forma segura.
- **Ambientes:** 
  - Sandbox (Testes): `https://sandbox.melhorenvio.com.br`
  - Produção: `https://melhorenvio.com.br`
- **Fluxo:** OAuth2 (Authorization Code Grant).
- **Validade dos Tokens:**
  - `access_token`: Expira em **30 dias**.
  - `refresh_token`: Expira em **45 dias**. (Requer cronjob para auto-renovação).
- **Headers Obrigatórios:**
  - `Authorization: Bearer {access_token}`
  - `Content-Type: application/json`
  - `User-Agent: ApiarioCosta (contato@dominio.com)` *(Obrigatório para evitar bloqueios)*

## 2. Escopos (Scopes) Necessários
Para que o sistema consiga cotar e emitir etiquetas sem erro de permissão, o login do administrador deve solicitar os seguintes escopos (separados por espaço):
*   `shipping-calculate` (Permite cotar fretes simultâneos)
*   `cart-read` (Permite ler o carrinho do ME)
*   `cart-write` (Permite adicionar envios ao carrinho do ME)
*   `shipping-checkout` (Permite pagar as etiquetas via API)
*   `shipping-generate` (Permite gerar o lote de etiquetas)
*   `shipping-print` (Permite gerar o PDF final)
*   `shipping-tracking` (Permite consultar o status de entrega)
*   `shipping-cancel` (Permite cancelar a etiqueta e solicitar reembolso caso o cliente cancele o pedido)
*   `shipping-companies` (Opcional, útil para buscar as logos e nomes reais das transportadoras)
*   `users-read` (Usado para buscar o nome e foto do lojista após conectar a conta)

## 3. Endpoints Principais do Fluxo

### 3.1. Cotação de Frete
*   **Endpoint:** `POST /api/v2/me/shipment/calculate`
*   **Payload Essencial:** Exige o CEP de origem (da loja), CEP de destino (do cliente) e os **produtos**.
*   **Requisitos de Produto:** Cada item no payload deve ter `id`, `width` (largura), `height` (altura), `length` (comprimento), `weight` (peso) e `quantity`.

### 3.2. Fluxo de Geração de Etiqueta (Após Pedido Pago)
A compra de frete no Melhor Envio simula um e-commerce interno. Os passos sistêmicos são:
1.  **Adicionar ao Carrinho:** `POST /api/v2/me/cart` -> Envia remetente, destinatário, itens e agência escolhida. Retorna um ID de pedido do ME.
2.  **Pagar Etiqueta:** `POST /api/v2/me/shipment/checkout` -> Deduz o valor da carteira virtual do lojista no Melhor Envio.
3.  **Gerar:** `POST /api/v2/me/shipment/generate` -> Confirma a emissão junto aos Correios/Transportadora.
4.  **Imprimir:** `POST /api/v2/me/shipment/print` -> Retorna a URL do PDF da etiqueta para o administrador colar na caixa.
