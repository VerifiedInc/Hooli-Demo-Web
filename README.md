# Hooli Web Demo

## Overview

> This project acts as a simple web application for a fictional customer, Hooli, which uses Unum ID to issue reusable [credentials](https://docs.unumid.co/terminology#credential) to its users. Additional information on how to issue credentials can be found [here](https://docs.unumid.co/api-overview#issue-credentials).

The Hooli Web Demo is implemented using the [Remix](https://remix.run/docs) full stack web framework. Additional information about the Unum ID demo ecosystem can be found in our [documentation](https://docs.unumid.co/hooli-demo-idv).

### Remix

While knowledge of the Remix framework is not fully required to observe and understand the simplicity of the Unum ID Free IDV offering implementation it is worth noting that Remix has a notion of "middleware" that serves as a lightweight backend, which takes the form an express server.

Because of this characteristic, even though this is a client side app, not all of the software in this repo is executed in the browser. The files with the naming convention `.server.` denote that they are executed on the express server. This is an important note because the Unum ID API Key used to authenticate with Unum ID needs to be kept secret can only be used in a secure backend environment. **TL;DR, Please do not call the Unum ID API directly from client side code that is executed in the browser because the API key is sensitive.**

## Interacting with the Demo

The live web app can be found [here](https://hooli-web.demo.sandbox-unumid.co).

The application's home page is a sample login page. In order to sign in, you may enter any combination of email address and password. _Please note, if the email address is not valid email format, credentials will not successfully issue on subsequent screens._

Once passed the login screen the user is prompted to active their Unum ID digital identity card or not. If agreed to, an EmailCredential is issued corresponding to the authenticated user. This is simply to showcase the ease of which calling [/credentials](https://docs.unumid.co/api-overview#issue-credentials) is to qualify for Unum ID's free IDV offering.

The api call can be found in the [coreAPI.server.ts](/app/coreAPI.server.ts) file.

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
