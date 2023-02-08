# README: Hooli Web Demo

## Overview

> This project acts as a simple web application for a fictional customer, Hooli, which uses Unum ID to issue reusable [credentials](https://docs.unumid.co/terminology#credential) to its users. Additional information on how to issue credentials can be found [here](https://docs.unumid.co/api-overview#issue-credentials).

The Hooli Web Demo is implemented using the [Remix](https://remix.run/docs) full stack web framework. Additional information about the Unum ID demo ecosystem can be found in our [documentation](https://docs.unumid.co/hooli-demo-idv).

## Interacting with the Demo

### Getting Started

Install necessary dependencies

```sh
npm install
```

### Running the Demo in Development

Start the Remix development asset server and the Express server by running:

```sh
npm run dev
```

The demo will launch on port 7040.

### Using the Demo

Once launched, the application will take you to a sample login page. In order to sign in, you may enter any combination of email address and password. _Please note_, if the email address is not valid email format, credentials will not successfully issue on subsequent screens.
