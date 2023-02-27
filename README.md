# Clickbox Widget

## Installation

### **Option 1**: External link
Include the external script in your head tag:
```html
<head>
  ...
  <script src="https://w.clickbox.com/clickbox.js" async /></script>
</head>

```
Then initialize Clickbox by declaring a function `clickboxAsyncCallback` which should create a new instance and pass your merchant token:
```html
<script>
  function clickboxAsyncCallback(Clickbox) {
    window.clickbox = new Clickbox(merchantToken)
  }
</script>
```
### **Option 2**: Bundle with npm package
Add the package to your dependencies:
```bash
npm install clickbox-widget -S
```
or
```
yarn add clickbox-widget
```

Import clickbox into your project and initialize it with your merchant token:
```javascript
import Clickbox from 'clickbox-widget'

const clickbox = new Clickbox(merchantToken)
```

## Methods

### `selectLocation`
#### Arguments
 - **country** (***string***)
 The customers country in ISO 3166-1 Alpha-2 format. I.e `BS` or `US`. Default: Merchant country.
 - **locale** (***string***)
 Locale code in ISO 639-1. I.e. `en` or `es`. Default: `en`.
 - **readonly** (***boolean***)
 Indicates that locations cannot be selected, only displayed. Useful when usign as a reference. Default: `false`.
 - **oversized** (***boolean***)
 Indicates that the shipment is oversized and only applicable locations will be shown and selectable. Default: `false`.
 - **lockersOnly** (***boolean***)
 Only locker locations will be shown and selectable. Default: `false`.

#### Example
```
clickbox.selectLocation({
  country: 'BS',
  locale: 'en',
  readonly: false,
  oversized: false,
  lockersOnly: false,
})
```

 #### Returns
`selectLocation` returns a Promise which resolves to a location object like:

 ```
 {
  "id": 42,
  "name": "IL Cowpen RD",
  "class": "locker",
  "code": "ABC123",
  "zone": null,
  "hours": null,
  "address": {
    "id": 10,
    "company": "Island Luck Cowpen RD",
    "other": null,
    "street": "Cowpen RD",
    "house_number": null,
    "locality": "Nassau",
    "postcode": null,
    "state": null,
    "country": "BS"
  },
  "address_country": "BS",
  "latitude": 25.01535353,
  "longitude": -77.35637212,
  "image": null
}

 ```