# Free Gifts module for Magento PWA Studio

This module acts as an add-on for [Mageplaza's Free Gifts extension](https://www.mageplaza.com/magento-2-free-gifts/) to make it work with Magento PWA Studio.

End result: https://freegifts.pwa-commerce.com

## Requirements

- Magento version 2.4.* or >= 2.3.5
- Got [Mageplaza Free Gifts extension](https://www.mageplaza.com/magento-2-free-gifts/) and [Free Gifts GraphQL](https://github.com/mageplaza/magento-2-free-gifts-graphql) already installed

## Installation

### 1. Init project
```
  git clone https://github.com/Simicart/simi-studio --branch release/2.0.0
  cd simi-studio
```

### 2. Start the project

From the root directory of the project you created above, clone the repository:

```
  git clone https://github.com/Simicart/freegifts-module-pwa-studio ./@simicart/freegifts
```

### 3. Modify .env

Change the .env MAGENTO_BACKEND_URL with your Magento site URL, or use our demo URL:

```
  MAGENTO_BACKEND_URL=https://mp.pwa-commerce.com/
```
### 4. Modify package.json

Modify the dependencies of your project to add Free Gifts extension.

```
  "dependencies": {
    ...
    "@simicart/freegifts": "link:./@simicart/freegifts"
  },
```

### 5. Install and Start Project

```
  yarn install && yarn watch
```
## Contribution

[SimiCart Team](https://www.simicart.com/pwa.html/) & [Mageplaza Team](https://www.mageplaza.com/)
