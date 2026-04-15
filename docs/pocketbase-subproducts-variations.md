# PocketBase: subproducts and PDP configurator

Apply these changes in your PocketBase admin.

## 1) Collection: `Produtos` (configurator fields)

Add relations on **`Produtos`**:

- **`materiais_disponiveis`** (relation → `Materiais`, max select: many) — materials the customer can choose on the PDP for this product.
- **`ral_disponiveis`** (relation → `Cores_Ral`, max select: many) — RAL colors available for this product on the PDP.

**Deprecated / remove from PDP (and from this product schema when ready):**

- **`cores_recomendado`** — no longer used by the storefront; RAL choice moved into the configurator via `ral_disponiveis`.

List/read rules must allow the site to **`expand=materiais_disponiveis,ral_disponiveis`** (plus existing expands) on `Produtos`.

## 2) Collection: `Subprodutos`

Unchanged intent: each row is a variant “type” (e.g. bench, chair, table) for a product.

- `product` (relation → `Produtos`, max select: 1, required)
- `name_pt` (text, required) + other locale names
- `image` (file, optional)
- `reference` (text)
- `order` (number)
- `active` (bool, default `true`)

Recommended list rule: `active = true`

Legacy field aliases still accepted by the API client if present: `products` instead of `product`, `ref` instead of `reference`.

## 3) Collection: `Variacoes` (legacy)

The **PDP configurator no longer reads `Variacoes`**. Quote lines are **composite**: subproduct + material + RAL chosen from product-level lists, without matching a variation row.

You may keep the collection for data history or other tools; the storefront does not fetch it for product configuration.

## 4) PDP flow

1. User picks a **subproduct** (if the product has any).
2. User picks **material** from `materiais_disponiveis`.
3. User picks **RAL** from `ral_disponiveis`.
4. **Add to quote** sends a cart line with those ids (no `Variacoes` id).

If there are **no subproducts** and **no** material/RAL lists: **Add to quote** for the base product only.

If there are **no subproducts** but **lists exist**: material and RAL are **required** when their lists are non-empty.

## 5) Seed examples

- Product with 3 subproducts, `materiais_disponiveis` + `ral_disponiveis` filled.
- Product with no subproducts, only lists → configurator shows material + RAL then add.
- Product with nothing → simple “add to quote” only.
