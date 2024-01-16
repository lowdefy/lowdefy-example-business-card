# 🪪 Lowdefy Business Card Example

This Lowdefy example demonstrates a digital business card application integrating LinkedIn authentication and MongoDB for data storage. It utilizes the Auth.js LinkedIn provider and the MongoDB community plugin adapter for authentication, along with a custom plugin for QR code generation.

The user interface is designed to efficiently present personal and professional details, akin to a traditional business card, but in a digital format.

### 🗝️ Setting Up LinkedIn Authentication

To use this example, you'll first need to configure a LinkedIn application for authentication. Detailed instructions can be found:

- [Auth.js LinkedIn Provider Setup](https://next-auth.js.org/providers/linkedin)
- [LinkedIn Developer Portal](https://www.linkedin.com/developers/apps/)

## ⚙️ Running this example

- Create a MongoDB cluster and get a URI connection string:
  - Create a free MongoDB database cluster hosted by [MongoDB Atlas](https://www.mongodb.com/try).
  - In the main cluster view, click "connect", then "Connect you application". This will give a MongoDB URI connection string. Use the credentials you just created.
  - You can read more about the [Lowdefy MongoDB connector](https://docs.lowdefy.com/MongoDB).
- Set up your Linkedin app.
- Clone this repository.
- Create a `.env` file in your project folder and set the following environment variables:

  ```.env
  LOWDEFY_SECRET_MONGODB_URI = <MongoDB URI>
  LOWDEFY_SECRET_LINKEDIN_CLIENT_ID = <Linkedin API Key>
  LOWDEFY_SECRET_LINKEDIN_CLIENT_SECRET = <Linkedin Secret Key>

  NEXTAUTH_SECRET = <Random auth signing secret>
  NEXTAUTH_URL = http://localhost:3000
  ```

- In the command console, navigate to your project folder and run the Lowdefy CLI: `pnpx lowdefy@4 dev`.

## 🔗 More Lowdefy resources

- Getting started with Lowdefy - https://docs.lowdefy.com/tutorial-start
- Lowdefy docs - https://docs.lowdefy.com
- Lowdefy website - https://lowdefy.com
- Community forum - https://github.com/lowdefy/lowdefy/discussions
- Bug reports and feature requests - https://github.com/lowdefy/lowdefy/issues
- Discord - https://discord.gg/WmcJgXt

## ⚖️ Licence

[MIT](https://github.com/lowdefy/lowdefy-example-business-card/blob/main/LICENSE)
