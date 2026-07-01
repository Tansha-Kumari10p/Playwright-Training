import { test, expect } from '@playwright/test';

let createdObjectId;  //Added shared variable

test.describe.serial('API Testing', () => {
    test('Get/objects should return a list of objects', async ({ request }) => {

    const response = await request.get('https://api.restful-api.dev/objects'); 

    expect(response.ok()).toBeTruthy();  
    expect(response.status()).toBe(200);  

    const responseBody = await response.json();  
    console.log(responseBody); 

    //assertions
    expect(Array.isArray(responseBody)).toBe(true);  
    expect(responseBody.length).toBeGreaterThan(0);

    expect(responseBody[0]).toHaveProperty('id'); 
    expect(responseBody[0]).toHaveProperty('name'); 

    });

    test.skip('POST/objects should create a new object with provided data', async ({ request }) => {

    const requestBody = {
        name: "Apple MacBook Pro 16",
        data: {
            year: 2019,
            price: 1849.99,
            "CPU model": "Intel Core i9",
            "Hard disk size": "1 TB"
        }
    };

    const response = await request.post('https://api.restful-api.dev/objects', {
        data: requestBody 
    });

    //Assertions
    expect(response.ok()).toBeTruthy();  
    expect(response.status()).toBe(200); 

    const responseBody = await response.json();  
    console.log(responseBody); 
    
    expect(responseBody.name).toBe("Apple MacBook Pro 16");  
    expect(responseBody.data).toBeDefined();  
    expect(responseBody.data.year).toBe(2019);  
    expect(responseBody.data.price).toBe(1849.99);  
    expect(responseBody.data["CPU model"]).toBe("Intel Core i9");  
    expect(responseBody.data["Hard disk size"]).toBe("1 TB");  

    createdObjectId = responseBody.id; 
    });

    test.skip('PUT/objects should update record created by the POST request', async ({ request }) => {

        const requestBody = {
            name: "Apple MacBook Pro 16",
            data: {
                year: 2019,
                price: 2049.99,
                "CPU model": "Intel Core i9",
                "Hard disk size": "1 TB",
                "color": "silver"
            }
        };

        expect(createdObjectId).toBeTruthy();

        const response = await request.put(`https://api.restful-api.dev/objects/${createdObjectId}`, {
            data: requestBody,
        });

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        console.log(responseBody);

        expect(responseBody).toHaveProperty('id');
        expect(responseBody.id).toBe(createdObjectId);
        expect(responseBody.name).toBe("Apple MacBook Pro 16");
        expect(responseBody.data).toBeDefined();
        expect(responseBody.data.year).toBe(2019);
        expect(responseBody.data.price).toBe(2049.99);
        expect(responseBody.data["CPU model"]).toBe("Intel Core i9");
        expect(responseBody.data["Hard disk size"]).toBe("1 TB");
    });

    test.skip('PATCH/objects should update record price to $500', async ({ request }) => {

        const patchRequestBody = {
            data: {
                price: 500
            }
        };

        expect(createdObjectId).toBeTruthy();

        const response = await request.patch(`https://api.restful-api.dev/objects/${createdObjectId}`, {
            data: patchRequestBody
        });

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        console.log(responseBody);

        expect(responseBody).toHaveProperty('id');
        expect(responseBody.id).toBe(createdObjectId);
        expect(responseBody.data).toBeDefined();
        expect(responseBody.data.price).toBe(500);  //checking if price is updated to 500
    });

    test.skip('DELETE/objects should delete the record created by POST request', async ({ request }) => {

        expect(createdObjectId).toBeTruthy();

        const response = await request.delete(`https://api.restful-api.dev/objects/${createdObjectId}`);

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        console.log(responseBody);

        //verify that record is deleted - server should return success message
        expect(responseBody).toHaveProperty('message');  //server returns a message confirming deletion
    });

});
