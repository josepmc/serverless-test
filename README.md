### Built With

  

-  [typescript](https://www.npmjs.com/package/typescript) - Typed language for application-scale

JavaScript.

-  [serverless](https://www.npmjs.com/package/serverless) - SDK for building, deploying and managing

serverless cloud services.

-  [cucumber.js](https://www.npmjs.com/package/@cucumber/cucumber) - Tool for running automated tests

written in plain language.

  

## Getting Started

  

### Prerequisites

  
1. Install Node Modules

  

```sh

yarn

```


2. Deploy locally

  

```sh

yarn serverless offline start

```

  

### Running integration tests

  

1. Run local integration tests

```bash

yarn test

```

  
  

## How should the lamda work

  

1. The lambda function once deployed should have two functioning endpoints (the output of ***serverless offline*** will specify the url)

- http://localhost:3000/loginaction

- http://localhost:3000/sumaction

  

The '`loginaction`' endpoint requires the user to authenticate with a username and password. Construct a **POST** request with the following two **headers**.

    username: bob

    password: P@55w0rd

On successful authentication, you will receive a **200** http response and you will also be returned a token which can be used later.

On unsuccessful authentication, you will receive a **401** http response.

  

The '`sumaction`' endpoint will simply SUM the value of two numerical inputs in the form of a JSON Object in the body. The two JSON attributes are

    first: <first_numerical_value>

    second: <second_numerival_value>

  

To use this endpoint, you must add the value of the token into the request header that was returned from the '`loginaction`' endpoint. The **header** value should look like this

    token: <token_value_that_is_returned>

  

Upon successful authentication and execution of the '`sumaction`' endpoint, you will be returned with a **200** http response and the summed value of the two provided numbers. Example 2+2. Result will = 4.

  

Non-numerical values will return null after being summed.