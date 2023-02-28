# README: Kredita Web Demo

## Overview

> This project acts as a simple web application for a fictional customer, Kredita, which uses Unum ID for 1-click ID - accepting [credentials](https://docs.unumid.co/terminology#credential) issued by Hooli. Additional information on how to enable 1-click IDV can be found [here](http://localhost:3000/quick-start-guide).

The Kredita Web Demo is implemented using the [Remix](https://remix.run/docs) full stack web framework. Additional information about the Unum ID demo ecosystem can be found in our [documentation](https://docs.unumid.co/kredita-demo).

### Remix

While knowledge of the Remix framework is not fully required to observe and understand the simplicity of the Unum ID Free IDV offering implementation it is worth noting that Remix has a notion of "middleware" that serves as a lightweight backend, which takes the form an express server.

Because of this characteristic, even though this is a client side app, not all of the software in this repo is executed in the browser. The files with the naming convention `.server.` denote that they are executed on the express server. This is an important note because the Unum ID API Key used to authenticate with Unum ID needs to be kept secret can only be used in a secure backend environment. **TL;DR, Please do not call the Unum ID API directly from client side code that is executed in the browser because the API key is sensitive.**

## Interacting with the Demo

The live web app can be found [here](https://kredita-web.demo.sandbox-unumid.co).

This demo is intended to be used after Hooli demo with the same email address between the two. This is that the [`/hasMatchingCredentials`](https://docs.unumid.co/api-overview#check-user-credentials) can return true, allowing for 1-click Kredita sign up thanks to verified Hooli data.

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
