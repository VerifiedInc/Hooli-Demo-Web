# Hooli Web Demo

## Overview

> This project acts as a simple web application for a fictional customer, Hooli, which uses Unum ID to issue reusable [credentials](https://docs.unumid.co/terminology#credential) to its users. Additional information on how to issue credentials can be found [here](https://docs.unumid.co/api-overview#issue-credentials).

The Hooli Web Demo is implemented using the [Remix](https://remix.run/docs) full stack web framework. Additional information about the Unum ID demo ecosystem can be found in our [documentation](https://docs.unumid.co/hooli-demo-idv).

### Remix

While knowledge of the Remix framework is not fully required to observe and understand the simplicity of the implementation for [issuing Unum ID digital ID cards](https://www.unumid.co/issue) it is worth noting that Remix has a notion of "middleware" that serves as a lightweight backend, which takes the form an express server.

Because of this characteristic, even though this is a client side app, not all of the software in this repo is executed in the browser. The files with the naming convention `.server.` denote that they are executed on the express server. This is an important distinction because your Unum ID API Key used to authenticate needs to be kept secret and can only be used in a secure backend environment. **TL;DR, Please do not call the Unum ID API directly from client side code that is executed in the browser because the API key is sensitive.**

## Interacting with the Demo

The live web app can be found [here](https://hooli-web.demo.sandbox-unumid.co).

The application's home page is a sample login page. In order to sign in, you may enter any combination of email address and password. _Please note, if the email address is not valid email format, credentials will not successfully issue on subsequent screens._

Once passed the login screen the user is prompted to activate their Unum ID digital identity card or not. If agreed to, an EmailCredential is issued corresponding to the authenticated user.

The critical api call to [/credentials](https://docs.unumid.co/api-overview#issue-credentials) for issuing the credentials can be found in the [coreAPI.server.ts](/app/coreAPI.server.ts) file. By issuing credentials Hooli qualifies themselves for Unum ID's [Free IDV](https://docs.unumid.co/api-overview#free-idv-guide) offering.

## Development

### Getting Started

Install necessary dependencies

```sh
npm install
```

### Running

Start the Remix development asset server and the Express server by running:

```sh
npm run dev
```

The demo will launch on port 7040.
