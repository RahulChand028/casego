# Casego UI Design System

A comprehensive design system built with Tailwind CSS and React, providing consistent, accessible, and reusable components for the Casego application.

## 🎨 Design Tokens

### Colors
- **Primary**: Yellow-based color scheme (#f59e0b)
- **Neutral**: Gray scale for text and backgrounds
- **Semantic**: Success (green), Error (red), Warning (yellow)
- **Background**: Light cream (#FDFBF7) for main backgrounds

### Typography
- **Font Family**: Arial, Helvetica, sans-serif
- **Font Sizes**: xs (12px) to 6xl (60px)
- **Font Weights**: thin to black
- **Line Heights**: none to loose

### Spacing
- **Scale**: 0 to 96 (0px to 384px)
- **Consistent**: 4px base unit system

## 🧩 Components

### Base Components

#### Button
```tsx
import { Button } from '@/components/ui';

<Button variant="primary" size="md" isLoading={false}>
  Click me
</Button>
```

**Variants**: `primary`, `secondary`, `danger`, `ghost`
**Sizes**: `sm`, `md`, `lg`
**Props**: `isLoading`, `leftIcon`, `rightIcon`

#### Input
```tsx
import { Input } from '@/components/ui';

<Input 
  label="Email"
  placeholder="Enter your email"
  error="Invalid email"
  leftIcon={<MailIcon />}
/>
```

**Features**: Labels, error states, icons, helper text

#### Select
```tsx
import { Select } from '@/components/ui';

<Select
  label="Country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' }
  ]}
  value={selectedCountry}
  onChange={setSelectedCountry}
  placeholder="Select a country"
/>
```

**Features**: Labels, error states, helper text, multiple sizes, variants

#### Dropdown
```tsx
import { Dropdown } from '@/components/ui';

<Dropdown
  label="Select Option"
  options={[
    { value: 'option1', label: 'Option 1', icon: <Icon1 /> },
    { value: 'option2', label: 'Option 2', description: 'Description' }
  ]}
  value={selectedValue}
  onChange={setSelectedValue}
  searchable={true}
  placeholder="Choose an option"
/>
```

**Features**: Search functionality, icons, descriptions, custom rendering

#### Modal
```tsx
import { Modal } from '@/components/ui';

<Modal 
  isOpen={isOpen}
  onRequestClose={handleClose}
  title="Modal Title"
  size="md"
>
  Modal content
</Modal>
```

**Sizes**: `sm`, `md`, `lg`, `xl`

#### Loading
```tsx
import { Loading } from '@/components/ui';

<Loading 
  size="md"
  variant="spinner"
  text="Loading..."
  fullScreen={false}
/>
```

**Variants**: `spinner`, `dots`, `pulse`
**Sizes**: `sm`, `md`, `lg`

#### Card
```tsx
import { Card } from '@/components/ui';

<Card 
  header="Card Header"
  footer="Card Footer"
  padding="md"
  shadow="md"
>
  Card content
</Card>
```

### Form Components

#### PhoneInput
```tsx
import { PhoneInput } from '@/components/ui';

<PhoneInput
  value={phoneNumber}
  countryCode={countryCode}
  onCountryCodeChange={setCountryCode}
  onPhoneNumberChange={setPhoneNumber}
  label="Phone Number"
/>
```

**Features**: Country code selection, validation, 50+ countries

### Navigation Components

#### Sidebar
```tsx
import { Sidebar } from '@/components/ui';

<Sidebar 
  user={user}
  activeLink="overview"
/>
```

**Features**: User info, navigation items, logout functionality

### Modal Components

#### AddPhoneModal
```tsx
import { AddPhoneModal } from '@/components/ui/modals';

<AddPhoneModal
  isOpen={isOpen}
  onRequestClose={handleClose}
  onSubmit={handleSubmit}
/>
```

#### DeleteConfirmModal
```tsx
import { DeleteConfirmModal } from '@/components/ui/modals';

<DeleteConfirmModal
  isOpen={isOpen}
  onRequestClose={handleClose}
  onConfirm={handleDelete}
  title="Delete Item"
  message="Are you sure?"
  itemName="Item Name"
/>
```

## 🎯 Usage Guidelines

### Importing Components
```tsx
// Import individual components
import { Button, Input, Modal } from '@/components/ui';

// Import from specific folders
import { PhoneInput } from '@/components/ui/forms';
import { Sidebar } from '@/components/ui/navigation';
import { AddPhoneModal } from '@/components/ui/modals';
```

### Styling
- Use Tailwind classes for custom styling
- Leverage design tokens for consistency
- Follow the established color and spacing patterns

### Accessibility
- All components include proper ARIA labels
- Keyboard navigation support
- Focus management in modals
- Screen reader friendly

### Responsive Design
- Mobile-first approach
- Responsive breakpoints: sm, md, lg, xl
- Flexible layouts that adapt to screen sizes

## 🔧 Customization

### Design Tokens
Modify design tokens in `components/ui/tokens/index.ts`:

```tsx
export const designTokens = {
  colors: {
    primary: {
      500: 'bg-yellow-500 text-yellow-500',
      // ... other shades
    },
    // ... other color categories
  },
  // ... other token categories
};
```

### Component Classes
Update component styles in `components/ui/tokens/index.ts`:

```tsx
export const componentClasses = {
  button: {
    base: 'inline-flex items-center justify-center...',
    primary: 'bg-yellow-500 text-white...',
    // ... other variants
  },
  // ... other components
};
```

## 📱 Component Examples

### Form with Validation
```tsx
import { Input, Button, Card } from '@/components/ui';

<Card>
  <form onSubmit={handleSubmit}>
    <Input
      label="Email"
      type="email"
      error={errors.email?.message}
      required
    />
    <Input
      label="Password"
      type="password"
      error={errors.password?.message}
      required
    />
    <Button type="submit" isLoading={isSubmitting}>
      Submit
    </Button>
  </form>
</Card>
```

### Modal with Form
```tsx
import { Modal, PhoneInput, Button } from '@/components/ui';

<Modal isOpen={isOpen} onRequestClose={handleClose} title="Add Contact">
  <PhoneInput
    value={phoneNumber}
    countryCode={countryCode}
    onCountryCodeChange={setCountryCode}
    onPhoneNumberChange={setPhoneNumber}
  />
  <div className="flex gap-3 mt-4">
    <Button variant="secondary" onClick={handleClose}>
      Cancel
    </Button>
    <Button variant="primary" onClick={handleSave}>
      Save
    </Button>
  </div>
</Modal>
```

## 🚀 Best Practices

1. **Consistency**: Always use design system components instead of custom styling
2. **Accessibility**: Ensure all interactive elements are keyboard accessible
3. **Performance**: Use proper loading states and error handling
4. **Responsive**: Test components across different screen sizes
5. **TypeScript**: Leverage TypeScript for better development experience

## 🔄 Migration Guide

### From Old Components
Replace old component imports with new design system components:

```tsx
// Old
import Sidebar from '@/components/Sidebar';

// New
import { Sidebar } from '@/components/ui';
```

### Updating Props
Some components may have different prop names:

```tsx
// Old
<Button onClick={handleClick} disabled={loading}>

// New
<Button onClick={handleClick} isLoading={loading}>
```

## 📚 Additional Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Hook Form](https://react-hook-form.com/)
- [React Modal](https://reactcommunity.org/react-modal/) 