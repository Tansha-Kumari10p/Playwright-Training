# Copilot Prompts - API Testing Workflow

This document contains all the prompts provided to GitHub Copilot to create a complete CRUD API automation testing flow using Playwright.

---

## 1. POST API Test Creation

**Prompt:**
```
As an playwright and API automation test expert. Observe the project and inside the API_automation test file under the API_testing folder, create the POST API request with the following details:

Request URL:
https://api.restful-api.dev/objects

Request Body:
{
  "name": "Apple MacBook Pro 16",
  "data": {
    "year": 2019,
    "price": 1849.99,
    "CPU model": "Intel Core i9",
    "Hard disk size": "1 TB"
  }
}
```

## 2. PUT API Test Creation

**Prompt:**
```
Now, create a PUT request to reuse and update the POST-created record with the following details:

Request URL:
https://api.restful-api.dev/objects

Request Body:
{
  "name": "Apple MacBook Pro 16",
  "data": {
    "year": 2019,
    "price": 2049.99,
    "CPU model": "Intel Core i9",
    "Hard disk size": "1 TB"
  }
}
```

---
## 3. PATCH API Test Creation

**Prompt:**
```
Create a patch request that should update the existing created record's price to $500
```

## 4. DELETE API Test Creation

**Prompt:**
```
Now create a delete request that should delete the recently created record