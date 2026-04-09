# PocketBase setup for product subproducts and variations

Apply these changes in your PocketBase admin.

## 1) Collection: `Subprodutos`

Create collection `Subprodutos` with:

- `product` (relation -> `Produtos`, max select: 1, required)
- `name_pt` (text, required)
- `name_en` (text)
- `name_es` (text)
- `name_fr` (text)
- `name_de` (text)
- `image` (file, max select: 1, optional)
- `reference` (text)
- `order` (number)
- `active` (bool, default `true`)

Recommended list rule (read from public website):

- `active = true`

## 2) Collection: `Variacoes`

Create collection `Variacoes` with:

- `product` (relation -> `Produtos`, max select: 1, required)
- `subproduct` (relation -> `Subprodutos`, max select: 1, optional)
- `image` (file, max select: 1, optional)
- `reference` (text, required)
- `price` (number, optional)
- `price_visible` (bool, default `false`)
- `materials` (relation -> `Materiais`, max select: many)
- `ral_colors` (relation -> `Cores_Ral`, max select: many)
- `order` (number)
- `active` (bool, default `true`)

Recommended list rule (read from public website):

- `active = true`

## 3) Data rules used by frontend

- If a product has one or more `Subprodutos`, users must select:
  1) subproduct
  2) one variation linked to that subproduct (`Variacoes.subproduct` filled)
- If a product has no subproducts, users select directly from variations where
  `Variacoes.subproduct` is empty.

Note: current frontend also accepts legacy aliases already present in your data:
- `Subprodutos.products` (instead of `product`)
- `Subprodutos.ref` / `Variacoes.ref` (instead of `reference`)
- `Variacoes.ral` (instead of `ral_colors`)

## 4) Seed examples to test

- Product A:
  - 2 subproducts
  - each subproduct has 2+ variations
- Product B:
  - no subproducts
  - 2+ direct variations (`subproduct` empty)
