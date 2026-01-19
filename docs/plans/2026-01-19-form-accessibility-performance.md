# Form Accessibility & Performance Optimization Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix form autocomplete attributes (P0) and optimize transition-all usage (P1) per web-design-guidelines.

**Architecture:** Direct attribute additions to existing form components; targeted CSS class replacement in button component.

**Tech Stack:** React, TypeScript, Tailwind CSS, Vitest

---

## P0: Form Autocomplete Attributes (5 tasks)

### Task 1: Add autocomplete to email field

**Files:**
- Modify: `src/components/forms/fields/contact-fields.tsx:25-33`
- Test: `src/components/forms/__tests__/contact-form-fields.test.tsx`

**Step 1: Write the failing test**

Add to existing test file:

```typescript
describe('ContactFields accessibility', () => {
  it('email field has correct autocomplete attribute', () => {
    render(<ContactFields t={(key) => key} isPending={false} />);
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    expect(emailInput).toHaveAttribute('autocomplete', 'email');
  });
});
```

**Step 2: Run test to verify it fails**

Run: `pnpm test src/components/forms/__tests__/contact-form-fields.test.tsx --reporter=verbose`
Expected: FAIL - autocomplete attribute not found or incorrect value

**Step 3: Write minimal implementation**

In `src/components/forms/fields/contact-fields.tsx`, modify email Input:

```typescript
<Input
  id='email'
  name='email'
  type='email'
  placeholder={t('emailPlaceholder')}
  disabled={isPending}
  required
  aria-describedby='email-error'
  autoComplete='email'
/>
```

**Step 4: Run test to verify it passes**

Run: `pnpm test src/components/forms/__tests__/contact-form-fields.test.tsx --reporter=verbose`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/forms/fields/contact-fields.tsx src/components/forms/__tests__/contact-form-fields.test.tsx
git commit -m "fix(a11y): add autocomplete=email to contact form email field"
```

---

### Task 2: Add autocomplete to company field

**Files:**
- Modify: `src/components/forms/fields/contact-fields.tsx:43-51`
- Test: `src/components/forms/__tests__/contact-form-fields.test.tsx`

**Step 1: Write the failing test**

```typescript
it('company field has correct autocomplete attribute', () => {
  render(<ContactFields t={(key) => key} isPending={false} />);
  const companyInput = screen.getByRole('textbox', { name: /company/i });
  expect(companyInput).toHaveAttribute('autocomplete', 'organization');
});
```

**Step 2: Run test to verify it fails**

Run: `pnpm test src/components/forms/__tests__/contact-form-fields.test.tsx --reporter=verbose`
Expected: FAIL

**Step 3: Write minimal implementation**

```typescript
<Input
  id='company'
  name='company'
  type='text'
  placeholder={t('companyPlaceholder')}
  disabled={isPending}
  required
  aria-describedby='company-error'
  autoComplete='organization'
/>
```

**Step 4: Run test to verify it passes**

Run: `pnpm test src/components/forms/__tests__/contact-form-fields.test.tsx --reporter=verbose`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/forms/fields/contact-fields.tsx src/components/forms/__tests__/contact-form-fields.test.tsx
git commit -m "fix(a11y): add autocomplete=organization to contact form company field"
```

---

### Task 3: Add autocomplete to name fields

**Files:**
- Modify: `src/components/forms/fields/name-fields.tsx:25-33,43-51`
- Test: `src/components/forms/__tests__/contact-form-fields.test.tsx`

**Step 1: Write the failing test**

```typescript
describe('NameFields accessibility', () => {
  it('firstName field has correct autocomplete attribute', () => {
    render(<NameFields t={(key) => key} isPending={false} />);
    const firstNameInput = screen.getByRole('textbox', { name: /firstName/i });
    expect(firstNameInput).toHaveAttribute('autocomplete', 'given-name');
  });

  it('lastName field has correct autocomplete attribute', () => {
    render(<NameFields t={(key) => key} isPending={false} />);
    const lastNameInput = screen.getByRole('textbox', { name: /lastName/i });
    expect(lastNameInput).toHaveAttribute('autocomplete', 'family-name');
  });
});
```

**Step 2: Run test to verify it fails**

Run: `pnpm test src/components/forms/__tests__/contact-form-fields.test.tsx --reporter=verbose`
Expected: FAIL

**Step 3: Write minimal implementation**

In `src/components/forms/fields/name-fields.tsx`:

```typescript
// firstName Input
<Input
  id='firstName'
  name='firstName'
  type='text'
  placeholder={t('firstNamePlaceholder')}
  disabled={isPending}
  required
  aria-describedby='firstName-error'
  autoComplete='given-name'
/>

// lastName Input
<Input
  id='lastName'
  name='lastName'
  type='text'
  placeholder={t('lastNamePlaceholder')}
  disabled={isPending}
  required
  aria-describedby='lastName-error'
  autoComplete='family-name'
/>
```

**Step 4: Run test to verify it passes**

Run: `pnpm test src/components/forms/__tests__/contact-form-fields.test.tsx --reporter=verbose`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/forms/fields/name-fields.tsx src/components/forms/__tests__/contact-form-fields.test.tsx
git commit -m "fix(a11y): add autocomplete to name fields (given-name, family-name)"
```

---

### Task 4: Add autocomplete to phone field

**Files:**
- Modify: `src/components/forms/fields/additional-fields.tsx:21-28`
- Test: `src/components/forms/__tests__/contact-form-fields.test.tsx`

**Step 1: Write the failing test**

```typescript
describe('AdditionalFields accessibility', () => {
  it('phone field has correct autocomplete attribute', () => {
    render(<AdditionalFields t={(key) => key} isPending={false} />);
    const phoneInput = screen.getByRole('textbox', { name: /phone/i });
    expect(phoneInput).toHaveAttribute('autocomplete', 'tel');
  });
});
```

**Step 2: Run test to verify it fails**

Run: `pnpm test src/components/forms/__tests__/contact-form-fields.test.tsx --reporter=verbose`
Expected: FAIL

**Step 3: Write minimal implementation**

```typescript
<Input
  id='phone'
  name='phone'
  type='tel'
  placeholder={t('phonePlaceholder')}
  disabled={isPending}
  aria-describedby='phone-error'
  autoComplete='tel'
/>
```

**Step 4: Run test to verify it passes**

Run: `pnpm test src/components/forms/__tests__/contact-form-fields.test.tsx --reporter=verbose`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/forms/fields/additional-fields.tsx src/components/forms/__tests__/contact-form-fields.test.tsx
git commit -m "fix(a11y): add autocomplete=tel to phone field"
```

---

### Task 5: Verify all form autocomplete changes

**Files:**
- Test: All form field tests

**Step 1: Run full form test suite**

Run: `pnpm test src/components/forms --reporter=verbose`
Expected: All tests PASS

**Step 2: Run type check**

Run: `pnpm type-check`
Expected: No errors

**Step 3: Commit summary (if needed)**

If any adjustments were made:
```bash
git add -A
git commit -m "fix(a11y): complete form autocomplete attributes per web-design-guidelines"
```

---

## P1: Button transition-all Optimization (2 tasks)

### Task 6: Optimize button.tsx transition

**Files:**
- Modify: `src/components/ui/button.tsx:7`
- Test: `src/components/ui/__tests__/button.test.tsx`

**Step 1: Write the failing test**

```typescript
describe('Button performance', () => {
  it('uses specific transition properties instead of transition-all', () => {
    render(<Button>Test</Button>);
    const button = screen.getByRole('button');
    // Verify no transition-all class
    expect(button.className).not.toMatch(/\btransition-all\b/);
    // Verify specific transition class exists
    expect(button.className).toMatch(/\btransition-colors\b/);
  });
});
```

**Step 2: Run test to verify it fails**

Run: `pnpm test src/components/ui/__tests__/button.test.tsx --reporter=verbose`
Expected: FAIL - transition-all found

**Step 3: Write minimal implementation**

In `src/components/ui/button.tsx`, change line 7:

```typescript
// Before
"inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none ..."

// After
"inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors outline-none ..."
```

**Step 4: Run test to verify it passes**

Run: `pnpm test src/components/ui/__tests__/button.test.tsx --reporter=verbose`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/ui/button.tsx src/components/ui/__tests__/button.test.tsx
git commit -m "perf(ui): replace transition-all with transition-colors in button"
```

---

### Task 7: Final verification

**Files:**
- All modified files

**Step 1: Run full test suite**

Run: `pnpm test --reporter=verbose`
Expected: All tests PASS

**Step 2: Run quality gate**

Run: `pnpm ci:local:quick`
Expected: All checks PASS

**Step 3: Visual verification (optional)**

Run: `pnpm dev`
Verify: Form fields autocomplete works, button transitions look correct

**Step 4: Final commit (if needed)**

```bash
git add -A
git commit -m "chore: form accessibility and button performance fixes complete"
```

---

## Summary

| Priority | Tasks | Estimated Time |
|----------|-------|----------------|
| P0 | Tasks 1-5 | ~25 min |
| P1 | Tasks 6-7 | ~10 min |
| **Total** | **7 tasks** | **~35 min** |

## Verification Commands

```bash
# Form autocomplete
pnpm test src/components/forms

# Button transition
pnpm test src/components/ui/__tests__/button.test.tsx

# Full suite
pnpm ci:local:quick
```
