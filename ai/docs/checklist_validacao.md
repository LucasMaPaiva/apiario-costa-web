# Checklist de Validação do Projeto

Este documento detalha os passos necessários para validar a integridade técnica e estética do projeto Apiário Costa Web.

## 🚀 Passos Imediatos de Infraestrutura

- [x] **Instalação de Dependências**: 
    - Execute `npm install` para garantir que todos os binários nativos (como o `rolldown`) estejam instalados corretamente.
- [x] **Build do Frontend**:
    - Execute `npm run build`. O build deve completar sem erros de "Module Not Found".
- [x] **Migrações do Banco de Dados**:
    - Verifique se todas as migrações foram executadas: `php artisan migrate`.
    - Atenção especial às tabelas de `orders`, `order_items` e `integrations`.

## 🛠️ Validação de Código e Nomenclatura

- [x] **Variáveis (Snake Case)**:
    - Garantir que TODAS as variáveis sigam o padrão `snake_case`.
    - **Arquivos Corrigidos**:
        - `app/Services/Order/StoreOrderService.php`
        - `resources/js/modules/admin/services/adminOrderService.ts`
        - `resources/js/modules/admin/hooks/useAdminOrders.ts`
        - `resources/js/modules/auth/components/RegisterForm.tsx`
        - `resources/js/modules/cart/context/CartContext.tsx`
        - `resources/js/modules/cart/components/CartDrawer.tsx`
        - `resources/js/common/components/ui/Navbar.tsx`
        - `resources/js/pages/store/index.tsx`
        - `resources/js/pages/store/ProductDetails.tsx`
        - `resources/js/pages/admin/categories/index.tsx`
        - `resources/js/layouts/AdminLayout.tsx`
        - `resources/js/pages/store/Checkout.tsx`
        - `resources/js/modules/orders/services/orderService.ts`
- [x] **Métodos e Classes (Camel Case)**:
    - Validar se todos os métodos e classes seguem o padrão `camelCase`.
- [x] **Consistência CSS/Tailwind**:
    - Substituir a classe inexistente `bg-brand-bg` pela classe correta definida no tema (`bg-bg-main`).
    - **Arquivos Corrigidos**: `LoginForm.tsx`, `RegisterForm.tsx`, `register.tsx`, `store/index.tsx`, `CartDrawer.tsx`, `Checkout.tsx`.

## 📦 Commits e Versionamento

- [x] **Limpeza de Alterações**:
    - Revisar e commitar as alterações pendentes relacionadas a Pedidos e Integrações.
    - Evitar commitar arquivos de configuração local (`.env`, `Makefile` modificado, etc.).
