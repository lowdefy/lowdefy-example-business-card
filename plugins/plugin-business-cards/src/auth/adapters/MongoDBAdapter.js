import { v4 as uuid } from 'uuid';
import { MongoClient, ObjectId } from 'mongodb';

function from(object) {
  const newObject = {};
  for (const key in object) {
    const value = object[key];
    if (key === '_id') {
      newObject.id = value.toHexString();
    } else if (key === 'userId') {
      newObject[key] = value.toHexString();
    } else {
      newObject[key] = value;
    }
  }
  return newObject;
}

function to(object) {
  const newObject = {
    _id: _id(object.id),
  };
  for (const key in object) {
    const value = object[key];
    if (key === 'userId') newObject[key] = _id(value);
    else if (key === 'id') continue;
    else newObject[key] = value;
  }
  return newObject;
}

/** Converts from string to ObjectId */
function _id(hex) {
  if (hex?.length !== 24) return new ObjectId();
  return new ObjectId(hex);
}

function MongoDBAdapter({ properties }) {
  const { databaseUri, mongoDBClientOptions } = properties;
  const db = (async () => {
    const _db = (await new MongoClient(databaseUri, mongoDBClientOptions).connect()).db();
    return {
      accounts: _db.collection('accounts'),
      sessions: _db.collection('sessions'),
      users: _db.collection('users'),
      verificationTokens: _db.collection('verification_tokens'),
    };
  })();

  return {
    async createUser(data) {
      // TODO: add created date
      const user = to(data);
      user.profile_id = uuid();
      user.profile = {
        name: data.name,
        email: data.email,
        picture: data.image,
      };
      await (await db).users.insertOne(user);
      return from(user);
    },

    async getUser(id) {
      const user = await (await db).users.findOne({ _id: _id(id) });
      if (!user) return null;
      return from(user);
    },

    async getUserByEmail(email) {
      const user = await (await db).users.findOne({ email });
      if (!user) return null;
      return from(user);
    },

    async getUserByAccount(provider_providerAccountId) {
      const account = await (await db).accounts.findOne(provider_providerAccountId);
      if (!account) return null;

      const user = await (await db).users.findOne({ _id: new ObjectId(account.userId) });
      if (!user) return null;

      return from(user);
    },

    async updateUser(data) {
      const { _id, ...user } = to(data);

      const result = await (
        await db
      ).users.findOneAndUpdate({ _id }, { $set: user }, { returnDocument: 'after' });

      return from(result.value);
    },

    async deleteUser(id) {
      const userId = _id(id);
      const m = await db;
      await Promise.all([
        m.accounts.deleteMany({ userId }),
        m.sessions.deleteMany({ userId: userId }),
        m.users.deleteOne({ _id: userId }),
      ]);
    },

    linkAccount: async (data) => {
      const account = to(data);
      await (await db).accounts.insertOne(account);
      return account;
    },

    async unlinkAccount(provider_providerAccountId) {
      const { value: account } = await (
        await db
      ).accounts.findOneAndDelete(provider_providerAccountId);
      return from(account);
    },

    async getSessionAndUser(sessionToken) {
      const session = await (await db).sessions.findOne({ sessionToken });
      if (!session) return null;

      const user = await (await db).users.findOne({ _id: new ObjectId(session.userId) });
      if (!user) return null;
      return {
        user: from(user),
        session: from(session),
      };
    },

    async createSession(data) {
      const session = to(data);
      await (await db).sessions.insertOne(session);
      return from(session);
    },

    async updateSession(data) {
      const { _id, ...session } = to(data);

      const result = await (
        await db
      ).sessions.findOneAndUpdate(
        { sessionToken: session.sessionToken },
        { $set: session },
        { returnDocument: 'after' }
      );
      return from(result.value);
    },

    async deleteSession(sessionToken) {
      const { value: session } = await (
        await db
      ).sessions.findOneAndDelete({
        sessionToken,
      });
      return from(session);
    },

    async createVerificationToken(data) {
      await (await db).verificationTokens.insertOne(to(data));
      return data;
    },

    async useVerificationToken(identifier_token) {
      const { value: verificationToken } = await (
        await db
      ).verificationTokens.findOneAndDelete(identifier_token);

      if (!verificationToken) return null;
      delete verificationToken._id;
      return verificationToken;
    },
  };
}

export default MongoDBAdapter;
